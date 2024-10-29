import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import './TextReader.css';

const TextReader = ({ init, isWaiting, setIsWaiting, chat, setChat, userQuestion, setUserQuestion, question, synth, selectedVoice, setQuestion }) => {
  const [isButtonVisible, setIsButtonVisible] = useState(true); 

  // const source = 'https://samalmoore1.eu.pythonanywhere.com/';
const source = 'http://127.0.0.1:8001/'

function askQuestion(message) {
  setChat(chat => {
    const newChat = [...chat];
    newChat.push({ user: 'assistant', message: message });
    return newChat;
  });
      fetch(`${source}speak_text`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'message': message
    })
  })
  .then(response => response.json())
  .then(data => {
    // console.log('Response data:', data);
    // setQuestion(data.message);
    // recognition.stop();
  // Get the text fields
  // const textField1 = data.text_field_1;
  // const textField2 = data.text_field_2;

  // Display the text fields (e.g., add them to the DOM)
  // document.getElementById('text1').innerText = textField1;
  // document.getElementById('text2').innerText = textField2;

  // Decode and play the audio
  const audioData = data.audio;
  const audioBlob = new Blob([Uint8Array.from(atob(audioData), c => c.charCodeAt(0))], { type: 'audio/mp3' });
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
  audio.onended = () => {
    setIsWaiting(false);
    // setIsListening(false);
  }
})
  .catch(error => {
    console.error('Error:', error);
  });
}

  return (
    <div className="response">
      {isButtonVisible && (
        <button className="start-button" onClick={() => {
          setIsButtonVisible(false); // Hide the button after it's clicked
          // setQuestion('Hello, welcome to Turning Pages Digital! Use the green microphone button near the bottom of the screen when you want to talk.\n\n If my questions are too easy or too difficult, just let me know. Please don\'t use one word answers as they are difficult for me to hear. For example, if I ask you to read a word like "cat", say something like, "The word is cat". Do you want to start talking about words or sentences?');
          // setQuestion('If I ask you to read a word like "cat", say something like, "The word is cat". Do you want to start talking about words or sentences?');
          setQuestion('Hello, welcome to Turning Pages Digital! Use the green microphone button near the bottom of the screen when you want to talk.\n\n If my questions are too easy or too difficult, just let me know. Please don\'t use one word answers as they are difficult for me to hear. For example, if I ask you to read a word like "cat", say something like, "The word is cat". Do you want to start talking about words or sentences?');
          askQuestion('Hello, welcome to Turning Pages Digital! Use the green microphone button near the bottom of the screen when you want to talk.\n\n If my questions are too easy or too difficult, just let me know. Please don\'t use one word answers as they are difficult for me to hear. For example, if I ask you to read a word like "cat", say something like, "The word is cat". Do you want to start talking about words or sentences?');
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