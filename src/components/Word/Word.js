function Word({ word, sound, clicked, onClick, className = "" }) {
  const startWord = word.replace(sound, " ").replace(/\s.*/, "");
  const endWord = word.replace(sound, " ").replace(/.*\s/, "");

  return (
    <div
      onClick={onClick}
      className={`text-lg ${clicked ? "bg-hightlight" : "bg-white" } shadow-md py-3 px-5 rounded-lg w-10 h-10 flex items-center justify-center ${className}`}>
        
        <span className={`${clicked ? "text-white" : "text-slate-800" }`}> 
          {
            word.includes(sound) ?
            <>
              {startWord}
              <strong>{sound}</strong>
              {endWord}
            </> :
            `${word}` 
          }
        </span>
    </div>
  )
}

export default Word;