"use client";
import { StyledNavbar } from "./styled.navbar";
import _13hub_logo from "../../../public/logos/13hub.png";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
// MaterialUI Components
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// Icons
import { FaRegEdit, FaSignOutAlt, FaBell, FaCommentAlt } from "react-icons/fa";
import GetVerified from "./GetVerified";
import Profile from "@/app/ranking/compoents/profile";
import ProfileModal from "./ProfileModal";

const get_username_from_email = (email: string) => {
  const username = email.split("@")[0];
  return username;
};

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openGetVerified, setOpenGetVerified] = React.useState(false);
  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const open = Boolean(anchorEl);

  // Dialog Handlers
  const handleGetVerified = () => {
    setOpenGetVerified(true);
  };

  const handleOpenProfileModal = () => {
    setOpenProfileModal(true);
    setAnchorEl(null);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!session) return;
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileDialog = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    signOut({ callbackUrl: "/" });
  };

  return (
    <StyledNavbar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseProfileDialog}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenProfileModal}>My Profile</MenuItem>
        <MenuItem onClick={handleCloseProfileDialog}>My Feedbacks</MenuItem>
        <MenuItem onClick={handleCloseProfileDialog}>My Favorits</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      {session?.user.verified === false && (
        <>
          <GetVerified
            open={openGetVerified}
            onClose={() => {}}
            setIsOpen={setOpenGetVerified}
          />
          <div className="GetVerified" onClick={handleGetVerified}>
            <h1>Get Verified!</h1>
          </div>
        </>
      )}
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

      <ProfileModal
        open={openProfileModal}
        onClose={() => {}}
        setIsOpen={setOpenProfileModal}
      />

      <div
        className="Profile"
        onClick={handleProfileClick}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <div className="UserInfo">
          <h4 className="User_name">{session?.user?.name}</h4>
          <div className="online">
            <div
              className="online_dot"
              style={{ backgroundColor: `${session ? "#56ab2f" : "#e53935"}` }}
            />
            <span>{session ? "online" : "offline"}</span>
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
