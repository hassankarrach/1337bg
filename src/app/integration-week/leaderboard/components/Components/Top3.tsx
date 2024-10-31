import { User } from "@/app/integration-week/page";
import React from "react";
import styled from "styled-components";

const StyledProfile = styled.div<{ rank: number }>`
  width: 190px; /* Slightly larger than inner border */
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    0deg,
    rgba(255, 215, 1) 0%,
    rgba(204, 255, 97, 0) 100%
  );
  margin-top : ${props => props.rank === 1 ? "-50px" : "0px"};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* Apply the hexagon mask to the outer border */
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' id='Layer_1' x='0' y='0' style='enable-background:new 0 0 458.6 498.1' version='1.1' viewBox='0 0 458.6 498.1'%3E%3Cswitch%3E%3Cg%3E%3Cpath d='m407.8 410.8-127.7 73.7c-31.4 18.2-70.2 18.2-101.6 0L50.8 410.8C19.4 392.6 0 359.1 0 322.8V175.4c0-36.3 19.4-69.9 50.8-88l127.7-73.7c31.4-18.2 70.2-18.2 101.6 0l127.7 73.7c31.4 18.2 50.8 51.7 50.8 88v147.4c0 36.3-19.3 69.8-50.8 88z' style='fill:%23010101'/%3E%3C/g%3E%3C/switch%3E%3C/svg%3E");
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  position: relative;

  .Badge {
    position: absolute;
    bottom: 0;
    z-index: 9999;
  }

  .inner-border {
    width: 180px; /* Slightly smaller than outer border */
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main_background); /* Inner border color */
    /* Apply the hexagon mask to the inner border */
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' id='Layer_1' x='0' y='0' style='enable-background:new 0 0 458.6 498.1' version='1.1' viewBox='0 0 458.6 498.1'%3E%3Cswitch%3E%3Cg%3E%3Cpath d='m407.8 410.8-127.7 73.7c-31.4 18.2-70.2 18.2-101.6 0L50.8 410.8C19.4 392.6 0 359.1 0 322.8V175.4c0-36.3 19.4-69.9 50.8-88l127.7-73.7c31.4-18.2 70.2-18.2 101.6 0l127.7 73.7c31.4 18.2 50.8 51.7 50.8 88v147.4c0 36.3-19.3 69.8-50.8 88z' style='fill:%23010101'/%3E%3C/g%3E%3C/switch%3E%3C/svg%3E");
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    .Profile {
      width: 170px;
      height: 170px;
      /* Applying the hexagon mask to the image */
      -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' id='Layer_1' x='0' y='0' style='enable-background:new 0 0 458.6 498.1' version='1.1' viewBox='0 0 458.6 498.1'%3E%3Cswitch%3E%3Cg%3E%3Cpath d='m407.8 410.8-127.7 73.7c-31.4 18.2-70.2 18.2-101.6 0L50.8 410.8C19.4 392.6 0 359.1 0 322.8V175.4c0-36.3 19.4-69.9 50.8-88l127.7-73.7c31.4-18.2 70.2-18.2 101.6 0l127.7 73.7c31.4 18.2 50.8 51.7 50.8 88v147.4c0 36.3-19.3 69.8-50.8 88z' style='fill:%23010101'/%3E%3C/g%3E%3C/switch%3E%3C/svg%3E");
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
      object-fit: cover;
    
    }
  }
`;

const Profile = () => {
  return (
    <StyledProfile rank={0}>
      <img src={`/assets/icons/1.png`} className="Badge" />
      <div className="inner-border">
        <img
          src={`https://www.w3schools.com/howto/img_avatar.png`}
          alt="Avatar"
          className="Profile"
        />
      </div>
    </StyledProfile>
  );
};

const StyledTop3 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Top3 = () => {
  return <StyledTop3>

    <Profile />
    <Profile />
    <Profile />


    {/* <Profile rank={1} img_url="https://www.w3schools.com/howto/img_avatar.png"/> */}
    {/* <Profile rank={3} img_url="https://www.w3schools.com/howto/img_avatar.png"/> */}
  </StyledTop3>;
};


export default Top3;
