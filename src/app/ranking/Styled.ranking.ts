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
  background-color: var(--main_background);
  overflow : hidden;
  padding-left : 70px;

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
    justify-content: flex-end;
    align-items: center;
    position: relative;
    z-index: 9;
    /* flex-direction : column; */
    /* overflow  :hidden; */

    .ProfileContainer{
      width : 400px;
      height : 100%;
      padding : 55px 10px;
    }
    .LeaderBoardContainer{
      height : 100%;
      flex : 1;
      padding : 55px 10px;
      .Ranking {
        width: 100%;
        height: 100%;
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
            background: rgba(183,251,43,0.2);
            border-radius: 2px;
          }
          &::-webkit-scrollbar-thumb {
            background: rgba(183,251,43,0.4);
            border-radius: 10px;
            transition: 2s ease-in-out;
          }
          &::-webkit-scrollbar-thumb:hover {
            background: rgba(183,251,43,0.6);
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
            background-color : rgba(44,44,48,1);
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
      position: relative;

      .Filters {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 8px;
        padding-bottom:  10px;
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
            outline: none;
            background-color : transparent;
            border: 1px solid rgba(44,44,48,1);
            font-size : 0.9;
            text-transform : uppercase;
            color  :  rgba(255,255,255, 0.7);
            &::placeholder{
              color  :  rgba(255,255,255, 0.5);
            }
          }
        }
        .ToMeButton {
          flex-grow: 1;
          height: 38px;
          border-radius: 7px;
          cursor: pointer;
          border: 1px solid rgba(183,251,43,0.4);
          background-color: transparent;
          color: rgba(183,251,43,0.5);
          font-size: 0.9rem;
          justify-self: right;
          margin-left: auto;
          padding : 0px 15px;
          transition : 0.1s ease-in-out;
          &:hover{
            background-color : rgba(183,251,43,0.07);
          }
        }
        .GenderFilter {
          flex-grow: 1;
          width : 300px;
          height: 38px;
          border-radius: 5px;
          border: 1px solid rgba(44,44,48,1);
          display: flex;
          overflow: hidden;
          span{
            font-family : var(--main_font);
            color  :  rgba(255,255,255, 0.5);
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
            &.selected{
              background-color : rgba(44,44,48,1);
            }
            &:hover{
                background-color : rgba(44,44,48,1);
            }
          }
          .devider {
            width: 1px;
            height: 100%;
            background: linear-gradient(
              0deg,
              rgba(44,44,48, 0) 0%,
              rgba(44,44,48,1) 50%,
              rgba(44,44,48, 0) 100%
            );
          }
        }
      }
    }
  }
`;
