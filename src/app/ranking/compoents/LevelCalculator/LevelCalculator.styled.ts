import styled from "styled-components";

export const StyledLevelCalculator = styled.div`
  /* flex: 1; */
  display: flex;
  flex : 1;
  flex-direction: column;
  gap: 5px;
  position: relative;
  background-color: #212125;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 5px;

  .title {
    color: white;
    padding: 5px 5px;
    /* transform : rotate(90deg); */
    /* position : absolute; */
    /* white-space: nowrap; */
    font-size: 1rem;
    font-family: var(--playable_font);
    font-weight: 100;
    /* margin : 0;
    padding : 0; */
    opacity: 0.8;
  }
  .container {
    flex: 1;
    /* background-color : red; */
    padding: 5px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    .SelectedProjects {
      padding: 5px 0px;
      display: flex;
      flex-direction: column;
      gap: 3px;
      max-height : 100px;
      overflow-y : scroll;
      //hide scrollbar
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */
      .ProjectItem {
        min-height: 40px;
        width: 100%;
        background-color: #171719;
        border: 1px solid #2c2c30;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 10px;
        cursor: pointer;
        .ProjectTitle {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          color: #454548;

          h1 {
            font-size: 1.2rem;
            font-weight: 300;
            color: #454548;
          }
        }

        span {
          width : 70px;
          background-color: #2c2c30;
          border-radius: 3px;
          padding: 2px 5px;
          color: white;
          font-weight: 300;
          opacity: 0.6;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .AddNewProject {
      width: 100%;
      height: 40px;
      border: 1px solid #171719;
      border-radius: 3px;
      display: flex;
      /* justify-content: space-between; */
      align-items: center;
      transition: 0.2s ease-in-out;
      overflow: hidden;
      .AutoComplete {
        width: 180px !important;
        color: white !important;
        border: none !important;
        outline: none !important;
        label {
          color: white !important;
          opacity: 0.6;
        }
        .MuiAutocomplete-inputRoot {
          color: white;
          opacity: 0.6;
        }
      }

      .MarkInput {
        width: 110px;
        padding: 0px 10px;
        height: 100%;
        border-radius: 3px;
        border: none;
        border: 1px solid #171719;
        outline: none;
        background-color: transparent;
        color: white;
        border-top: none;
        border-bottom: none;
        border-left: none;
        transition: 0.2s ease-in-out;
        &:hover,
        &:focus {
          background-color: #171719;
        }

        &::placeholder {
          opacity: 0.6;
        }
      }
      .AddIcon {
        width: 50px;
        height: 100%;
        background-color: var(--main_color_light);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s ease-in-out;
        margin-left: auto;
        cursor: pointer;
        &:hover {
          background-color: #acda4c;
        }
      }
      .StartLevel {
        height: 100%;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #171719;
        span {
          font-weight: 300;
        }
      }

      .Coalition {
        display: flex;
        justify-content: center;
        align-items: center;
        label {
          color: white;
          opacity: 0.6;
          font-weight: 200;
        }
      }
      .CheckBox {
        color: var(--main_color_light);
        opacity: 0.6;
      }
    }

    .ResultContainer {
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;

      .Level_box {
        flex: 1;
        display: flex;
        gap: 5px;
        background-color: #2c2c30;

        span {
          font-weight: 300;
        }
        .NewRank {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          background-color: #2c2c30;
          padding: 5px;
          border-radius: 5px;
          .RankIcon {
            color: white;
          }
          span {
            color: white;
          }
          .RankDifIcon {
            color: var(--main_color_light);
          }
        }
        .FinalLevel {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          padding: 5px;
          border-radius: 5px;
          span:nth-child(2) {
            background-color: #171719;
            padding: 2px 15px;
            border-radius: 5px;
            font-weight: 500;
            opacity: 0.8;
          }
          span {
            font-weight: 300;
            color: white;
          }
        }
      }
      .ResetContainer {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        color: white;
        background-color: #171719;
        opacity: 0.6;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
          background-color: #2c2c30;
        }
        .ResetIcon {
        }
        span {
          font-weight: 300;
          gap: 5px;
          color: white;
        }
      }
    }
  }
`;
