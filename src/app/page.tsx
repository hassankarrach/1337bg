"use client";
import { StyledMain, StyledPromoItem } from "./styled.home";
import _42logo from "../../public/logos/42.png";
import _stars from "../../public/stars.png";
import router, { useRouter } from "next/router";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import MainSvg from "@/components/Svgs/MainSvg";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "@/components/sidebar/SideBar";
import Navbar from "@/components/navbar/navbar";

export interface PromoItemProps {
    avatar : string,
    rank? : number,
    title? : string,
    year? : number
}
const PromoItem : React.FC<PromoItemProps> = ({avatar, rank, title, year}) => {
  return (
    <StyledPromoItem avatar={avatar} rank={rank}>
      <div className="PromoAvatar">
        <h1>{title}</h1>
      </div>
      <div className="PromoDetails">
        <span>{year}</span>
      </div>
      <div className="PromoPower">
        <h1>#{rank}</h1>
      </div>
    </StyledPromoItem>
  );
};

const Main = () => {
  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    const callbackUrl = "/ranking";
    signIn("42-school", { callbackUrl });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("error");
    if (message) {
      toast.error("You must be logged in to access the ranking page.");
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
      />
      <div className="Banner">
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

      <div className="Details">
        <div className="Left_side">
            {/* <h1>Unscripted Brilliance</h1> */}
            <span>
            Ever wondered what happens when curiosity meets code? Dive in and find out. No rules, no limits—just pure exploration.
            </span>
        </div>

        <div className="Right_side">
          <div className="BackgroundTexts">
            <h1>LEET</h1>
            <h1>Promos</h1>
            <h1>Bengeurir</h1>
          </div>

          <div className="PromosPresentation">
            <div className="Items_container">
                <PromoItem rank={2} title="Green Promo" year={2023}/>
                <PromoItem rank={1} title="Black Promo" year={2023}/>
                <PromoItem rank={3} title="Red Promo" year={2022}/>
            </div>
          </div>
        </div>
      </div>
    </StyledMain>
  );
};

export default Main;
