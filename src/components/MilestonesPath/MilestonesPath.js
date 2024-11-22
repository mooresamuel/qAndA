import MilestoneBanner from "../MilestoneBanner/MilestoneBanner";
import LectureBlock from "../LectureBlock/LectureBlock";

function MilestonesPath({ milestone }) {
  return (
    <div>
      <MilestoneBanner module={milestone.module_number} />
      <div className="py-3 flex flex-col gap-5 items-center">
        {milestone.exercises?.map((exercise) => (
          <LectureBlock key={exercise.exercise_id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}

export default MilestonesPath;
