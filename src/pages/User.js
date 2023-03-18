import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

import { Card } from "../components/UserCard";

import { isLoadingAction } from "../app/store";
import { pageAction } from "../app/store";

const override = {
  position: "absolute",
  bottom: "10px",
  left: "48%",
};

const User = () => {
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading).isLoading;
  const page = useSelector((state) => state.page).page;

  const userRef = useRef(null);

  const fetchData = () => {
    dispatch(isLoadingAction.isLoadingTrue());
    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      )
      .then((response) => setUser(response.data));

    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/16`
      )
      .then((response) => {
        setFriends(response.data.list);
        dispatch(isLoadingAction.isLoadingFalse());
      });
  };

  const { id } = useParams();

  useEffect(() => {
    fetchData();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  useEffect(() => {
    getFriendsData();
  }, [page]);

  const getFriendsData = () => {
    dispatch(isLoadingAction.isLoadingTrue());
    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/16`
      )
      .then((response) => {
        const newFriendsData = response.data.list;
        setFriends((currentData) => [...currentData, ...newFriendsData]);

        dispatch(isLoadingAction.isLoadingFalse());
      });
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      dispatch(pageAction.incrementPage());
    }
  };

  const userViewHandler = () => {
    userRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <Main>
      <UserContainer ref={userRef}>
        <img width={275} src={`${user.imageUrl}?v=${user.id}`} alt="" />
        <div>
          <h3>
            <i>
              {user.prefix} {user.name} {user.lastName}
            </i>
          </h3>
          <p>{user.title}</p>
          <p>
            Email: <span>{user.email}</span>
          </p>
          <p>
            IP Address: <span>{user.ip}</span>
          </p>
          <p>
            Job Descriptor: <span>{user.jobDescriptor}</span>
          </p>
          <p>
            Job Area: <span>{user.jobArea}</span>
          </p>
          <p>
            Job Type: <span>{user.jobType}</span>
          </p>
        </div>
        <div>
          <h3>
            <i>
              {user.company?.name} {user.company?.suffix}
            </i>
          </h3>
          <p>
            city: <span>{user.address?.city}</span>
          </p>
          <p>
            country: <span>{user.address?.country}</span>
          </p>
          <p>
            state: <span>{user.address?.state}</span>
          </p>
          <p>
            street Address: <span>{user.address?.streetAddress}</span>
          </p>
          <p>
            ZIP: <span>{user.address?.zipCode}</span>
          </p>
        </div>
      </UserContainer>

      <div>
        <h2>Friends</h2>
        <FriendsContainer>
          {friends?.map((item) => (
            <Link
              to={`/user/${item.id}`}
              onClick={userViewHandler}
              key={Math.random() * Math.random()}
              style={{ color: "#54a1f0", textDecoration: "none" }}
            >
              <Card>
                <img width={275} src={`${item.imageUrl}?v=${item.id}`} alt="" />
                <h4>
                  {item.prefix} {item.name} {item.lastName}
                </h4>
                <br />
                <p>{item.title}</p>
              </Card>
            </Link>
          ))}
          <ClipLoader
            loading={isLoading}
            color="#0b999e"
            cssOverride={override}
          />
        </FriendsContainer>
      </div>
    </Main>
  );
};

export default User;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-weight: 700;
    margin-bottom: 30px;
  }
`;

const UserContainer = styled.div`
  width: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border: 2.5px solid #54a1f0;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 30px;
  h3 {
    margin-bottom: 15px;
  }

  @media (min-width: 1000px) {
    min-width: 1000px;
    flex-direction: row;
    justify-content: space-around;
    gap: 40px;
    padding: 30px;
  }
`;

const FriendsContainer = styled.div`
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
