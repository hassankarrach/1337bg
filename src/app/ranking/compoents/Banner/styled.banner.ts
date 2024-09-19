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
  top: 0;
  @media only screen and (max-width: 767px) {
    /* display : none; */
    margin : 0;
    margin-top : 45px;
    height: 40px;
  }
  .MuteIcon {
    position: absolute;
    top: 2px;
    right: 2px;
    color: white;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
  }

  .message {
    font-family: var(--Dot_font);
    color: red;
    position: absolute;
    right: 0;
    white-space: nowrap;
    animation-delay: 0s;
    @media only screen and (max-width: 767px) {
      font-size : 1.1rem;
    }
  }

  .message {
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);

    animation: my-animation 40s linear infinite;
  }

  @keyframes my-animation {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;