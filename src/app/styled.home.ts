import styled from "styled-components";
import svg_illustr from "../../public/assets/main.svg";
import { HexToRgba } from "@/utils/HexToRgba";
import { PromoItemProps } from "./page";

export const StyledMain = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: var(--main_background);
  padding: 5px;
  padding-left: 5vw;
  flex-direction: column;
  /* justify-content : space-between; */
  align-items: flex-start;

  .Details {
    flex: 1;
    width: 100%;
    display: flex;
    .Right_side {
      width: 50%;
      position: relative;
      .BackgroundTexts {
        height: 100%;
        width: 100%;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items : center;

        h1 {
          font-family: var(--playable_font);
          font-size: 5rem;
          -webkit-text-stroke: 1px var(--main_color);
          -webkit-text-fill-color: transparent;
          opacity : 0.4;
          &:nth-of-type(1){
            margin-left : -40%;
          }
        }

      }
      .PromosPresentation {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        .Items_container{
            gap: 5px;
            display : flex;
        }
      }
    }

    .Left_side {
      width: 50%;
      height: 100%;
      display : flex;
      justify-content : center;
      align-items : center;
      padding : 0px 15px;
      span{
        font-size :1.4rem;
        color : white;
        font-weight : 200;
      }
    }
  }
  .Banner {
    width: 100%;
    height: 60vh;
    background-color: transparent;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      50px 100%,
      0% calc(100% - 50px)
    );

    background-image: url("/Header.jpg");
    background-position: center;
    background-size: cover;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 5px 4%;

    h1 {
      font-family: var(--playable_font);
      font-size: 2.4rem;
      font-weight: 100;
      color: white;
    }

    .login_card {
      height: 50px;
      width: 200px;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      .login_button {
        outline: none;
        background: linear-gradient(122deg, rgba(183,251,43,1) 0%, rgba(136,199,8,1) 30%);
        /* border: 1px solid rgba(214,207,255,0.7); */
        border: none;
        outline: none;
        display: flex;
        align-items: center;
        padding: 2px 5px;
        width: 200px;
        height: 100%;
        border-radius: 4px;
        z-index: 999;
        margin-left: auto;
        cursor: pointer;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        transition: 0.5s ease-in-out;
        &:hover {
          background: linear-gradient(122deg, rgba(183,251,43,1) 0%, rgba(134,196,5,1) 30%);
          ._42logo {
            fill: var(--main_color_dark);
          }
          span {
            color: var(--main_color_dark);
          }
        }

        span {
          /* font-family : var(--main_font); */
          font-weight: 500;
          font-size: 1.3rem;
          text-transform: uppercase;
          color: var(--main_color_dark);
          background-color: transparent;
          transition: 0.2s ease-in-out;
        }
        ._42logo {
          width: 30px;
          background-color: transparent;
          fill: var(--main_color_dark);
          margin: 0px 10px;
          transition: 0.2s ease-in-out;
        }
        ._devider {
          width: 1px;
          height: 90%;
          margin-left: auto;
          background: linear-gradient(
            0deg,
            rgba(0, 187, 64, 0.02) 0%,
            rgba(14, 26, 42, 0.2) 35%,
            rgba(0, 187, 64, 0.02) 100%
          );
        }
      }
    }
  }
`;
export const StyledPromoItem = styled.div<PromoItemProps>`
  width: 70px;
  height: ${props => props.rank == 1 ? '300px' : props.rank == 2 ? '280px' : '250px'};
  background: rgba(10, 11, 20, 0.25);
  box-shadow: 0 8px 32px 0  rgba(183,251,43, 0.05);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: auto;
  cursor: pointer;
  transition : 0.2s ease-in-out;
  &:hover{
    box-shadow: 0 8px 52px 0  rgba(183,251,43, 0.1);
  }
  /* align-items  : flex-start; */
  .PromoAvatar {
    width: 70px;
    height: 70px;
    background-color: var(--main_color);
    border-radius: 50%;
    border-top: 1px solid var(--main_color);
    border-left: 1px solid var(--main_color);
    border-right: 1px solid var(--main_color);
    background-position: center;
    background-size: cover;
    background-image : ${props => `url(${props.avatar})`};
    h1 {
      font-family: var(--playable_font);
      font-size : 1.5rem;
      margin-top: 90%;
      transform: rotate(90deg);
      color : white;
      font-weight : 100;
      /* -webkit-text-stroke: 1px var(--main_color);
      -webkit-text-fill-color: transparent; */
    }
  }
  .PromoDetails {
    /* background-color: red; */
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    /* padding : 3px; */
  }
  .PromoPower {
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      /* font-size : 1rem; */
      -webkit-text-stroke: 1px var(--main_color);
      -webkit-text-fill-color: transparent;
    }
  }
`;
