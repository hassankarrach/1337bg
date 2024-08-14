import styled from "styled-components";

export const StyledBanner = styled.div`
  height: 80px;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: black;
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: grid;
  grid-template-columns: repeat(auto-fill, 10px);
  grid-auto-rows: 10px;
  grid-gap: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .MuteIcon{
    position : absolute;
    top : 2px;
    right : 2px;
    color : white;
    cursor : pointer;
    opacity : 0.6;
    transition : opacity 0.3s;
    &:hover{
      opacity : 1;
    }
  }

  .message {
    font-family: var(--Dot_font);
    color: red;
    position: absolute;
    white-space: nowrap;
    animation: scroll-left 70s linear infinite; /* Adjust duration as needed */
  }

  @keyframes scroll-left {
    0% {
      transform: translateX(100%); /* Start off-screen to the right */
    }
    100% {
      transform: translateX(-100%); /* End off-screen to the left */
    }
  }

  .Dot {
  }
`;
