import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";

import { darkModeAction } from "../app/store";

export default function Root() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode).darkMode;

  return (
    <Main>
      <GlobalStyle darkMode={darkMode} />

      <Header>
        <Link to="/" style={{ color: "#54a1f0", textDecoration: "none" }}>
          <Title>Users App</Title>
        </Link>

        <LightMode
          onClick={() => {
            dispatch(darkModeAction.toggleDarkMode());
          }}
        >
          {darkMode ? "LIGHT" : "DARK"}
          <SunMoonIcon src={darkMode ? sun : moon} alt="sun" />
        </LightMode>
      </Header>

      <Outlet darkMode={darkMode} />
    </Main>
  );
}

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Space Mono', monospace;
  font-weight: 400;
}
  body {
    background: ${(props) => (props.darkMode ? "#141d2f" : "#F6F8FF")};
    color: ${(props) => (props.darkMode ? "white" : "#4B6A9B")};

    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    @media (min-width: 1200px) {
      min-width: 100%;
      min-height: 99vh;
    }
  }
`;

const Main = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  @media (min-width: 900px) {
    padding: 30px;
  }
  @media (min-width: 1440px) {
    width: 1440px;
    padding: 50px;
  }
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
  padding: 0 10%;
  @media (min-width: 900px) {
    padding: 0 50px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
`;

const LightMode = styled.div`
  font-weight: 700;
  letter-spacing: 2.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SunMoonIcon = styled.img`
  margin-left: 16px;
`;
