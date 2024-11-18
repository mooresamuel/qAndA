import MilestonesPath from "../components/MilestonesPath/MilestonesPath";
import { useGlobalContext } from "../Contexts/GlobalContext";

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
