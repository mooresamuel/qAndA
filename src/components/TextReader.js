import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import './TextReader.css';

const TextReader = ({ setIsWaiting, chat, setChat, question, setQuestion, speakText }) => {
  const [isButtonVisible, setIsButtonVisible] = useState(true); 

//       fetch(`${source}speak_text`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       'message': message
//     })
//   })
//   .then(response => response.json())
//   .then(data => {
//     // console.log('Response data:', data);
//     // setQuestion(data.message);
//     // recognition.stop();
//   // Get the text fields
//   // const textField1 = data.text_field_1;
//   // const textField2 = data.text_field_2;

//   // Display the text fields (e.g., add them to the DOM)
//   // document.getElementById('text1').innerText = textField1;
//   // document.getElementById('text2').innerText = textField2;

//   // Decode and play the audio
//   const audioData = data.audio;
//   const audioBlob = new Blob([Uint8Array.from(atob(audioData), c => c.charCodeAt(0))], { type: 'audio/mp3' });
//   const audioUrl = URL.createObjectURL(audioBlob);
//   const audio = new Audio(audioUrl);
//   audio.play();
//   audio.onended = () => {
//     setIsWaiting(false);
//     // setIsListening(false);
//   }
// })
//   .catch(error => {
//     console.error('Error:', error);
//   });

  // useEffect(() => {
  //   console.log('TextReader useEffect synth', synth);
  //   if (synth) {
  //     speakText();
  //   }
  // }, [question, synth, speakText]);

  return (
    <div className="response">
      {isButtonVisible && (
        <button className="start-button" onClick={() => {
          setIsButtonVisible(false); // Hide the button after it's clicked
          // speakText('hi');
          // speakText('Hello, welcome to Turning Pages Digital! Press the green microphone button when you\'re ready to talk and just let me know if the questions I\'m asking ar too easy or too difficult. So, let\'s get started! Do you want to start off talking about words? Or should we jump straight into sentences?');
          setQuestion('Hello, welcome to Turning Pages Digital! Press the green microphone button when you\'re ready to talk and just let me know if the questions I\'m asking ar too easy or too difficult. So, let\'s get started! Do you want to start off talking about words? Or should we jump straight into sentences?');
          setChat(prev => {
            const newChat = [...prev];
            newChat.push({ user: 'assistant', message: 'Hello, welcome to Turning Pages Digital! Press the green microphone button when you\'re ready to talk and just let me know if the questions I\'m asking ar too easy or too difficult. So, let\'s get started! Do you want to start off talking about words? Or should we jump straight into sentences?' });
            return newChat;
          });
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