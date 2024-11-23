import { useEffect, useRef } from "react";

function useScrollToBottom(dependencies = []) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, dependencies); // Re-run on changes in dependencies

  return ref;
}

export default useScrollToBottom;
