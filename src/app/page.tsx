"use client";
import { StyledMain } from "./styled.home";
import _42logo from "../../public/logos/42.png"
import _stars from "../../public/stars.png"
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from 'next-auth/react'
import MainSvg from "@/components/Svgs/MainSvg";

const Main = () => {
    const { data: session } = useSession();

    return (
        <StyledMain>
            <div className="Left">
                <div className="blob _t_left" />

                <MainSvg/>

                <h1 className="Title">Navigate School Like <br/> a Boss!</h1>
                <div className="login_card">
                    <img className="stars" src={_stars.src} />
                    <button className="login_button" onClick={()=>{signIn("42-school")}}>
                        <span>Login</span>
                        <div className="_devider" />
                        <svg className="_42logo" version="1.1" id="Calque_1" x="0px" y="0px" viewBox="0 -200 960 960" enable-background="new 0 -200 960 960">
                            <polygon id="polygon5" points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1   32,279.1 " />
                            <polygon id="polygon7" points="597.9,114.2 762.7,-51.1 597.9,-51.1 " />
                            <polygon id="polygon9" points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 " />
                            <polygon id="polygon11" points="928,279.1 762.7,443.9 928,443.9 " />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="Right">
                <svg
                    className="_r_item"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px" height="464px">
                    <path fill-rule="evenodd" fill="rgb(255, 255, 255)"
                        d="M-0.000,464.000 L-0.000,-0.000 L59.000,59.001 L59.000,404.000 " />
                </svg>
                <svg
                    className="_l_item"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px" height="464px">
                    <path fill-rule="evenodd" fill="rgb(255, 255, 255)"
                        d="M-0.000,464.000 L-0.000,-0.000 L59.000,59.001 L59.000,404.000 " />
                </svg>
            </div>
        </StyledMain>
    )
}

export default Main;