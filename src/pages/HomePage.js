import LectureBlock from "../components/LectureBlock/LectureBlock";
import MilestoneBanner from "../components/MilestoneBanner/MilestoneBanner";
import MilestonesPath from "../components/MilestonesPath/MilestonesPath";
import { useGlobalContext } from "../Contexts/GlobalContext";

function HomePage() {
  const { milestones } = useGlobalContext();
  return (
    <div>
      {/* <MilestoneBanner module={5} />
      <LectureBlock
        exercise={{
          exercise_number: 1,
          exercise_name: "Reading sentences with more ul sounds",
        }}
      /> */}
      {milestones.map((milestone, i) => (
        <MilestonesPath key={i} milestone={milestone} />
      ))}
    </div>
  );
}

export default HomePage;
