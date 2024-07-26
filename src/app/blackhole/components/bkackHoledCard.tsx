import React from "react";
import styled from "styled-components";
import { FaSkull, FaPause } from "react-icons/fa";
import _overlay from "../../../../public/assets/overlay.jpeg";

const StyledBlackHoledCard = styled.div<BlacHoledCard>`
  min-width: 100px;
  min-height: 100px;
  background-color: transparent;
  border-radius: 6px;
  transform: rotate(45deg);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  .Data_container {
    width: 140%;
    height: 140%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100%;
    min-height: 100%;
    transform: rotate(-45deg);
    position: relative;
    border: 1px solid black;
    position: absolute;

    background-image: url("https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg");
    background-position: center;
    background-size: cover;
    background-image: url(${(props: any) => props.$avatar});
    filter: ${(props) => props.$is_blackholed && "grayscale(100%)"};
    transition: 0.2s ease-in-out;
    &:hover {
      filter: none;
      &:before {
        opacity: 0;
      }
    }

    &:after {
      width: 100%;
      height: 100%;
      content: "";
      position: absolute;
      background: ${(props) => props.$is_blackholed && "rgba(10,11,20,0.8)"};
    }
    &:before {
      z-index: 999;
      content: "";
      width: 100%;
      height: 100%;
      background-image: url(${_overlay.src});
      background-size: cover;
      background-position: center;
      position: absolute;
      mix-blend-mode: hard-light;
      opacity: 0.2;
    }

    .avatar {
      /* position: absolute; */
      /* width: 100px; */
      /* height: 100px; */
      transform: rotate(-45deg);
    }
  }
`;

interface BlacHoledCard {
  $index: number;
  $level: number;
  $avatar: string;
  $is_blackholed: boolean;
  url: string;
}

const BlackHoledCard: React.FC<BlacHoledCard> = ({
  $index,
  $level,
  $avatar,
  $is_blackholed,
  url,
}) => {
  return (
    <a href={url} target="_blank">
      <StyledBlackHoledCard
        $index={$index}
        $level={$level}
        $avatar={$avatar}
        $is_blackholed={$is_blackholed}
        url={url}
      >
        <div className="Data_container">{/* <span>{$level}</span> */}</div>
      </StyledBlackHoledCard>
    </a>
  );
};

export default BlackHoledCard;
