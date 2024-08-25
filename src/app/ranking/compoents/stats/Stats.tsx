import React from "react";
import styled from "styled-components";
import {
  FaUser as UserIcon,
  FaSkull as BlackHoledIcon,
  FaUserGraduate as AlumniIcon,
} from "react-icons/fa";

const StyledStats = styled.div`
  width: 100%;
  height : auto;
  background-color: #212125;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  .title {
    color: white;
    font-size: 1rem;
    font-family: var(--playable_font);
    font-weight: 100;
    opacity: 0.8;
  }

  .Item {
    width: 100%;
    border-radius: 5px;
    border : 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      /* background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 100% */
      /* ); */
      background-color: rgba(0, 0, 0, 0.2);
      border-left: 1px solid rgba(255, 255, 255, 0.06);
      color: white;
      font-weight: 300;
      padding: 5px;
      border-radius: 3px;
      display : flex;
      justify-content : center;
      align-items : center;
      gap : 3px;
      flex : 1;
    }
  }
`;

const Stats = () => {
  return (
    <StyledStats>
      <h1 className="title">Stats :</h1>

      <div className="Item">
        <span>
          <UserIcon /> - students
        </span>
        <span>
          <UserIcon /> - Males
        </span>
        <span>
          <UserIcon /> - Females
        </span>
      </div>

      <div className="Item">
        <span>
          <AlumniIcon /> - Allumini
        </span>
        <span>
          <BlackHoledIcon /> - Blackholed
        </span>
      </div>
    </StyledStats>
  );
};

export default Stats;
