import { useState, useEffect, useCallback } from 'react';
import './TextReader.css';

const TextReader = ({init, question}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [synth, setSynth] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const text = question;

  useEffect(() => {
    // Initialize speech synthesis
    const speechSynth = window.speechSynthesis;
    setSynth(speechSynth);

    // Cleanup
    return () => {
      if (speechSynth.speaking) {
        speechSynth.cancel();
      }
    };
  }, [init]);

  useEffect(() => {
    // Function to load voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      console.log('Voices loaded:', availableVoices.length);
      setVoices(availableVoices);
      
      // Set default voice
      const defaultVoice = availableVoices.find(voice => 
        voice.voiceURI === 'Google UK English Female'
      ) || availableVoices[0];
      
      setSelectedVoice(defaultVoice);
    };

    // Load voices initially
    loadVoices();

    // Add event listener for when voices are ready
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Cleanup
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [init]);


useEffect(() => {
  if (question) {
    speak();  // Automatically call speak when question changes
  }
}, [question]);

  const speak = useCallback(() => {
    if (!synth || !selectedVoice) return;

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = selectedVoice.lang;
    // Important: These event listeners must be added before calling speak()
    utterance.onstart = () => {
      console.log('Speech started');
      setIsPlaying(true);
    };

    utterance.onend = () => {
      console.log('Speech ended');
      setIsPlaying(false);
      setCurrentWord('');
    };

    utterance.onboundary = (event) => {
      console.log('Boundary event:', event);
      
      // Only handle word boundaries
      if (event.name === 'word') {
        // Get the word at the current position
        const wordStart = event.charIndex;
        let wordEnd = text.indexOf(' ', wordStart);
        if (wordEnd === -1) wordEnd = text.length;
        
        const word = text.slice(wordStart, wordEnd);
        console.log('Current word:', word);
        setCurrentWord(word);
      }
    };

    // Debug logs
    console.log('Starting speech...');
    synth.speak(utterance);
  }, [synth, text, question]);

  return (
    <div className="response">
      <h3>Response:</h3>
        <p>{text}</p>
    </div>
  );
};

export default TextReader;