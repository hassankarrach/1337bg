"use client";

import React from "react";
import styled from "styled-components";
import Badge from "./components/Badge";

const StyledBadgePage = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--main_background);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* flex-direction: column; */
  .badge_settings {
    padding: 10px;
    .badge_settings__form {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: flex-start;
      gap: 3px;
      h2{
        margin-bottom : 15px;
      }
      input {
        width: 300px;
        outline: none;
        border: none;
        background-color: rgba(44, 44, 48, 0.9);
        padding: 10px 6px;
        border-radius: 5px;
      }
      button{
        width: 300px;
        padding : 5px;
        height : 40px;
        background-color : var(--main_color_light);
        outline : none;
        border : none;
        border-radius : 5px;
        cursor: pointer;
      }
    }
  }
`;

const page = () => {
  return (
    <StyledBadgePage>
      <h1>Get your digital badge.</h1>

      <div className="badge_settings">
        <div className="badge_settings__form">
          <h2>Badge Settings</h2>
          <input type="text" placeholder="Nickname" />
          <input type="text" placeholder="Banner url" />
          <input type="text" placeholder="Linkedin url" />
          <input type="text" placeholder="Github url" />
          <input type="text" placeholder="Twitter url" />
          <button>Generate Badge</button>
        </div>
      </div>

      <Badge />
    </StyledBadgePage>
  );
};

export default page;
