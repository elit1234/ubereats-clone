import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../redux/user";
import MenuIcon from "../MenuIcon";
import SideBar from "../SideBar";
import { useHistory } from "react-router-dom";
import Notify from "../Notify";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ffc043;
  font-family: "UberMoveBold", sans-serif;
  display: grid;
  grid-template-rows: 0.2fr 1fr 1fr;
  gap: 0px 12px;
  grid-template-areas:
    "topBar"
    "middleContent"
    "bottomContent";
`;

const TopBar = styled.div`
  grid-area: topBar;
  padding: 0 1em;
  visibility: hidden;

  display: grid;
  align-items: center;
  grid-template-columns: 0.2fr 1fr 0.3fr;
  grid-template-rows: 1fr;
  grid-template-areas: "topbarLeft topbarMiddle topbarRight";
`;

const TopBarLeft = styled.div`
  grid-area: topbarLeft;
`;

const TopBarMiddle = styled.div`
  grid-area: topbarMiddle;
`;

const TopBarRight = styled.div`
  grid-area: topbarRight;
`;

const Title = styled.div`
  display: flex;
  font-size: 32px;
  font-weight: bold;
  & > span {
    color: #06c167;
    padding-left: 0.2em;
  }
`;

const MainText = styled.div`
  font-size: 48px;
  font-weight: bold;
  max-width: 70vw;
  padding-top: 15vh;
  padding-left: 0.5em;
  height: 35vh;
  visibility: hidden;
  grid-area: middleContent;
`;

const DeliverySection = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 0.5fr 0.5fr;
  grid-template-rows: 1fr;
  gap: 1px 1px;
  row-gap: 20px;
  height: auto;
  padding-top: 5vh;
  grid-area: bottomContent;
  grid-template-areas: "deliveryAddress deliveryTime deliveryButton";
  @media (min-width: 850px) {
    grid-template-columns: 0.8fr 0.5fr 0.5fr 1fr;
    grid-template-areas: "deliveryAddress deliveryTime deliveryButton .";
    gap: 5px 5px;
  }
  margin: 0 2vw;
`;

const SignInButton = styled.div`
  background: #fff;
  padding: 0.5em;
  border-radius: 1em;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px, rgba(0, 0, 0, 0.04) 0px 4px 4px;
  cursor: pointer;
  white-space: nowrap;
`;

const DeliveryAddressContainer = styled.div`
  background: #f6f6f6;
  grid-area: deliveryAddress;
  height: 8vh;
  display: flex;
  align-items: center;
  visibility: hidden;
`;

const DeliveryAddressInput = styled.input`
  height: 60%;
  width: 70%;
  border: none;
  background: transparent;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: grey;
  }
  :-ms-input-placeholder {
    color: grey;
  }
  :focus {
    outline: none;
  }
  position: relative;
`;

const DeliveryAddressTime = styled.div`
  grid-area: deliveryTime;
  background: #f6f6f6;
  display: grid;
  padding-top: 1.5vh;
  cursor: pointer;
  height: 6.5vh;
  font-weight: bold;
  text-align: center;
  visibility: hidden;
`;

const DeliveryButton = styled.div`
  grid-area: deliveryButton;
  background: #000;
  color: #fff;
  height: 6.5vh;
  padding-top: 1.5vh;
  font-weight: bold;
  text-align: center;
  visibility: hidden;
  cursor: pointer;
`;

const DeliveryTimeOptions = styled.div`
  visibility: hidden;
  background: #f6f6f6;
`;

const TimeOption = styled.div``;

