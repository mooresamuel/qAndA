import styles from "./FullPageSpinner.module.css";

function FullPageSpinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40">
      <div className={styles.spinner}></div>
    </div>
  );
}

export default FullPageSpinner;
