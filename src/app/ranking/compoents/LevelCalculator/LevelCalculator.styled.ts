import { Autocomplete } from "@mui/material";
import styled from "styled-components";

export const StyledLevelCalculator = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  background-color: #212125;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 5px;

  .strict {
    position: absolute;
    right: 5px;
    top: 5px;
    background-color: #2c2c30;
    border-radius: 5px;
    display: flex;
    padding: 2px 4px;
    color: #454548;
    gap: 3px;
    cursor: pointer;
    border: 1px solid #454548;
  }
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
    .SelectedProjects{
      padding : 5px 0px;
      display : flex;
      flex-direction : column;
      gap : 3px;
      .ProjectItem{
        height : 40px;
        width : 100%;
        background-color : #171719;
        border : 1px solid #2c2c30;
        border-radius : 5px;
        display : flex;
        align-items : center;
        justify-content : space-between;
        padding : 0px 10px;
        cursor: pointer;
        h1{
          font-size : 1.1rem;
          font-weight : 300;
          color : #454548;
        }
        span{
          background-color : #2c2c30;
          border-radius : 3px;
          padding : 2px 5px;
          color : white;
          font-weight : 300;
          opacity : 0.6;
        }
      }
    }

    .AddNewProject {
      width: 100%;
      height: 75px;
      border: 1px solid #171719;
      border-radius: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: 0.2s ease-in-out;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        background-color: #171719;
      }
      .AddIcon {
        width: 50px;
        height: 100%;
        background-color: var(--main_color_light);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s ease-in-out;
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
      .SelectContainer {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        #combo-box-demo {
          width: 100%;
          color: white;
        }
      }
    }


    .ReseltContainer {
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 0;
      left: 0;
      display : flex;
      .Level_box{
        flex : 1;
        display : flex;
        justify-content : center;
        align-items : center;
      }
      .ResetContainer {
        width: 30%;
        display : flex;
        justify-content : center;
        align-items : center;
        gap : 5px;
      }
    }
  }
`;

export const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  cursor: pointer;

  .MuiInputLabel-root {
    color: white; // Change the placeholder label color
    opacity: 0.5;
    border: none;
  }

  .MuiOutlinedInput-root {
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: transparent; // Change the border color when focused
    }
  }

  .MuiAutocomplete-inputRoot {
    border: none;
    .MuiOutlinedInput-notchedOutline {
      border-color: transparent; // Change the border color of the input
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border: none;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: transparent; // Change the border color when focused
    }
  }
`;
