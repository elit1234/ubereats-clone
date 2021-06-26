import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

const Wrapper = styled.div`
  min-height: 100vh;
  overflow-y: scroll;
  height: 100%;
  position: fixed;
  z-index: 99999;
  width: 40vw;
  @media (max-width: 800px) {
    width: 70vw;
  }
  background: #fff;
  visibility: none;
  opacity: 0;
  transition: width 0.1s;
  font-family: "UberMoveBold", sans-serif;
`;

const TopButton = styled.div`
  background: #000;
  color: #fff;
  margin: 1.5em;
  height: 8vh;
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: center;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1em;
  height: 70%;
`;

const Option = styled.div`
  padding: 0.5em 0;
  margin: 0 1.5em;
  cursor: pointer;
  font-weight: bold;
`;

const BottomOptions = styled.div`
  margin-top: auto;
  height: 15vh;
  display: flex;
  flex-direction: column;
`;

const BottomOptionsTop = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const EatsLogo = styled.div`
  width: 20%;
  padding-left: 1.5em;
`;

const EatsDesc = styled.div`
  width: 80%;
  font-size: 18px;
  font-weight: bold;
  padding: 0.5em;
`;

const BottomOptionsBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 0.5em;
`;

const AppOption = styled.div`
  background: #eee;
  padding: 1em;
  border-radius: 2em;
  cursor: pointer;
  display: flex;
  width: 40%;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;
const SideBar = ({ active, setActive }) => {
  const wrapperRef = useRef(null);
  const animRef = useRef(null);
  const tl = gsap.timeline({ paused: true });

  useEffect(() => {
    animRef.current = tl
      .fromTo(
        wrapperRef.current,
        {
          autoAlpha: 0,
          x: "-30vw",
        },
        {
          x: 0,
          autoAlpha: 1,
          ease: "power1.inOut",
        },
        0
      )
      .reverse();
  }, []);

  useEffect(() => {
    if (!active) {
      animRef.current.reverse();
    } else animRef.current.play();
  }, [active]);

  return (
    <Wrapper ref={wrapperRef}>
      <TopButton>Sign in</TopButton>
      <Options>
        <Option>Create a business account</Option>
        <Option>Add your restaurant</Option>
        <Option>Sign up to deliver</Option>
        <BottomOptions>
          <BottomOptionsTop>
            <EatsLogo>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 160.37 160.37"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Squircles">
                    <rect
                      width="160.37"
                      height="160.37"
                      rx="31.59"
                      fill="#142328"
                    />
                    <path
                      d="M76.86 107.45a8.33 8.33 0 10-8.33 8.23 8.22 8.22 0 008.33-8.23M83.66 94v27h-6.93v-2.43a13.66 13.66 0 01-8.73 3.04 14.17 14.17 0 110-28.33 13.72 13.72 0 018.77 3.12V94zm23 20.84h-5.21c-1.59 0-2.61-.69-2.61-2.12v-12.64h7.82V94h-7.79v-7.7h-7V94h-5.26v6.11h5.27v14.35c0 3.62 2.61 6.49 7.31 6.49h7.5zm15.79 6.8c8 0 12.52-3.74 12.52-8.92 0-3.68-2.67-6.43-8.26-7.61l-5.91-1.19c-3.43-.62-4.51-1.25-4.51-2.49 0-1.63 1.65-2.63 4.7-2.63 3.3 0 5.72.88 6.42 3.87h6.93c-.39-5.61-4.52-9.36-12.91-9.36-7.24 0-12.33 2.94-12.33 8.61 0 3.93 2.8 6.49 8.84 7.74l6.61 1.5c2.6.5 3.3 1.18 3.3 2.24 0 1.69-2 2.75-5.15 2.75-4 0-6.29-.87-7.18-3.87h-7c1 5.62 5.28 9.36 13.92 9.36M25.38 84.43h26.13v6.23H32.44v8.93H51v6H32.44v9h19.07v6.24H25.38z"
                      fill="#06c167"
                    />
                    <path
                      d="M134.37 52.81v-4.9h-1.86A7.28 7.28 0 00126 51.4v-3.28h-5.31v26.59h5.36V59.59c0-4.12 2.55-6.78 6.06-6.78zM95.81 59a8.42 8.42 0 0116.52 0zm8.39-11.4a13.8 13.8 0 00-13.92 13.81c0 7.93 6.27 13.87 14.4 13.87a14.26 14.26 0 0011.68-5.68l-3.88-2.82a9.36 9.36 0 01-7.8 3.92 9 9 0 01-9-7.56h22v-1.73c0-7.92-5.73-13.81-13.54-13.81M73.56 70.7a9.23 9.23 0 119.29-9.23 9.25 9.25 0 01-9.29 9.23M59 74.71h5.31v-3.34a13.66 13.66 0 009.67 4 13.9 13.9 0 100-27.79 13.55 13.55 0 00-9.62 4V38.21H59zm-18.9-4.28c5.15 0 9.13-3.91 9.13-9.69V38.21h5.58v36.5h-5.53v-3.39a13.54 13.54 0 01-9.82 4c-8 0-14.08-5.69-14.08-14.29V38.21H31v22.53c0 5.89 3.93 9.69 9.14 9.69"
                      fill="#f6f0ea"
                    />
                  </g>
                </g>
              </svg>
            </EatsLogo>
            <EatsDesc>There's more to love in the app.</EatsDesc>
          </BottomOptionsTop>
          <BottomOptionsBottom>
            <AppOption>iPhone</AppOption>
            <AppOption>Android</AppOption>
          </BottomOptionsBottom>
        </BottomOptions>
      </Options>
    </Wrapper>
  );
};

export default SideBar;
