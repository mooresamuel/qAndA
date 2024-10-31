import {useState, useCallback} from 'react';



function WordHelper({source}) {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [sentence, setSentence] = useState('');
    const [similarWords, setSimilarWords] = useState('');   

    const submitWord = useCallback((e) => {
        console.log('Word:', word);
        e.preventDefault();
        fetch(`${source}word_helper`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            'word': word
        })     
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setDefinition(data.definition);
            setSentence(data.example_sentence);
            setSimilarWords(data.similar_sounds);
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }, [word]);

    return (
        <div>
            <h1>Word Helper</h1>
            <form >
            <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
            <button onClick={submitWord}>Submit</button>
            <p>Definition: {definition}</p>
            <p>Sentence: {sentence}</p>
            <p>Similar Words: {similarWords}</p>
            </form>
        </div>
    )
}

export default WordHelper;