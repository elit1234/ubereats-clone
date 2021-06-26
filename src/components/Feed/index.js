import React, { useState } from "react";
import styled from "styled-components";
import MenuIcon from "../MenuIcon";
import SideBar from "../SideBar";
import Items from "./Items";
import TopBar from "./TopBar";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  background: #fff;
  font-family: "UberMoveBold", sans-serif;
`;

const Feed = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  return (
    <>
      <SideBar active={activeMenu} setActive={setActiveMenu} />

      <Wrapper
        onClick={() => {
          if (activeMenu) setActiveMenu(false);
        }}
      >
        <TopBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <Items />
      </Wrapper>
    </>
  );
};

export default Feed;
