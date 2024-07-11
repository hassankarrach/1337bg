"use client";
import { NextPage } from 'next';
import styled from 'styled-components';

const StyledNotFound = styled.div`
    width : 100%;
    height : 100vh;
    background-color : var(--main_background);

    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    h1 {
      color : white;
    }
`

const Custom404: NextPage = () => {
  return (
    <StyledNotFound>
      <h1>Oops! This page is not found.</h1>
      <p>Maybe it got swallowed by a blackhole... 🕳️</p>
    </StyledNotFound>
  );
};

export default Custom404;
