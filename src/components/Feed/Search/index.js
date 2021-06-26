import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { gsap } from "gsap";

import { actions } from "../../../redux/user";
import Loader from "../../Loader";
import ENDPOINT from "../../../redux/ENDPOINT";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  font-family: "UberMoveBold", sans-serif;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Items = styled.div`
  display: flex;
  @media (max-width: 700px) {
    justify-content: center;
  }
  align-items: center;
  flex-wrap: wrap;
`;

const Item = styled.div.attrs((props) => ({
  className: props.active ? "storeItem active" : "storeItem inactive",
}))`
  width: 240px;
  height: 150px;
  display: flex;
  flex-direction: column;
  margin: 2%;
  padding: 1em;
`;

const PageTitle = styled.h1`
  padding-left: 0.5em;
`;

const ItemImage = styled.div`
  background: url(${(props) => props.image && props.image}) no-repeat center
    center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 110px;
  width: 100%;
  cursor: pointer;
`;

const ItemBottom = styled.div`
  margin-top: 10px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ItemTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50%;
`;

const ItemBottomRow = styled.div`
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const ItemDeliveryTime = styled.div``;

const ItemDeliveryFee = styled.div``;

const ItemDeliveryCost = styled.div``;

const ItemName = styled.p`
  font-size: 120%;
  cursor: pointer;
`;

const ItemRating = styled.div`
  padding: 0.15em 0.4em;
  background: #e6e6e6;
  border-radius: 50%;
  font-size: 90%;
`;

const Search = () => {
  const SideBar = React.lazy(() => import("../../SideBar"));
  const TopBar = React.lazy(() => import("../TopBar"));

  const params = useParams();
  const dispatch = useDispatch();
  const router = useHistory();
  const { searchString } = params;
  const [activeMenu, setActiveMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(-1);
  const animRef = useRef(null);
  const tl = gsap.timeline({ paused: true });
  const [hovering, setHovering] = useState(-1);

  useEffect(() => {
    dispatch(actions.setSearch({ string: searchString }));

    const loadSearch = async () => {
      const query = await axios.post(`${ENDPOINT}/eats/storesearch`, {
        string: searchString,
      });
      const res = await query.data;
      setData(res);
      dispatch(actions.setSearchResults(res.stores && res.stores));
      setLoading(false);
    };

    loadSearch();
  }, [searchString]);

  useEffect(() => {
    let hover = false;
    gsap.utils.toArray(".storeItem").forEach((storeItem) => {
      let hover = gsap.to(storeItem, {
        scale: 1.05,
        duration: 0.2,
        paused: true,
        ease: "power1.inOut",
      });
      storeItem.addEventListener("mouseenter", () => hover.play());
      storeItem.addEventListener("mouseleave", () => hover.reverse());
    });

    // items &&
    //   items.foreach(function (element, i) {
    //     element.addEventListener(
    //       "mouseover",
    //       function (event) {
    //         if (!hover) {
    //           gsap.to(element, 1, {
    //             transformOrigin: "50% 50%",
    //             scale: 2,
    //           });
    //         }
    //         hover = true;
    //       },
    //       false
    //     );
    //     element.addEventListener(
    //       "mouseleave",
    //       function (event) {
    //         if (!hover) {
    //           gsap.to(element, 1, {
    //             transformOrigin: "50% 50%",
    //             scale: 1,
    //           });
    //         }
    //         hover = true;
    //       },
    //       false
    //     );
    //   });
  }, []);

  const handleItemClick = (store) => {
    if (clicked === -1) {
      setClicked(store);
      setTimeout(() => {
        animRef.current = tl
          .to(".inactive", {
            scale: 0,
            autoAlpha: 0,
            height: 0,
            width: 0,
          })
          .to(".active", {
            width: "initial",
            x: "-100vw",
            duration: 1.5,
            delay: 0.5,
          })
          .play()
          .then(() => {
            router.push("/feed/restaurant/" + store.id);
          });
      }, 200);
    }
  };

  return (
    <React.Suspense fallback={<></>}>
      <SideBar active={activeMenu} setActive={setActiveMenu} />

      <Wrapper
        onClick={() => {
          if (activeMenu) setActiveMenu(false);
        }}
      >
        <TopBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <PageTitle>Searching for: {searchString && searchString}</PageTitle>
        {loading ? (
          <LoadingWrapper>
            <Loader />
          </LoadingWrapper>
        ) : (
          <Items>
            {data.stores &&
              data.stores.map((store, key) => {
                return (
                  <Item
                    key={key}
                    active={clicked && store && clicked.id === store.id ? 1 : 0}
                    onClick={() => handleItemClick(store)}
                  >
                    <ItemImage image={store.image && store.image} />
                    <ItemBottom>
                      <ItemTopRow>
                        <ItemName>{store && store.name && store.name}</ItemName>
                        <ItemRating>
                          {store && store.stars && store.stars}
                        </ItemRating>
                      </ItemTopRow>
                      <ItemBottomRow>
                        <ItemDeliveryTime>20-30 min</ItemDeliveryTime>
                        <ItemDeliveryFee>$6.99 Fee</ItemDeliveryFee>
                        <ItemDeliveryCost>$</ItemDeliveryCost>
                      </ItemBottomRow>
                    </ItemBottom>
                  </Item>
                );
              })}
          </Items>
          // <pre>{JSON.stringify(data, null, 4)}</pre>
        )}
      </Wrapper>
    </React.Suspense>
  );
};

export default Search;
