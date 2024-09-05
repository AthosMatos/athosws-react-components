import { useEffect } from "react";
import { v4 } from "uuid";

const MousePosLog = () => {
  const id = `mousepos-${v4().toString()}`;
  useEffect(() => {
    const page = document.getElementById("root");
    if (!page) return;

    page.addEventListener("mousemove", (e) => {
      const mouseDiv = document.getElementById(id);
      if (mouseDiv) {
        mouseDiv.style.left = `${e.pageX - 5}px`;
        mouseDiv.style.top = `${e.pageY - 40}px`;
        //set text to show the diference
        mouseDiv.innerText = `X: ${e.pageX} Y: ${e.pageY}`;
      }
    });
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "10px",
        padding: "5px",
        fontSize: "1.5rem",
        zIndex: 1000,
      }}
      id={id}
    />
  );
};

export default MousePosLog;
