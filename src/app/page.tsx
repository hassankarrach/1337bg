"use client";
import { StyledMain } from "./styled.home";
import _42logo from "../../public/logos/42.png";
import _stars from "../../public/stars.png";
import { useSession, signIn} from "next-auth/react";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaDiscord } from "react-icons/fa";

import _header from "../../public/Header.jpg"

const Main = () => {
  const { data: session, status } = useSession();

  const handleInvite = () => {
          window.open("https://discord.gg/5cZfS8djyg");
        };
  const handleSignIn = async () => {
    const callbackUrl = "/ranking";
    signIn("42-school", { callbackUrl });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("error");
    if (message) {
      toast.error("🔒 You must be logged in to access this page.",
        {
          icon: false,
        },
      );
    }
  }, []);

  return (
    <StyledMain>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="foo"
      />
      <div className="Banner">
        <img src={_header.src} className="Header_photo"/>

        <h1>
          Navigate School Like <br /> a Boss!
        </h1>

        <div className="login_card">
          <button className="login_button" onClick={handleSignIn}>
            <span>Login</span>
            <div className="_devider" />
            <svg
              className="_42logo"
              version="1.1"
              id="Calque_1"
              x="0px"
              y="0px"
              viewBox="0 -200 960 960"
            >
              <polygon
                id="polygon5"
                points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1   32,279.1 "
              />
              <polygon
                id="polygon7"
                points="597.9,114.2 762.7,-51.1 597.9,-51.1 "
              />
              <polygon
                id="polygon9"
                points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 "
              />
              <polygon
                id="polygon11"
                points="928,279.1 762.7,443.9 928,443.9 "
              />
            </svg>
          </button>
          
        </div>
       </div>
    </StyledMain>
  );
};

export default Main;
