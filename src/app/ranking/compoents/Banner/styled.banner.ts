import styled from "styled-components";

export const StyledBanner = styled.div`
  height: 80px;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: black;
  border: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 767px) {
    margin: 0;
    margin-top: 45px;
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
`;

export const BannerTrack = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  animation: scroll 30s linear infinite;

  .banner-item {
    display: flex;
    align-items: center;
    margin-right: 40px;

    .splitter{
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: red;
      margin-left: 30px;
    }

    span {
      font-family: var(--Dot_font);
      font-size: 2rem;
      color: red;
    }

    img {
      max-width: 200px;
      min-height: 100%;
    }
  }

  .banner-item:first-child {
    margin-left: 90px; /* Add left gap here */
  }

  @keyframes scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;
