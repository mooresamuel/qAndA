import styles from "./ChatWaitingIndicator.module.css";

function ChatWaitingIndicator() {
  return (
    <div className="">
      <p
        className={`flex items-center m-0 px-4 py-4 indent-2  rounded-lg w-fit h-10 max-w-[75%] justify-self-start text-hightlight justify-center`}
      >
        <div className={`${styles.dots}`}></div>
      </p>
    </div>
  );
}

export default ChatWaitingIndicator;
