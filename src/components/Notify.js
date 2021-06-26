import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;

  height: 50vh;
  width: 70vw;
  background: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;
  visibility: hidden;
  text-align: center;
  cursor: not-allowed;
  background: #eeeeee;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const Notify = ({ string }) => {
  const [time, setTime] = useState(5);
  const animRef = useRef(null);
  const wrapperRef = useRef(null);
  const tl = gsap.timeline({});
  useEffect(() => {
    if (time === 0) return;
    const intervalId = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  useEffect(() => {
    if (string) {
      setTime(5);
      animRef.current = tl
        .fromTo(
          wrapperRef.current,
          {
            autoAlpha: 0,
            scale: 0
          },
          {
            autoAlpha: 1,
            scale: 1
          },
          0
        )
        .fromTo(
          wrapperRef.current,
          {
            scale: 1
          },
          {
            autoAlpha: 0,
            scale: 0,
            delay: 4.5
          }
        );
    }
  }, [string]);

  return (
    <Wrapper ref={wrapperRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="86px"
        viewBox="0 0 24 24"
        width="86px"
        fill="#ad6e00"
      >
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
      </svg>
      <h1>{string && string}</h1>
      <h3>Closing in {time} seconds.</h3>
    </Wrapper>
  );
};

export default Notify;
