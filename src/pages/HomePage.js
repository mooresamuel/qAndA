import LectureBlock from "../components/LectureBlock/LectureBlock";

function HomePage() {
  return (
    <div>
      HomePage
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
