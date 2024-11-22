import { useState, useCallback, useEffect, useRef } from "react";

const useQuerySelector = (selector) => {
    const [prevElement, setElement] = useState(null);
    const element = useRef(null);

    const handler = useCallback(() => {
        const elem = document.querySelector(selector);
        element.current = elem;
    }, [selector]);

    useEffect(() => {
        if (selector !== prevElement) {
            handler();
            window.addEventListener("resize", handler);
            setElement(selector);
            return () => {
                window.removeEventListener("resize", handler);
            };
        }
    }, [selector]);

    return { element };
};

export default useQuerySelector;