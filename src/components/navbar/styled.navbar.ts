import styled from "styled-components";

export const StyledNavbar = styled.div`
  position: fixed;
  z-index: 999;
  right: 10px;
  top: 10px;
  display: flex;
  gap: 5px;
  @media only screen and (max-width: 767px) {
    top: 5px;
    right: 5px;
  }

  @keyframes shine-alt1 {
    0% {
      opacity: 0.5;
      transform: translateX(-100px) skewX(-15deg);
    }
    100% {
      opacity: 0.6;
      transform: translateX(300px) skewX(-15deg);
    }
  }

  @keyframes shine-alt2 {
    0% {
      opacity: 0;
      transform: translateX(-100px) skewX(-15deg);
    }
    100% {
      opacity: 1;
      transform: translateX(300px) skewX(-15deg);
    }
  }

  .GetVerified {
    width: 200px;
    height: 40px;
    background-size: 400% !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow : hidden;
    position: relative;
    cursor: pointer;

    h1 {
      color: rgba(255, 255, 255, 0.8);
      font-weight: 400;
      font-size: 1.2rem;
      transition : 0.1s ease-in-out;
      &:hover {
        color : rgba(255, 255, 255, 1);
      }
    }

    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      height: 100%;
      top: 0;
    }
    &::before {
      background: rgba(255, 255, 255, 0.5);
      width: 60px;
      left: 0;
      filter: blur(30px);
      animation: shine-alt1 2s ease-in-out infinite;
    }
    &::after {
      background: rgba(255, 255, 255, 0.2);
      width: 30px;
      left: 30px;
      filter: blur(5px);
      animation: shine-alt2 2s ease-in-out infinite;
    }
  }

  .Profile {
    width: 200px;
    height: 40px;
    border-radius: 5px;
    padding: 2px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    background: rgba(195, 185, 252, 0.15);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.06);

    .UserInfo {
      height: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      padding: 10px 5px;
      /* justify-content : flex-end; */

      .User_name {
        /* color: var(--main_color); */
        font-weight: 400;
        /* text-transform: uppercase; */
      }
      .online {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .online_dot {
          width: 8px;
          height: 8px;
          background-color: red;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
    }

    .Avatar {
      width: 35px;
      height: 100%;
      background-color: white;
      border-radius: 3px;
      background-position: center;
      background-size: cover;
      transition: 0.2s ease-in-out;
      position: relative;
      overflow: hidden;

      &:hover {
        /* border : 1px solid var(--main_color); */
        &:after {
          content: "";
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: var(--main_color);
          opacity: 0.1;
        }
      }
    }
  }

  .Nav_item {
    width: 40px;
    height: 40px;
    background: rgba(195, 185, 252, 0.15);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      .Nav_item_icon {
        opacity: 1;
      }
    }

    .Nav_item_icon {
      color: var(--main_color);
      opacity: 0.7;
      transition: 0.2s ease-in-out;
    }
  }
`;
