import LectureBlock from "../components/LectureBlock/LectureBlock";
import MilestoneBanner from "../components/MilestoneBanner/MilestoneBanner";

function HomePage() {
  return (
    <div>
      {/* Array of Arrays */}
      <MilestoneBanner module={5} />
      <LectureBlock
        exercise={{
          exercise_number: 1,
          exercise_name: "Reading sentences with more ul sounds",
        }}
      />
    </div>
  );
}

export default HomePage;
