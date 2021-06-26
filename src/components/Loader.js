import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
const Wrapper = styled.div`
  height: 25vmin;
  width: 25vmin;
  border-radius: 50%;
  border: 2vmin solid #06c167;
  border-left-color: transparent;
  border-right-color: transparent;
`;

const Loader = () => {
  const tl = gsap.timeline({ repeat: -1 });
  const spinnerRef = useRef(null);

  useEffect(() => {
    tl.to(spinnerRef.current, {
      rotation: 360,
      repeat: -1,
      ease: "none",
      duration: 2
    });
  }, []);

  return <Wrapper ref={spinnerRef} />;
};

export default Loader;
