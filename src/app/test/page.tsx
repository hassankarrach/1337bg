"use client";

import React from "react";
import styled from "styled-components";
import { create_user } from "../../../actions/user_action";

const StyledTest = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const page = () => {
    const onClick = async () => {
        try {
          await create_user();
        } catch (error) {
          console.error("Error creating user:", JSON.stringify(error, null, 2));
        }
      };
      
  return (
    <StyledTest>
      <button onClick={onClick}>create user</button>
    </StyledTest>
  );
};

export default page;
