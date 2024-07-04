"use client";

import React, { useState } from "react";
import styled from "styled-components";


import { IconType } from "react-icons";
import {
  FaTrophy,
  FaNetworkWired,
  FaFolder,
  FaSignOutAlt,
  FaSkull,
  FaUserSecret,
} from "react-icons/fa";

import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--main_color)",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "",
    fontSize: 11,
    padding: "5px 10px",
    width: "auto",
    height: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "var(--main_font)",
  },
}));

const List: {
  id: number;
  name: string;
  desc: string;
  icon: IconType;
  path : string ;
  is_first: boolean;
  is_last: boolean;
}[] = [
  {
    id: 0,
    name: "LeaderBoard",
    desc: "",
    icon: FaTrophy,
    is_first: true,
    is_last: false,
    path : "/ranking"
  },
  {
    id: 1,
    name: "Clusters",
    desc: "",
    icon: FaNetworkWired,
    is_first: false,
    is_last: false,
    path : "/clusters"
  },
  {
    id: 2,
    name: "Correction Pages",
    desc: "",
    icon: FaFolder,
    is_first: false,
    is_last: false,
    path : "/corrections"
  },
  {
    id: 3,
    name: "BlackHole",
    desc: "",
    icon: FaSkull,
    is_first: false,
    is_last: false,
    path : "/blackhole"
  },
  {
    id: 4,
    name: "Anonymous Feedback",
    desc: "",
    icon: FaUserSecret,
    is_first: false,
    is_last: false,
    path : "/feedback"
  },
  {
    id: 5,
    name: "Sign out",
    desc: "",
    icon: FaSignOutAlt,
    is_first: false,
    is_last: true,
    path : ""
  },
];


const StyledSideBar = styled.div`
  width: 68px;
  height: 100%;
  position : fixed;
  /* border : 1px solid white; */
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding : 5px 3px;

  .LogoPlaceHolder {
    width: 100%;
    height: 80px;
    background-color: #212125;
    border-radius: 3px;
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      20px 100%,
      0% calc(100% - 20px)
    );
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
      background-color: var(--main_color);
    }
  }
  .ListBar {
    width: 100%;
    height: 100%;
    background-color: #212125;
    border-radius: 3px;
    clip-path: polygon(
      0% 0%,
      calc(100% - 20px) 0%,
      100% 20px,
      100% 100%,
      20px 100%,
      0% calc(100% - 20px)
    );
    padding: 5px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

interface StyleSideElement {
  is_first: boolean;
  is_last: boolean;
  is_active : boolean;
}
const StyleSideElement = styled.div<StyleSideElement>`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  cursor: pointer;
  clip-path: ${(props) =>
    props.is_first
      ? "polygon(0% 0%, calc(100% - 20px) 0%, 100% 20px, 100% 100%, 0% 100%)"
      : props.is_last
      ? "polygon(0% 0%, 100% 0%, 100% 100%, 20px 100%, 0% calc(100% - 20px));"
      : ""};
  margin-top: ${(props) => props.is_last && "auto"};
  color: ${props => props.is_active ? "var(--main_color_dark)" : "var(--main_color)"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &:hover {
    opacity: 1;
    color: var(--main_color_dark);
    &:after {
      opacity: 1;
    }
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--main_color);
    z-index: -1;
    opacity: ${props => props.is_active ? "1" : "0.2"};
    transition: 0.2s ease-in-out;
  }
`;
interface SideElementProps {
  is_first: boolean;
  is_last: boolean;
  title: string;
  is_active : boolean;
  icon: IconType;
}
const SideBarElement: React.FC<SideElementProps> = ({
  is_first,
  is_last,
  title,
  is_active,
  icon: Icon,
}) => {
  return (
    <LightTooltip
      title={title}
      placement="right-start"
      disableInteractive
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [5, -1],
              },
            },
          ],
        },
      }}
    >
      <StyleSideElement is_first={is_first} is_last={is_last} is_active={is_active}>
        <Icon size={25} />
      </StyleSideElement>
    </LightTooltip>
  );
};


const SideBar = () => {
  const path = usePathname();

  return (
    <StyledSideBar>
      <div className="LogoPlaceHolder"
        style={{ backgroundColor: path == "/" ? "var(--main_color)" : "" }}
      ></div>

      <div className="ListBar">
        {List.map((ListItem) => {
          return (
            <Link href={ListItem.path}>
              <SideBarElement
                is_first={ListItem.is_first}
                icon={ListItem.icon}
                is_last={ListItem.is_last}
                title={ListItem.name}
                is_active = {path === ListItem.path}
              />
            </Link>
          );
        })}
      </div>
    </StyledSideBar>
  );
};

export default SideBar;
