import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

import UserCard from "../components/UserCard";

import { isLoadingAction } from "../app/store";
import { pageAction } from "../app/store";

const override = {
  position: "absolute",
  bottom: "10px",
  left: "48%",
};

const Homepage = () => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading).isLoading;
  const page = useSelector((state) => state.page).page;

  const fetchData = () => {
    dispatch(isLoadingAction.isLoadingTrue());
    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/16`
      )
      .then((response) => {
        const newData = response.data.list;
        setData((currentData) => [...currentData, ...newData]);
        dispatch(isLoadingAction.isLoadingFalse());
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      dispatch(pageAction.incrementPage());
    }
  };

  return (
    <HomepageContainer>
      {data.map((user) => (
        <UserCard key={Math.random() * Math.random()} user={user} />
      ))}
      <ClipLoader loading={isLoading} color="#0b999e" cssOverride={override} />
    </HomepageContainer>
  );
};

export default Homepage;

const HomepageContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto;
  margin: 0 auto;
  @media (min-width: 680px) {
    grid-template-columns: auto auto;
    gap: 10px;
  }
  @media (min-width: 1440px) {
    grid-template-columns: auto auto auto auto;
    gap: 20px;
  }
`;
