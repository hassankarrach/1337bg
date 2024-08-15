import styled from "styled-components";
//weekly_placeholder'
import _feedback from "../../../public/feedback.png";

interface StyledCardProps {
  // BannerImg: string;
}

export const StyledRanking = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--main_background);
  overflow: hidden;
  padding-left: 70px;
  @media only screen and (max-width: 767px) {
    height: auto;
    padding: 5px;
    min-height: 100vh;
  }

  /* background-color :#FAFBF4; */

  /* &:before{
    content : "";
    width : 100%;
    height : 70vh;
    background-image : url("/Header.jpg");
    background-position : center 80%;
    background-size : cover;
    position : absolute;
    bottom : 0;
    opacity : 0.3;
  } */

  //Test : feeling weird:because of what. t
  .Container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    position: relative;
    z-index: 9;
    @media only screen and (max-width: 767px) {
      padding: 0px;
      min-height: 100vh;
    }
    /* flex-direction : column; */
    /* overflow  :hidden; */

    .ProfileContainer {
      width: 35%;
      height: 100%;
      padding: 55px 10px;
      padding-bottom: 5px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      .tmp {
        flex: 1;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        background-color: #212125;
        border: 1px solid rgba(255, 255, 255, 0.06);
        position: relative;
        overflow: hidden;
        .PaymentMethods {
          display: flex;
          gap: 2px;
          .PaymentMethod {
            size: 20px;
            cursor: pointer;
            color: white;
            opacity: 0.5;
            transition: 0.2s ease-in-out;
            &:hover {
              opacity: 1;
              //1 - on hover here
            }
          }
        }
        h1 {
          color: white;
          text-align: center;
          padding: 0px 5px;
          padding-bottom: 10px;
          font-size: 1rem;
          font-family: var(--Sec_Font);
          font-weight: 400;
          opacity: 0.8;
        }
        ._TomPhoto {
          position: absolute;
          width: 40%;
          left: -10%;
          bottom: -20%;
          display: none; 
          transition: 0.2s ease-in-out; 
        }
        .PaymentMethods:hover ~ ._TomPhoto {
          display: block;
        }
      }

      @media only screen and (max-width: 767px) {
        display: none;
      }
    }

    .LeaderBoardContainer {
      height: 100%;
      flex: 1;
      padding: 55px 10px;
      padding-bottom: 5px;
      @media only screen and (max-width: 767px) {
        padding: 0px;
      }
      .Ranking {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        @media only screen and (max-width: 767px) {
          /* height: auto; */
          /* display : none; */
        }
        .Profiles_container {
          overflow-y: scroll;
          display: flex;
          flex-direction: column;
          padding-right: 5px;
          gap: 5px;
          @media only screen and (max-width: 767px) {
            padding: 0px;
            padding-top: 45px;
            overflow-y: unset;
            padding-right: 0px;
            padding-bottom: 100px;
          }

          .FetchMore {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            @media only screen and (max-width: 767px) {
              /* position : fixed; */
              background: linear-gradient(
                90deg,
                rgb(44, 44, 48, 0) 0%,
                rgb(44, 44, 48, 0.8) 50%,
                rgb(44, 44, 48, 0) 100%
              );
            }
          }
          .Animated {
            animation: fadeInOut 1s infinite;
          }
          /* Scrollbar styles */
          &::-webkit-scrollbar {
            width: 8px; /* Width of the scroll bar */
            @media only screen and (max-width: 767px) {
              width: 0px;
            }
          }
          &::-webkit-scrollbar-track {
            background: rgba(183, 251, 43, 0.2);
            border-radius: 2px;
          }
          &::-webkit-scrollbar-thumb {
            background: rgba(183, 251, 43, 0.4);
            border-radius: 10px;
            transition: 2s ease-in-out;
          }
          &::-webkit-scrollbar-thumb:hover {
            background: rgba(183, 251, 43, 0.6);
          }
        }
        .Skeletons {
          display: flex;
          flex-direction: column;
          padding-right: 5px;
          gap: 5px;
          position: relative;
          @media only screen and (max-width: 767px) {
            padding-right: 0px;
          }
          .CardSkl {
            border-radius: 5px;
            background-color: rgba(44, 44, 48, 1);
          }
          .profileSkl {
            top: 0;
            position: absolute;
          }
        }
      }
    }

    .Options {
      width: 100%;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      position: relative;
      @media only screen and (max-width: 767px) {
        max-width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 99;
        height: auto;
        background: rgba(33, 33, 37, 0.9);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        padding: 10px 5px;
        /* display: none; */
        flex-direction: column;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      }

      .Filters {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 8px;
        padding-bottom: 10px;
        @media only screen and (max-width: 767px) {
          /* display: none; */
          flex-direction: column;
          padding-bottom: 0px;
        }
        .Select_container {
          flex-grow: 1;
          color: white;
          @media only screen and (max-width: 767px) {
            width: 100%;
          }
        }
        .SearchUser {
          flex-grow: 1;
          height: 100%;
          display: flex;
          align-items: flex-end;
          position: relative;
          @media only screen and (max-width: 767px) {
            display: none;
          }
          input {
            height: 38px;
            width: 100%;
            border-radius: 7px;
            padding: 10px;
            outline: none;
            background-color: transparent;
            border: 1px solid rgba(44, 44, 48, 1);
            font-size: 0.9;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.7);
            &::placeholder {
              color: rgba(255, 255, 255, 0.5);
            }
          }
        }
        .ToMeButton {
          flex-grow: 1;
          height: 38px;
          border-radius: 7px;
          cursor: pointer;
          border: 1px solid rgba(183, 251, 43, 0.4);
          background-color: transparent;
          color: rgba(183, 251, 43, 0.5);
          font-size: 0.9rem;
          justify-self: right;
          margin-left: auto;
          padding: 0px 15px;
          transition: 0.1s ease-in-out;
          &:hover {
            background-color: rgba(183, 251, 43, 0.07);
          }
          @media only screen and (max-width: 767px) {
            width: 25%;
            position: absolute;
            bottom: 10px;
            left: 5px;
          }
        }
        .GenderFilter {
          flex-grow: 1;
          width: 300px;
          height: 38px;
          border-radius: 5px;
          border: 1px solid rgba(44, 44, 48, 1);
          display: flex;
          overflow: hidden;
          @media only screen and (max-width: 767px) {
            width: 70%;
          }
          span {
            font-family: var(--main_font);
            color: rgba(255, 255, 255, 0.5);
          }
          .Male {
            color: #c3e8ff;
            padding: 0px 10px;
          }

          .Female {
            color: #ffb6c1;
          }
          .All {
            /* background-color : red; */
          }

          .Male,
          .Female,
          .All {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0px 15px;
            cursor: pointer;
            @media only screen and (max-width: 767px) {
              padding: 0px 2px;
            }
            .GenderIcon {
              size: 50px;
            }
            &.selected {
              background-color: rgba(44, 44, 48, 1);
            }
            &:hover {
              background-color: rgba(44, 44, 48, 1);
            }
          }
          .devider {
            width: 1px;
            height: 100%;
            background: linear-gradient(
              0deg,
              rgba(44, 44, 48, 0) 0%,
              rgba(44, 44, 48, 1) 50%,
              rgba(44, 44, 48, 0) 100%
            );
          }
        }
      }
    }
  }
`;
