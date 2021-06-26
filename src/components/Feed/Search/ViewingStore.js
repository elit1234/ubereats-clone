import React, { lazy, Suspense, useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { gsap } from "gsap";
import SideBar from "../../SideBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "UberMoveBold", sans-serif;
  height: 100vh;
`;

const TopImage = styled.div`
  height: 275px;
  background: ${(props) => (props.src ? `url(${props.src})` : `#e6e6e6`)}
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  align-items: flex-end;
`;

const StoreTopDetails = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  width: 100%;
`;

const StoreTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  ${(props) =>
    props.colour &&
    `
    color: ${props.colour};
  `}
`;

const StoreInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  ${(props) => props.colour && `color: ${props.colour}`}
`;

const StoreOpen = styled.div`
  background: green;
`;

const StoreDeliveryFee = styled.div``;

const StoreServiceFee = styled.div``;

const StoreDeliveryTime = styled.div``;

const StoreRating = styled.div``;

const ViewingStore = () => {
  const user = useSelector((state) => state.user);
  const TopBar = lazy(() => import("../TopBar"));
  const { store } = user ? user : null;
  const tl = gsap.timeline({});
  const [activeMenu, setActiveMenu] = useState(false);

  console.log(store);

  return (
    <>
      <SideBar active={activeMenu} setActive={setActiveMenu} />
      <Suspense fallback={<></>}>
        <div
          onClick={() => {
            if (activeMenu) setActiveMenu(false);
          }}
        >
          <Wrapper>
            <TopBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <TopImage src={store && store.image ? store.image : 0}>
              <StoreTopDetails>
                <StoreTitle
                  colour={store && store.titleColour ? store.titleColour : 0}
                >
                  {store && store.name && store.name}
                </StoreTitle>
                <StoreInfo
                  colour={store && store.titleColour ? store.titleColour : 0}
                >
                  <StoreOpen />
                  <StoreDeliveryFee>$1.99 Delivery Fee</StoreDeliveryFee>
                  <StoreServiceFee>15-25 min</StoreServiceFee>
                </StoreInfo>
              </StoreTopDetails>
            </TopImage>
          </Wrapper>
        </div>
      </Suspense>
    </>
  );
};

export default ViewingStore;
