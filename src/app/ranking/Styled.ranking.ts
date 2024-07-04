import styled from "styled-components";

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
  padding-left : 75px;
  padding-right : 10px;
  background-color: var(--main_background);
  overflow : hidden;
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
    height: 600px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    border: 1px solid rgba(178, 162, 249, 0.2);
    background: rgba(19, 19, 26, 0.3);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    position: relative;
    z-index: 9;
    /* flex-direction : column; */
    /* overflow  :hidden; */

    .Ranking {
      width: 65%;
      height: 600px;
      padding: 5px 10px;
      display: flex;
      flex-direction: column;
      .Profiles_container {
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        padding-right: 5px;
        gap: 5px;
        .FetchMore {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
        }
        .Animated {
          animation: fadeInOut 1s infinite;
        }
        /* Scrollbar styles */
        &::-webkit-scrollbar {
          width: 8px; /* Width of the scroll bar */
        }
        &::-webkit-scrollbar-track {
          background: rgba(178, 162, 249, 0.2);
          border-radius: 2px;
        }
        &::-webkit-scrollbar-thumb {
          background: rgba(178, 162, 249, 0.4);
          border-radius: 10px;
          transition: 2s ease-in-out;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: rgba(178, 162, 249, 0.6);
        }
      }
      .Skeletons {
        display: flex;
        flex-direction: column;
        padding-right: 5px;
        gap: 5px;
        position: relative;
        .CardSkl {
          border-radius: 5px;
        }
        .profileSkl {
          top: 0;
          position: absolute;
        }
      }
    }

    .Options {
      width: 100%;
      border-radius: 5px;
      display: flex;
      position: relative;

      .Filters {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 8px;
        padding: 10px 0px;
        .Select_container {
          flex-grow: 1;
          color : white;
        }
        .SearchUser {
          flex-grow: 1;
          height: 100%;
          display: flex;
          align-items: flex-end;
          position : relative;
          input {
            height: 38px;
            width: 100%;
            border-radius: 7px;
            padding: 10px;
            color: var(--main_color);
            outline: none;
            background-color : transparent;
            border: 1px solid rgba(178, 162, 249, 0.2);
            font-size : 0.9;
            text-transform : uppercase;
            color : var(--main_color);
            &::placeholder{
                color : rgba(178, 162, 249, 0.3);
            }
          }
        }
        .ToMeButton {
          flex-grow: 1;
          height: 38px;
          border-radius: 7px;
          cursor: pointer;
          border: 1px solid rgba(178, 162, 249, 0.2);
          background-color: var(--main_color);
          color: white;
          font-size: 0.9rem;
          justify-self: right;
          margin-left: auto;
          padding : 0px 15px;
        }
        .GenderFilter {
          flex-grow: 1;
          width : 300px;
          height: 38px;
          border-radius: 5px;
          border: 1px solid rgba(178, 162, 249, 0.2);
          display: flex;
          overflow: hidden;
          span{
            font-family : var(--main_font);
            color : rgba(178, 162, 249, 0.5);
          }
          .Male {
            color: #c3e8ff;
            padding : 0px 10px;
          }

          .Female {
            color: #ffb6c1;
          }
          .All {
            /* background-color : red; */
          }
          .All.selected {
            background-color: var(--main_color);
            color: white;
            .gender_type {
              color: white;
            }
          }
          .Male.selected {
            background-color: var(--main_color);
            color: white;
            .gender_type {
              color: white;
            }
          }
          .Female.selected {
            background-color: var(--main_color);
            color: white;
            .gender_type {
              color: white;
            }
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
            .GenderIcon {
              size: 50px;
            }
            &:hover{
                background-color : rgba(178, 162, 249, 0.2);
            }
          }
          .devider {
            width: 1px;
            height: 100%;
            background: linear-gradient(
              0deg,
              rgba(178, 162, 249, 0) 0%,
              rgba(178, 162, 249, 0.3) 50%,
              rgba(178, 162, 249, 0) 100%
            );
          }
        }
      }
    }
  }
`;
