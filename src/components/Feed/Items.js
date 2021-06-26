import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import ViewingStore from "./ViewingStore";
import { actions } from "../../redux/user";
import { useDispatch } from "react-redux";
import axios from "axios";
import ENDPOINT from "../../redux/ENDPOINT";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  @media (max-width: 700px) {
    justify-content: center;
  }
  align-items: center;
  flex-wrap: wrap;
`;

const Item = styled.div.attrs((props) => ({
  className: props.clicked ? "storeItem active" : "storeItem inactive",
}))`
  width: 240px;
  height: 150px;
  display: flex;
  flex-direction: column;
  margin: 2%;
  padding: 1em;
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

const Items = () => {
  const [items, setItems] = useState([]);
  const history = useHistory();
  const [clicked, setClicked] = useState(-1);
  const tl = gsap.timeline({ paused: true });
  const animRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    animRef.current = tl
      .fromTo(
        ".item",
        {
          x: "-100vw",
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
          stagger: 0.25,
        }
      )

      .play();
  }, []);

  const staticItems = [
    {
      id: 1,
      name: "First restaurant",
      stars: 5,
      description: "This is the first restaurant",
      image: "https://i.imgur.com/4kddRvK_d.webp?maxwidth=760&fidelity=grand",
    },
    {
      id: 2,
      name: "Second restaurant",
      stars: 5,
      description: "This is the second restaurant",
    },
    {
      id: 3,
      name: "third restaurant",
      stars: 5,
      description: "This is the third restaurant",
    },
    {
      id: 4,
      name: "Fourth restaurant",
      stars: 5,
      description: "This is the fourth restaurant",
    },
    {
      id: 5,
      name: "Fifth restaurant",
      stars: 5,
      description: "This is the fifth restaurant",
    },
    {
      id: 6,
      name: "Sixth restaurant",
      stars: 5,
      description: "This is the sixth restaurant",
    },
    {
      id: 7,
      name: "Seventh restaurant",
      stars: 5,
      description: "This is the seventh restaurant",
    },
    {
      id: 8,
      name: "Eighth restaurant",
      stars: 5,
      description: "This is the eighth restaurant",
    },
  ];

  useEffect(() => {
    const loadItems = async () => {
      const query = await axios.get(`${ENDPOINT}/eats/loadmain`);
      let res = await query.data;
      console.log(res);
      if (res && res.stores) setItems(res.stores);
    };
    loadItems();
  }, []);

  const handleItemClick = (item, key) => {
    dispatch(actions.setStore(item));
    setClicked(key);

    setTimeout(() => {
      animRef.current = tl

        .to(
          ".inactive",
          {
            autoAlpha: 0,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          ".active",
          {
            rotate: 55,
            duration: 0.4,
            ease: "power2.inOut",
          },
          1
        )
        .to(
          ".active",
          {
            rotate: "-360",
            duration: 1.2,
            width: "100%",
            ease: "power1.inOut",
            delay: 0.4,
          },
          1
        )

        .play()
        .then(() => {
          setTimeout(() => {
            history.push("/feed/restaurant/" + item.id);
          }, 250);
        });
    }, 100);
  };

  return (
    <Wrapper>
      {items &&
        items.map((item, key) => {
          return (
            <Item
              key={key}
              id={key}
              clicked={clicked === key ? 1 : 0}
              onClick={() => handleItemClick(item, key)}
            >
              <ItemImage image={item.image ? item.image : 0} />
              <ItemBottom>
                <ItemTopRow>
                  <ItemName>{item && item.name && item.name}</ItemName>
                  <ItemRating>{item && item.stars && item.stars}</ItemRating>
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
    </Wrapper>
  );
};

export default Items;
