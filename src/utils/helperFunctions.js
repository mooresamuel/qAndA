export const scrollModalIntoView = () => {
  setTimeout(() => {
    const modalElement = document.querySelector("#modal");
    if (modalElement) {
      modalElement.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, 0);
};
