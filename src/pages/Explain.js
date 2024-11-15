import { useExerciseData } from "../Contexts/ExerciseContext";
import SpokenText from "../components/SpokenText/SpokenText";
import NextButtonRight from "../components/NextButtonRight/NextButtonRight";

const mockExercise = {
  question_type: "read-sentence",
  description: [`You've learnt already how different letter combinations can be used to represent each of the 
    five long vowel sounds a, e, i, o and u. The next thing you'll learn is how a silent e at the 
    end of a word can change a short vowel sound into a long one. For example, tub has a short 
    vowel sound (u), but when you add the letter e at the end it becomes tube, which has a long vowel 
    sound - the long u. Hop has a short vowel sound (o), but when you add the letter e at the end it 
    becomes hope, which has a long vowel sound - the long o. The letter e is sil ent in all the words 
    you'll see in this activity, so it's never pronounced; its job in each word is to control the 
    vowel and change it from a short sound into a l ong one. Read each word as you see it appear on 
    the screen; there will be five words for each of the long vowel sounds.`,
    `It's vital the letter e at the end of these words is always silent and is not pronounced. 
    The l ong ē spelt in this way is less common than the others.`]
}



function Explain() {
  const { withCoach } = useExerciseData();

  const handleClick = () => {
    console.log("clicked for now!");
  }
  
  return (
      <div className="p-4" style={{ backgroundColor: "#8CB036" }}>
      
        {
          mockExercise.description.map((d, i) => {
            return (
              <SpokenText className={`font-black mb-5 p-3 text-lg flex-col rounded-lg ${i === 1 && "bg-white"}`} key={i} text={d}  />
            )
          })
        }
          <NextButtonRight
            correct={true}
            className={`mt-5`}
            onClick={handleClick}
          />
      </div>
  )

}

export default Explain;
