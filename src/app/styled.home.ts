import styled from "styled-components";
import svg_illustr from "../../public/assets/main.svg";
import { HexToRgba } from "@/utils/HexToRgba";

export const StyledMain = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: var(--main_background);
  padding: 5px;
  padding-left: 70px;
  flex-direction: column;
  /* justify-content : space-between; */
  align-items: flex-start;

  @media only screen and (max-width: 767px){
    padding : 3px;
  }

  .Banner {
    width: 100%;
    height: 100vh;
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
    @media only screen and (max-width: 767px){
      height : 100vh;
    }
    background-color : #101B2B;

    .Header_photo{
      height :100%;
      /* top : -30%; */
      position  :absolute;
      right : 0;
      @media only screen and (max-width: 767px){
        height : 100%;
        top : 0;
      }
      /* position : relative; */
    }
    &:after{
      position : absolute;
      left : 0;
      content : "";
      height : 100%;
      width  :100%;
      background : linear-gradient(90deg, rgba(16,27,43,1) 50%, rgba(16,27,43,0) 100%);
    }

    /* background-image: url("/Header.jpg");
    background-position: center;
    background-size: cover; */

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
      z-index : 9;
      @media only screen and (max-width: 767px){
        font-size : 1.5rem;
      }
    }

    .login_card {
      height: 50px;
      width: 200px;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index : 999;
      

      .login_button {
        outline: none;
        background: linear-gradient(122deg, #40E440 0%,rgb(44, 224, 44) 30%);
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
          background: linear-gradient(122deg, #40E440 0%,rgb(88, 255, 88) 30%);
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

