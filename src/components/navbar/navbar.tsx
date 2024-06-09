"use client";
import { StyledNavbar } from "./styled.navbar"
import _13hub_logo from "../../../public/logos/13hub.png"
import { FaBell } from "react-icons/fa";
import Image from 'next/image'; 
import React from "react";
import Link from 'next/link';

const Navbar: React.FC = () =>{

    return (
        <StyledNavbar>
            <Link href='/'>
                <img className ="_13hub_logo" src={_13hub_logo.src} width={100} height={100} alt="13Hub"/>  
            </Link>


            <div className="Navbar_Right">
                <div className="Notifications">
                    <FaBell className="Bell_icon" size={24}/>
                </div>
                <div className="avatar">
                    <span className="Login_name">hkarrach</span>
                    <img className="Avatar_icon" src="https://cdn.intra.42.fr/users/a140a89b5a8e788f2f245f4c1b20e96b/hkarrach.jpeg"/>
                </div>
            </div>
        </StyledNavbar>
    )
}

export default Navbar;