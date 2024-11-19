import MilestonesPath from "../components/MilestonesPath/MilestonesPath";
import SpeechToTextWord from "../components/SpeechToTextWord/SpeechToTextWord";
import { useGlobalContext } from "../Contexts/GlobalContext";
import SentenceHint from "../test/SentenceHint";

function HomePage() {
  const { milestones } = useGlobalContext();
  return (
    <div>
      {milestones.map((milestone, i) => (
        <MilestonesPath key={i} milestone={milestone} />
      ))}
    </div>
  );
}

export default HomePage;
