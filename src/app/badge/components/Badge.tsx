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

interface BadgeStyleProps {
  $banner_url: string;
  $avatar_url: string;
}
const StyledBadg = styled.div<BadgeStyleProps>`
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
    background-image: url(${(props: any) => props.$banner_url});
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
      bottom: -10%;
      padding: 1px 10px;
      border-radius: 5px;
      font-size: 1.2rem;
      .orange {
        background: linear-gradient(to bottom right, #ffeb3b 0%, #fbc02d 100%);
        color: #ffb300;
      }
      .badge {
        position: relative;
        width: 40px;
        height: 57px;
        border-radius: 10px;
        display: inline-block;
        top: 0;
        cursor: pointer;
        &:before,
        &:after {
          position: absolute;
          width: inherit;
          height: inherit;
          border-radius: inherit;
          background: inherit;
          content: "";
          @include margin-auto;
        }
        &:before {
          transform: rotate(60deg);
        }
        &:after {
          transform: rotate(-60deg);
        }
        .circle {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 10;
          color: white;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          h1 {
            position: static;
            font-size: 2.2rem;
            font-weight: 500;
          }
        }
        .ribbon {
          position: absolute;
          border-radius: 4px;
          width: 60px;
          padding: 2px 10px;
          z-index: 11;
          color: #fff;
          height: 15px;
          font-size: 13px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.27);
          text-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
          text-transform: uppercase;
          background: linear-gradient(to bottom right, #555 0%, #333 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          bottom: 10%;
        }
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
    background-image: url(${(props: any) => props.$avatar_url});
    background-size: cover;
    background-position: center;
  }
  .orgs {
    display: flex;
    gap: 8px;
    position: absolute;
    align-items: center;
    left: 20px;
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
    right: 20px;
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
  .infos {
    position: absolute;
    top: calc(40% + 20px);
    left: 20px;
    .info_item {
      display: flex;
      p:first-child {
        opacity: 0.7;
        /* width : 100px; */
        width: 120px;
      }
    }
  }
`;

interface BadgProps {
  full_name: string;
  nickname : string | undefined;
  login: string;
  level: number;
  email: string;
  cursus: string;
  join_date: string;
  campus: string;
  twitter_link: string;
  github_link: string;
  linkedin_link: string;
  banner_url: string;
  avatar_url: string;
}

const Badg: React.FC<BadgProps> = ({
  full_name,
  avatar_url,
  banner_url,
  campus,
  cursus,
  email,
  github_link,
  join_date,
  level,
  linkedin_link,
  login,
  twitter_link,
  nickname
}) => {
  return (
    <StyledBadg $avatar_url={avatar_url} $banner_url={banner_url}>
      <div className="banner">
        <h1>
          {full_name} {nickname && `(${nickname})`}
          <FaCheckSquare size={22} className="verified" />
        </h1>

        <div className="level">
          <div className="badge orange">
            <div className="circle">
              <h1>{Math.floor(level || 0)}</h1>
              <div className="ribbon">
                {level == 0
                  ? "Newbie"
                  : level > 0 && level < 3
                  ? "Novice"
                  : level > 2 && level < 5
                  ? "Learner"
                  : level > 4 && level < 7
                  ? "Intermediate"
                  : level > 6 && level < 9
                  ? "Advanced"
                  : level > 8 && level < 11
                  ? "Expert"
                  : level >= 11
                  ? "Master"
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="avatar"></div>
      <div className="infos">
        <div className="info_item">
          <p>42 Login</p>
          <p>: {login}</p>
        </div>
        <div className="info_item">
          <p>Student mail</p>
          <p>: {email}</p>
        </div>
        <div className="info_item">
          <p>Cursus</p>
          <p>: {cursus}</p>
        </div>
        <div className="info_item">
          <p>joined year</p>
          <p>: {join_date}</p>
        </div>
        <div className="info_item">
          <p>Campus</p>
          <p>: {campus}</p>
        </div>
      </div>
      <div className="orgs">
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
        <img src={_um6p_logo.src} className="org_item" />
      </div>
      <div className="socials">
        <a href={linkedin_link} target="_blank">
          <FaLinkedin size={20} className="icon_" />
        </a>
        <a href={github_link} target="_blank">
          <FaGithubSquare size={20} className="icon_" />
        </a>
        <a href={twitter_link} target="_blank">
          <FaTwitterSquare size={20} className="icon_" />
        </a>
      </div>
    </StyledBadg>
  );
};

export default Badg;
