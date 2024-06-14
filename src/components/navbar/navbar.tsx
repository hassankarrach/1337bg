"use client";
import { StyledNavbar } from "./styled.navbar";
import _13hub_logo from "../../../public/logos/13hub.png";
import { FaBell } from "react-icons/fa";
import Image from 'next/image';
import React from "react";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
//MaterialUI_Components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//Icons
import { FaRegEdit, FaSignOutAlt } from "react-icons/fa";

const get_username_from_email = (email: string) => {
    const username = email.split('@')[0];
    return (username);
}


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
        signOut();
    }

    return (
        <StyledNavbar>
            <Link href='/'>
                <Image className="_13hub_logo" src={_13hub_logo.src} width={100} height={100} alt="13Hub" />
            </Link>

            {session && (
                <div className="Navbar_Right">
                    <div className="Notifications">
                        <FaBell className="Bell_icon" size={24} />
                    </div>

                    <a
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <div className="avatar">
                            <span className="Login_name">{get_username_from_email(session.user?.email ?? "")}</span>
                            <img className="Avatar_icon" src={session.user?.image ?? ""} alt="Avatar" />
                        </div>
                    </a>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        className="Profile_Menu"
                    >
                        <MenuItem onClick={handleClose} style={{ color: "var(--main_color)" }}>
                            <FaRegEdit style={{ marginRight: "5px" }} />
                            Settings
                        </MenuItem>

                        <MenuItem style={{ width: "150px", color: "#ff2939" }} onClick={Handle_logout}>
                            <FaSignOutAlt style={{ marginRight: "5px" }} />
                            Logout
                        </MenuItem>
                    </Menu>

                </div>
            )}
        </StyledNavbar>
    );
};

export default Navbar;
