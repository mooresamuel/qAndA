import { useGlobalContext } from "../Contexts/GlobalContext";
import MilestonesPath from "../components/MilestonesPath/MilestonesPath";

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
