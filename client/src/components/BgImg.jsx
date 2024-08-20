import React from "react";
import bgImg from "../assets/login.jpg";
import styled from "styled-components";

export default function BgImg() {
  return (
    <Container>
      <img src={bgImg} alt="Background Image" />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  img {
    height: 100vh;
    width: 100vw;
  }
`;