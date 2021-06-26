import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import MenuIcon from "../MenuIcon";
import { gsap } from "gsap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const Wrapper = styled.div`
  padding-top: 5px;
  display: grid;
  grid-template-columns: 0.1fr 0.8fr 1fr 0.1fr;
  grid-template-rows: 1fr;
  gap: 0px 5px;
  grid-template-areas: "menuIcon logo search cart";
  align-items: center;
  padding-right: 5px;
  padding-left: 5px;
  font-family: "UberMoveBold", sans-serif;
  z-index: 999;
  @media (min-width: 480px) {
    grid-template-areas: "menuIcon logo address search cart";
    grid-template-columns: 0.1fr 0.8fr 3fr 3fr 0.1fr;
  }
`;

const MenuIconWrapper = styled.div`
  grid-area: menuIcon;
`;

const LogoWrapper = styled.div`
  grid-area: logo;
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  grid-area: search;
  overflow: hidden;
  background: #f6f6f6;
  color: grey;
  padding: 0.5em 0;
  padding-left: 0.5em;

  cursor: pointer;
`;

const AddressWrapper = styled.div`
  @media (max-width: 649px) {
    visibility: hidden;
  }
  @media (min-width: 480px) {
    grid-area: address;
    visibility: inherit;
    background: #f6f6f6;
    padding: 0.5em 0;
    padding-left: 0.5em;
    cursor: pointer;
  }
`;

const CartWrapper = styled.div`
  grid-area: cart;
  @media (min-width: 500px) {
    padding-right: 1em;
  }
`;

const Logo = styled.div`
  display: flex;
  font-size: 22px;
  font-weight: bold;
  & > span {
    color: #06c167;
    padding-left: 0.2em;
  }
`;

const CartButton = styled.div`
  background: #000;
  color: #fff;
  padding: 0.8em 0.5em;
  font-weight: bold;
  cursor: pointer;
`;

const SearchMenuWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 9;
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchMenuContainer = styled.div`
  background: #eeeeee;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-evenly;
`;

const SearchMenuTitle = styled.h1`
  text-align: center;
`;

const SearchMenuInput = styled.input`
  border: none;
  padding: 1em;
  width: 80%;
  margin: 0.5em auto;
  background: #fff;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background: #000;
  color: #fff;
  width: 100%;
  width: 80%;
  margin: 1em auto;
  cursor: pointer;
`;

const SearchMenuClose = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
`;

const Svg = styled.svg`
  cursor: pointer;
`;

const TopBar = ({ activeMenu, setActiveMenu }) => {
  const history = useHistory();
  const [searchString, setSearchString] = useState("");
  const [address, setAddress] = useState("");
  const tl = gsap.timeline({ paused: true });
  const animRef = useRef(null);
  const searchWindowRef = useRef(null);

  useEffect(() => {
    animRef.current = tl.fromTo(
      searchWindowRef.current,
      {
        scale: 0,
        autoAlpha: 0,
        zIndex: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        zIndex: 999,
      }
    );
  }, []);

  const openSearch = () => {
    animRef.current.play();
  };

  const handleSearch = () => {
    if (searchString && searchString.length > 1)
      animRef.current.reverse().then(() => {
        history.push("/feed/search/" + searchString);
      });
  };
  const stateAddress = useSelector((state) =>
    state.user.address ? state.user.address : null
  );
  useEffect(() => {
    if (stateAddress && !address) {
      setAddress(stateAddress);
    }
  }, [stateAddress]);

  const string = useSelector((state) =>
    state.user.searchString ? state.user.searchString : "What are you craving?"
  );
  const hasAddress = useSelector((state) => state.user.address) ? true : false;

  const handleLogoClick = () => {
    if (history.pathname !== "/") {
      if (!hasAddress) {
        history.push("/");
      } else history.push("/feed");
    }
  };

  return (
    <>
      <SearchMenuWrapper ref={searchWindowRef}>
        <SearchMenuContainer>
          <SearchMenuTitle>Search</SearchMenuTitle>
          <SearchMenuInput
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onKeyPress={(key) => {
              if (key.key === "Enter") handleSearch();
            }}
            placeholder="Search for a food or restaurant"
          />
          <SearchButton onClick={() => handleSearch()}>Search</SearchButton>
          <SearchMenuClose>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
              onClick={() => animRef.current.reverse()}
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
            </Svg>
          </SearchMenuClose>
        </SearchMenuContainer>
      </SearchMenuWrapper>
      <Wrapper>
        <MenuIconWrapper>
          <MenuIcon active={activeMenu} setActive={setActiveMenu} />
        </MenuIconWrapper>
        <LogoWrapper onClick={() => handleLogoClick()}>
          <Logo>
            Home <span> Page</span>
          </Logo>
        </LogoWrapper>
        <AddressWrapper>{address}</AddressWrapper>
        <SearchWrapper onClick={() => openSearch()}>
          {string.charAt(0).toUpperCase() + string.slice(1)}
        </SearchWrapper>
        <CartWrapper>
          <CartButton>Cart</CartButton>
        </CartWrapper>
      </Wrapper>
    </>
  );
};

export default TopBar;
