"use client";
import { StyledNavbar } from "./styled.navbar";
import _13hub_logo from "../../../public/logos/13hub.png";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
//MaterialUI_Components
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
//Icons
import { FaRegEdit, FaSignOutAlt, FaBell, FaCommentAlt } from "react-icons/fa";

const get_username_from_email = (email: string) => {
  const username = email.split("@")[0];
  return username;
};

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Handle_logout = () => {
    setAnchorEl(null);
    signOut({ callbackUrl: "/" });
  };

  return (
    <StyledNavbar>
      {session && (
        <>
          <div className="Nav_item Messages">
            <FaCommentAlt size={20} className="Nav_item_icon" />
          </div>
          <div className="Nav_item Notifications">
            <FaBell size={20} className="Nav_item_icon" />
          </div>
        </>
      )}

      <div className="Profile">
        <div className="UserInfo">
          <h4 className="User_name">{session?.user?.name}</h4>
          <div className="online">
            <div
              className="online_dot"
              style={{ backgroundColor: `${session ? "#56ab2f" : "#e53935"}` }}
            />
            <span>{session ? "Online" : "Offline"}</span>
          </div>
        </div>

        <div
          className="Avatar"
          style={{ backgroundImage: `url(${session?.user?.image})` }}
        ></div>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
