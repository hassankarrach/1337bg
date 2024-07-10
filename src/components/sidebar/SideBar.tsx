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
  FaEllipsisV,
  FaRocket,
  FaWindowClose,
} from "react-icons/fa";

import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import useMobileDetection from "@/hooks/useMobile";

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
  path: string;
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
    path: "/ranking",
  },
  {
    id: 1,
    name: "Clusters",
    desc: "",
    icon: FaNetworkWired,
    is_first: false,
    is_last: false,
    path: "/clusters",
  },
  {
    id: 2,
    name: "Correction Pages",
    desc: "",
    icon: FaFolder,
    is_first: false,
    is_last: false,
    path: "/corrections",
  },
  {
    id: 3,
    name: "BlackHole",
    desc: "",
    icon: FaSkull,
    is_first: false,
    is_last: false,
    path: "/blackhole",
  },
  {
    id: 4,
    name: "Anonymous Feedback",
    desc: "",
    icon: FaUserSecret,
    is_first: false,
    is_last: false,
    path: "/feedback",
  },
  {
    id: 5,
    name: "42 Improved Intra V3 extension",
    desc: "",
    icon: FaRocket,
    is_first: false,
    is_last: false,
    path: "/Extension",
  },
  {
    id: 6,
    name: "Sign out",
    desc: "",
    icon: FaSignOutAlt,
    is_first: false,
    is_last: true,
    path: "",
  },
];

interface StyledSideBarProps {
  $is_open: boolean;
}
const StyledSideBar = styled.div<StyledSideBarProps>`
  width: 68px;
  height: 100%;
  position: fixed;
  /* border : 1px solid white; */
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 3px;
  @media only screen and (max-width: 767px) {
    /* display : none; */
    z-index: 999;
  }

  .LogoPlaceHolder {
    width: 100%;
    height: 70px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-in-out;
    color: white;
    &:hover {
      background-color: var(--main_color);
    }
    @media only screen and (max-width: 767px) {
      height: 40px;
      width : 40px;
      /* display: none; */
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

    @media only screen and (max-width: 767px) {
      /* display : none; */
      margin-left: ${(props) => (props.$is_open ? "0" : "-200%")};
      z-index: 99999;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      /* left : -20%; */
    }
  }
`;

interface StyleSideElement {
  $is_first: boolean;
  $is_last: boolean;
  $is_active: boolean;
}
const StyleSideElement = styled.div<StyleSideElement>`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  cursor: pointer;
  clip-path: ${(props) =>
    props.$is_first
      ? "polygon(0% 0%, calc(100% - 20px) 0%, 100% 20px, 100% 100%, 0% 100%)"
      : props.$is_last
      ? "polygon(0% 0%, 100% 0%, 100% 100%, 20px 100%, 0% calc(100% - 20px));"
      : ""};
  margin-top: ${(props) => props.$is_last && "auto"};
  color: ${(props) =>
    props.$is_active ? "var(--main_color_dark)" : "var(--main_color)"};
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
    opacity: ${(props) => (props.$is_active ? "1" : "0.2")};
    transition: 0.2s ease-in-out;
  }
`;
interface SideElementProps {
  is_first: boolean;
  is_last: boolean;
  title: string;
  is_active: boolean;
  path: string;
  icon: IconType;
  setIsOpen : (value : boolean) => void;
}
const SideBarElement: React.FC<SideElementProps> = ({
  is_first,
  is_last,
  title,
  is_active,
  path,
  icon: Icon,
  setIsOpen
}) => {
  const { data: session } = useSession();
  const Handle_logout = () => {
    signOut({ callbackUrl: "/" });
  };

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
      <Link href={path} style={{ marginTop: `${is_last && "auto"}` }}>
        <StyleSideElement
          $is_first={is_first}
          $is_last={is_last}
          $is_active={is_active}
          onClick={() => {
            if (is_last) Handle_logout();
            setIsOpen(false);
          }}
        >
          <Icon size={25} />
        </StyleSideElement>
      </Link>
    </LightTooltip>
  );
};

const SideBar = () => {
  const path = usePathname();
  const [IsOpen, setIsOpen] = useState(false);
  const isMobile = useMobileDetection();

  const ToggleSideBar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <StyledSideBar $is_open={IsOpen}>
      <Link href={!isMobile ? '/' : ''}>
        <div
          onClick={ToggleSideBar}
          className="LogoPlaceHolder"
          style={{ backgroundColor: path == "/" ? "var(--main_color)" : "" }}
        >
          {!isMobile ? (
            "Logo"
          ) : IsOpen ? (
            <FaWindowClose size={20} />
          ) : (
            <FaEllipsisV size={20} />
          )}
        </div>
      </Link>

      <div className="ListBar">
        {List.map((ListItem, key) => {
          return (
            <SideBarElement
              key={key}
              is_first={ListItem.is_first}
              icon={ListItem.icon}
              is_last={ListItem.is_last}
              title={ListItem.name}
              is_active={path === ListItem.path}
              path={ListItem.path}
              setIsOpen={setIsOpen}
            />
          );
        })}
      </div>
    </StyledSideBar>
  );
};

export default SideBar;
