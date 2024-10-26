import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import './TextReader.css';

const TextReader = ({ init, isWaiting, setIsWaiting, chat, setChat, userQuestion, setUserQuestion, question, synth, selectedVoice, setQuestion }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true); 
  let firstQuestion = null;


  useEffect(() => {
    console.log('TextReader useEffect synth', synth);
    if (synth) {
      speakText();
    }
  }, [question]);

  const speakText = useCallback(() => {
    if (synth.speaking) {
      synth.cancel();
      }
      if (!question)
      {
        console.log('no question');
        setIsPlaying(false);
        setIsWaiting(false);
        return;
      }
      console.log('question:', question);
    synth.pitch = 1;
    synth.rate = 1;
    synth.volume = 1;
    console.log('speakText');
    console.log('firstQuestion:', firstQuestion);

    console.log('synth:', synth);
    const currQuestion = firstQuestion ? firstQuestion : question;
    console.log('selectedVoice:', selectedVoice);
    if (!synth || !selectedVoice) {
      console.error('Synth or selectedVoice not initialized');
      return;
    }
    chat.push({'role': "assistant", 'message': currQuestion});
    console.log('currQuestion: ', currQuestion);
    let chunks = currQuestion.match(/[^.!?]+[.!?]+/g) || [currQuestion];
    chunks = chunks.filter(chunk => !chunk.match(/".*?"/g)); // Filter out anything between double quotes
    console.log('speaking');
    const speakChunk = (chunkIndex) => {
      if (chunkIndex >= chunks.length) {
        setIsPlaying(false);
        setIsWaiting(false);
        console.log('\n\n\n::CHAT onend :::', chat, '\n\n\n');
        return;
      }
      console.log('speaking chunk', chunkIndex);
      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
      utterance.voice = selectedVoice;
      utterance.onend = () => speakChunk(chunkIndex + 1);
      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        setIsPlaying(false);
        setIsWaiting(false);
      };
      console.log('inside ::::  synth ', synth, '  \nselectedvoice', selectedVoice);
      console.log('speak utterance.');
      synth.speak(utterance);
    };

    setIsPlaying(true);
    setIsWaiting(true);
    speakChunk(0);
  }, [synth, selectedVoice, question]);



  return (
    <div className="response">
      {isButtonVisible && (
        <button className="start-button" onClick={() => {
          setIsButtonVisible(false); // Hide the button after it's clicked
          setQuestion('Hello, welcome to Turning Pages Digital! Use the green microphone button near the bottom of the screen when you\'re ready to talk.\n\n If my questions are too easy or too difficult, just let me know. Should we start by talking about words or sentences?');
          setIsWaiting(true);
        }}>
          <FontAwesomeIcon className="big" color="#6f7" icon={faPlay} />
        </button>
      )}
      <p>{question}</p>
    </div>
  );
};

export default TextReader;