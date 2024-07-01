import styled from "styled-components"
import svg_illustr from "../../public/assets/main.svg"
import { HexToRgba } from "@/utils/HexToRgba"

export const StyledMain = styled.div`
    width : 100vw;
    height: 100vh;
    display : flex;
    justify-content : center;
    align-items : center;
    overflow : hidden;
    background-color : var(--main_background);
    
    .Right
    {
        width : 50%;
        height: 100%;
        background-color : var(--main_color);
        background-image : url("/Header.jpg");
        background-position : center;
        background-size : cover;
        background-repeat : no-repeat;
        position : relative;
        z-index : 999;
      
        &::before
        {
            content : "";
            position : absolute;
            width : 120px;
            height: 120px;
            background-color : var(--main_background);;
            transform : rotate(45deg);
            bottom : -8%;
            right : -16%;
        }

        ._r_item, ._l_item{
            background-color : transparent;
            position : absolute;
            top : 20%;
        }
        ._l_item{
            right : 0;
            top : 5%;
            transform: scaleX(-1);
        }
    }
    .Left
    {
        width: 60%;
        height: 100%;
        display :flex;
        flex-direction : column;
        align-items : center;
        justify-content : center;
        padding : 0px 2%;
        position : relative;
        z-index : 1;
        .Title{
            font-size : 3.4rem;
            font-weight : 400;
            font-family : var(--main_font);
            background-color : transparent;
            color : white;
        }
        .login_card {
            height: 50px;
            border-radius: 4px;
            margin-top : 10%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            background-color : transparent;
            .stars{
                z-index : -999;
                position : absolute;
                left : -40px;
                width : 90px;
            }
            .login_button {
                outline : none;
                background: ${HexToRgba("#5B8CD1", 0.7)};
                border: 1px solid rgba(137,185,255, 0.5);
                border-left : none;
                display : flex;
                align-items : center;
                padding : 2px 5px;
                width : 200PX;
                height : 100%;
                border-radius : 5px;
                z-index : 999;
                margin-left: auto;
                cursor: pointer;
                backdrop-filter: blur( 4px );
                -webkit-backdrop-filter: blur( 4px );
                transition : 0.5s ease-in-out;
                &:hover
                {
                    background: rgba(91,139,209, 0.6);
                    box-shadow: 0 8px 32px 0 rgba(66,108,168, 0.2 );
                    ._42logo{
                        fill : rgba(66,108,168, 0.8 );
                    }
                    span{
                        color : rgba(66,108,168, 0.8 );
                    }
                }

                span{
                    /* font-family : var(--main_font); */
                    font-weight : 500;
                    font-size : 1.3rem;
                    text-transform : uppercase;
                    color : white;
                    background-color : transparent;
                    transition : 0.2s ease-in-out;
                }
                ._42logo{
                    width : 30px;
                    background-color : transparent;
                    fill : white;
                    margin : 0px 10px;
                    transition : 0.2s ease-in-out;
                }
                ._devider{
                    width : 1px;
                    height : 90%;
                    margin-left: auto;
                    background: linear-gradient(0deg, rgba(0,187,64,0.02) 0%, rgba(14,26,42,0.3) 35%, rgba(0,187,64,0.02) 100%);
                }
            }
        }
        .blob{
        /* width : 300px;
        height: 200px; */
        border-radius : 50%;
        position : absolute;
        background-color : #C2B4FF;
        filter: blur(190px);
        z-index : 1;

        &:after{
            content : "";
            width : 100%;
            height: 100%;
            border-radius : 50%;
            background-color : #C2B4FF;
            position : absolute;
        }

        }
        ._t_left{
            top : -50px;
            left : -50px;
            transform : translateX(-30px);
        }
    }
`
