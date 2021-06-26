import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import ENDPOINT from "../../redux/ENDPOINT";
import Loader from "../Loader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopImage = styled.div`
  background: url(${(props) => props.src && props.src}) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 100vw;

  /* background: red; */
  max-height: 50vh;
  height: 100%;
`;

const ViewingStore = ({ toggleItem, id }) => {
  const store = useSelector((state) => state.user.store);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let loadStore = () => {
      setLoading(true);
      axios
        .post(`${ENDPOINT}/eats/loadrestaurant`, {
          id: store.id,
        })
        .then((response) => {
          setData(response.data[0]);
          setLoading(false);
        });
    };

    if (store && store.id) loadStore();
  }, [store]);

  console.log("store id: " + store.id + ", id: " + id);

  if (!loading)
    return (
      <Wrapper>
        {/* <pre>{JSON.stringify(store, null, 4)}</pre> */}
        <TopImage src={data.image && data.image} alt={data.name && data.name} />
      </Wrapper>
    );
  else return <Loader />;
};

export default ViewingStore;
