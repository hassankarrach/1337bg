//badge_preview.tsx
import React from "react";
import styled from "styled-components";
import {
  FaCheckSquare,
  FaLinkedin,
  FaGithubSquare,
  FaTwitterSquare,
} from "react-icons/fa";
//orgs
import _um6p_logo from "../../../../public/logos/um6p.png";
import _42_logo from "../../../../public/logos/42.png";
import _1337_logo from "../../../../public/logos/1337.svg";

const StyledBadg = styled.div`
  width: 600px;
  height: 300px;
  background-color: white;
  border-radius: 5px;
  position: relative;
  border: 1px solid var(--Header_grey);
  overflow: hidden;

  .banner {
    width: 100%;
    height: 40%;
    background-color: var(--main_color);
    background-image: url("https://www.icegif.com/wp-content/uploads/2023/03/icegif-47.gif");
    background-position: center;
    background-size: cover;
    position: relative;
    .verified {
      /* color: var(--main_color); */
    }
    h1 {
      position: absolute;
      left: calc(20px + 100px + 5px);
      bottom: 10%;
      color: white;
      font-weight: 300;
      font-size: 1.8rem;
    }
    .level {
      position: absolute;
      right: 20px;
      bottom: 10%;
      background-color: var(--main_color_dark);
      background: rgba(44, 44, 48, 0.2);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 1px 10px;
      border-radius: 5px;
      font-size: 1.2rem;
      p {
        color: white;
      }
    }
  }
  .avatar {
    width: 100px;
    height: 110px;
    background-color: var(--main_color_dark);
    position: absolute;
    border-radius: 10px;
    top: 30px;
    left: 20px;
    background-image: url("https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg");
    background-size: cover;
    background-position: center;
  }
  .orgs {
    display: flex;
    gap: 8px;
    position: absolute;
    align-items: center;
    left: 5px;
    bottom: 5px;
    width: 100%;
    .org_item {
      height: 17px;
      cursor: pointer;
      &.forty_two {
        height: 25px;
      }
    }
  }
  .socials {
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: var(--Header_grey);

    .icon_ {
      transition: 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        color: var(--main_color_dark);
      }
    }
  }
`;

const Badg = () => {
  return (
    <StyledBadg>
      <div className="banner">
        <h1>
          Hassan Karrach
          <FaCheckSquare size={22} className="verified" />
        </h1>

        <div className="level">
          <p>2.5</p>
        </div>
      </div>
      <div className="avatar"></div>
      {/* <div className="infos">
        <p>42 Login : hkarrach</p>
        <p>join date : </p>
        <p>Campus : Benguerir</p>
        <p
      </div> */}
      <div className="orgs">
        <img src={_um6p_logo.src} className="org_item" />
        <svg
          height="15px"
          viewBox="0 0 76 20"
          fill="black"
          className="org_item"
        >
          <path
            d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z"
            fill="black"
          ></path>
          <path
            d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
            fill="black"
          ></path>
          <path
            d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
            fill="black"
          ></path>
          <path
            d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
            fill="black"
          ></path>
        </svg>
        <img src={_42_logo.src} className="org_item forty_two" />
      </div>
      <div className="socials">
        <FaLinkedin size={20} className="icon_" />
        <FaGithubSquare size={20} className="icon_" />
        <FaTwitterSquare size={20} className="icon_" />
      </div>
    </StyledBadg>
  );
};

export default Badg;
