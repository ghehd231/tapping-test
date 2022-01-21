import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useInterval } from "react-interval-hook";

const TappingMe = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  user-select: none;
  scrollbar-width: none;

  &.mouse-cursor-gradient-tracking {
    position: relative;
    background: ${({ tapCount }) => (tapCount === 0 ? "#7983ff" : "white")};
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    border: none;
    color: white;
    cursor: pointer;
    outline: none;
    overflow: hidden;

    & > div {
      color: ${({ tapCount }) => (tapCount === 0 ? "white" : "black")};
    }

    &::before {
      --size: 0;
      content: "";
      position: absolute;
      left: var(--x);
      top: var(--y);
      width: var(--size);
      height: var(--size);
      background: radial-gradient(circle closest-side, #bfffff, transparent);
      transform: translate(-50%, -50%);
      transition: width 0.2s ease, height 0.2s ease;
    }

    &:hover::before {
      --size: 1000px;
    }
  }
`;

const Tapping = () => {
  const [tapCount, setTapCount] = useState(0);
  const [timer, setTimer] = useState(0);

  const handleCount = () => {
    setTapCount((count) => (count += 1));
  };

  const { stop, start } = useInterval(
    () => {
      setTimer((time) => (time += 1));
    },
    1000,
    { autoStart: false }
  );

  useEffect(() => {
    if (tapCount === 1) start();
  }, [start, tapCount]);

  useEffect(() => {
    if (timer === 10) {
      stop();
      setTapCount(0);
      setTimer(0);
    }
  }, [stop, timer]);

  useEffect(() => {
    let btn = document.querySelector(".mouse-cursor-gradient-tracking");

    btn.addEventListener("mousemove", (e) => {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      btn.style.setProperty("--x", x + "px");
      btn.style.setProperty("--y", y + "px");
    });
  }, []);
  return (
    <>
      <TappingMe
        tapCount={tapCount}
        onClick={handleCount}
        className="mouse-cursor-gradient-tracking"
      >
        <div>tapCount: {tapCount}</div>

        <div>timer: {timer}</div>
      </TappingMe>
    </>
  );
};

export default Tapping;
