import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import './TextReader.css';

const TextReader = ({ isWaiting, setIsWaiting, chat, setChat, userQuestion, setUserQuestion, question, synth, selectedVoice, setQuestion }) => {
  const [isButtonVisible, setIsButtonVisible] = useState(true); 
  let firstQuestion = null;

  const speakText = useCallback(() => {
    if (synth.speaking) {
      synth.cancel();
      }
      if (!question)
      {
        console.log('no question');
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
    // chunks = chunks.map(chunk => chunk.replace(/"([^"]*)"/g, ''));
    chunks = chunks.map(chunk => chunk.split(':')[0]);
    console.log('speaking');
    const speakChunk = (chunkIndex) => {
      if (chunkIndex >= chunks.length) {
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
        setIsWaiting(false);
      };
      console.log('inside ::::  synth ', synth, '  \nselectedvoice', selectedVoice);
      console.log('speak utterance.');
      synth.speak(utterance);
    };

    setIsWaiting(true);
    speakChunk(0);
  }, [synth, selectedVoice, question, setIsWaiting]);


  useEffect(() => {
    console.log('TextReader useEffect synth', synth);
    if (synth) {
      speakText();
    }
  }, [question, synth, speakText]);

  return (
    <div className="response">
      {isButtonVisible && (
        <button className="start-button" onClick={() => {
          setIsButtonVisible(false); // Hide the button after it's clicked
          // setQuestion('Hello, welcome to Turning Pages Digital! Use the green microphone button near the bottom of the screen when you\'re ready to talk.\n\n If my questions are too easy or too difficult, just let me know. Please don\'t use one word answers as they are difficult for me to hear. For example, if I ask you to read a word like "cat", say something like, "The word is cat" instead of just saying "cat". Do you want to start talking about words or sentences?');
          setQuestion('Please don\'t use one word answers as they are difficult for me to hear. For example, if I ask you to read a word like "cat", say something like, "The word is cat" instead of just saying "cat". Do you want to start talking about words or sentences?');
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