const Home = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [address, setAddress] = useState("");
  const [time, setTime] = useState({});
  const [error, setError] = useState("");
  const [errorTime, setErrorTime] = useState(5);

  const animRef = useRef(null);
  const optionsAnimRef = useRef(null);
  const topBarRef = useRef(null);
  const mainTextRef = useRef(null);
  const addressRef = useRef(null);
  const timeRef = useRef(null);
  const buttonRef = useRef(null);
  const timeOptionsRef = useRef(null);
  const notNavRef = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const tl = gsap.timeline({});
  const timeTl = gsap.timeline({ paused: true, reversed: true });

  const user = useSelector((state) => state.user);
  const isLoggedIn = user && user.token && user.username;

  const timeOptions = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <g>
              <g>
                <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M16.2,16.2L11,13V7h1.5v5.2l4.5,2.7L16.2,16.2z" />
              </g>
            </g>
          </g>
        </svg>
      ),
      label: "Deliver now",
      value: "deliver-now",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z" />
        </svg>
      ),
      label: "Schedule later",
      value: "deliver-later",
    },
  ];

  useEffect(() => {
    animRef.current = tl
      .fromTo(
        topBarRef.current,
        {
          y: "-20vh",
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
        },
        0
      )
      .fromTo(
        mainTextRef.current,
        {
          x: "-70vw",
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
          duration: 1.2,
        },
        0
      )
      .fromTo(
        addressRef.current,
        {
          scale: 0,
          autoAlpha: 0,
        },
        { scale: 1, autoAlpha: 1 },
        1
      )
      .fromTo(
        timeRef.current,
        {
          scale: 0,
          autoAlpha: 0,
        },
        { scale: 1, autoAlpha: 1 },
        1
      )
      .fromTo(
        buttonRef.current,
        {
          scale: 0,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
        },
        1
      )
      .play();

    optionsAnimRef.current = timeTl
      .fromTo(
        timeOptionsRef.current,
        {
          autoAlpha: 0,
          y: "0vh",
        },
        {
          autoAlpha: 1,
          y: "1vh",
        }
      )
      .reverse();

    dispatch(actions.resetDelivery());

    return () => {
      optionsAnimRef.current.kill();
      // animRef.current.kill();
    };
  }, []);

  const toggleDeliveryTimes = () => {
    if (optionsAnimRef.current.reversed()) optionsAnimRef.current.play();
    else optionsAnimRef.current.reverse();
  };

  const clickedOption = (opt) => {
    setTime(opt);
  };

  useEffect(() => {
    setTime(timeOptions[0]);
  }, []);

  const clickedNotNav = () => {
    if (activeMenu) setActiveMenu(false);
  };

  const handleSubmit = () => {
    if (address && address.length > 5) {
      dispatch(
        actions.setDeliveryOptions({
          address,
          time,
        })
      );
      animRef.current = tl
        .fromTo(
          buttonRef.current,
          {
            x: 0,
            autoAlpha: 1,
          },
          {
            x: "-100vw",
            autoAlpha: 0,
            duration: 1.2,
          },
          0
        )
        .fromTo(
          timeRef.current,
          {
            x: 0,
            autoAlpha: 1,
          },
          {
            x: "-100vw",
            autoAlpha: 0,
            duration: 1.2,
            delay: 0.1,
          },
          0
        )
        .fromTo(
          addressRef.current,
          { x: 0, autoAlpha: 1 },
          {
            x: "-100vw",
            autoAlpha: 0,
            duration: 1.2,
            delay: 0.2,
          },
          0
        )
        .fromTo(
          mainTextRef.current,
          {
            x: 0,
            autoAlpha: 1,
          },
          {
            x: "-100vw",
            autoAlpha: 0,
            duration: 1.2,
            delay: 0.3,
          },
          0
        )
        .fromTo(
          topBarRef.current,
          {
            x: 0,
            autoAlpha: 1,
          },
          {
            x: "-100vw",
            autoAlpha: 0,
            duration: 1.2,
            delay: 0.4,
          },
          0
        )
        .then(() => {
          history.push("/feed");
        });
    } else {
      setError("Please enter a valid address");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      dispatch(actions.signOut());
    } else {
      dispatch(actions.signIn());
    }
  };

  return (
    <>
      <Notify string={error} />
      <SideBar active={activeMenu} setActive={setActiveMenu} />
      <Wrapper ref={notNavRef} onClick={() => clickedNotNav()}>
        <TopBar ref={topBarRef}>
          <TopBarLeft>
            <MenuIcon active={activeMenu} setActive={setActiveMenu} />
          </TopBarLeft>
          <TopBarMiddle>
            <Title>
              Home <span>Page</span>
            </Title>
          </TopBarMiddle>
          <TopBarRight>
            <SignInButton onClick={() => handleLoginClick()}>
              {isLoggedIn ? "Sign Out" : "Sign In"}
            </SignInButton>
          </TopBarRight>
        </TopBar>
        <MainText ref={mainTextRef}>Hungry? You're in the right place</MainText>
        <DeliverySection>
          <DeliveryAddressContainer ref={addressRef}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <DeliveryAddressInput
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter delivery address"
              onKeyPress={(key) => key.key === "Enter" && handleSubmit()}
            />
          </DeliveryAddressContainer>
          <DeliveryAddressTime
            ref={timeRef}
            onClick={() => toggleDeliveryTimes()}
          >
            {time.label && time.label}
            <DeliveryTimeOptions ref={timeOptionsRef}>
              {timeOptions.map((timeOption, key) => {
                return (
                  <TimeOption
                    onClick={() =>
                      clickedOption({
                        label: timeOption.label,
                        value: timeOption.value,
                      })
                    }
                  >
                    {timeOption.icon && timeOption.icon}{" "}
                    <div>{timeOption.label}</div>
                  </TimeOption>
                );
              })}
            </DeliveryTimeOptions>
          </DeliveryAddressTime>
          <DeliveryButton onClick={() => handleSubmit()} ref={buttonRef}>
            Find Food
          </DeliveryButton>
        </DeliverySection>
      </Wrapper>
    </>
  );
};

export default Home;
