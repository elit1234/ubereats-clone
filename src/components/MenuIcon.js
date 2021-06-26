import { useRef, useEffect } from "react";
import gsap, { Power2 } from "gsap";
import styled from "styled-components";

const Upper = styled.path`
  fill: none;
  stroke: #000;
  stroke-linecap: round;
`;

const Middle = styled.path`
  fill: none;
  stroke: #000;
  stroke-linecap: round;
`;

const Lower = styled.path`
  fill: none;
  stroke: #000;
  stroke-linecap: round;
`;

const Svg = styled.svg`
  height: 35px;
  width: 35px;
  cursor: pointer;
`;

const MenuIcon = ({ active, setActive }) => {
  const tl = gsap.timeline({ paused: true, reversed: true });
  const animRef = useRef(null);
  const upperRef = useRef(null);
  const middleRef = useRef(null);
  const lowerRef = useRef(null);

  useEffect(() => {
    animRef.current = tl
      .to(
        upperRef.current,
        0.5,
        {
          attr: {
            d: "M8,2 L2,8"
          },
          x: 1,
          ease: Power2.easeInOut
        },
        0
      )
      .to(
        middleRef.current,
        0.5,
        {
          autoAlpha: 0
        },
        0
      )
      .to(
        lowerRef.current,
        0.5,
        {
          attr: { d: "M8,8 L2,2" },
          x: 1,
          ease: Power2.easeInOut
        },
        0
      )
      .reverse();
  }, []);

  useEffect(() => {
    animRef.current.reversed(!active);
  }, [active]);

  const toggleMenu = () => {
    setActive(!active);
  };

  return (
    <Svg viewBox="0 0 12 10" onClick={() => toggleMenu()}>
      <Upper d="M10,2 L2,2" ref={upperRef} />
      <Middle d="M2,5 L10,5" ref={middleRef} />
      <Lower d="M10,8 L2,8" ref={lowerRef} />
    </Svg>
  );
};

export default MenuIcon;
