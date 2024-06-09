import styled from "styled-components"
import svg_illustr from "../../public/assets/main.svg"

export const StyledMain = styled.div`
    width : 100vw;
    height: 100vh;
    display : flex;
    justify-content : center;
    align-items : center;
    overflow : hidden;
    
    .Right
    {
        width : 40%;
        height: 100%;
        background-color : #9DFD70;
        /* background-image : url("https://media.tenor.com/vxFNoJHV3I4AAAAe/chiquichico.png"); */
        background-position : center;
        background-size : cover;
        background-repeat : no-repeat;
        position : relative;
        z-index : 999;
        &::after
        {
            content : "";
            position : absolute;
            left : 0;
            top : 0;
            width: 0; 
            height: 0; 
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-top: 20px solid white;

        }
        &::before
        {
            content : "";
            position : absolute;
            width : 120px;
            height: 120px;
            background-color : white;
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
                background-color : transparent;
            }

            .login_button {
                outline : none;
                border: 1px solid rgba( 0,187,64, 0.25 );
                border-left : none;
                display : flex;
                /* justify-content : space-around; */
                align-items : center;
                padding : 2px 5px;
                width : 200PX;
                height : 100%;
                border-radius : 5px;
                z-index : 999;
                margin-left: auto;
                cursor: pointer;
                
                background: rgba( 157,253,112, 0.6 );
                backdrop-filter: blur( 2px );
                -webkit-backdrop-filter: blur( 2px );
                transition : 0.5s ease-in-out;
                &:hover
                {
                    background: rgba( 157,253,112, 0.7 );
                    box-shadow: 0 8px 32px 0 rgba(0,187,64, 0.15 );
                }

                span{
                    font-weight : 700;
                    font-size : 1.2rem;
                    text-transform : uppercase;
                    color : rgba( 0,187,64, 0.6 );
                    background-color : transparent;
                }
                ._42logo{
                    width : 30px;
                    background-color : transparent;
                    fill : rgba(0,187,64, 1 );
                    margin : 0px 10px;
                }
                ._devider{
                    width : 1px;
                    height : 90%;
                    margin-left: auto;
                    background: linear-gradient(0deg, rgba(0,187,64,0.02) 0%, rgba(0,187,64,0.3) 35%, rgba(0,187,64,0.02) 100%);
                }
            }
        }

        .blob{
        width : 200px;
        height: 200px;
        border-radius : 50%;
        position : absolute;
        background-color : #9DFD70;
        filter: blur(90px);
        z-index : 1;

        &:after{
            content : "";
            width : 100%;
            height: 100%;
            border-radius : 50%;
            background-color : #1DF366;
            position : absolute;
        }

        }
        ._t_left{
            top : -40px;
            left : -40px;
            transform : translateX(-30px);
        }
        ._b_right{
            bottom : -15%;
            right : 0px;
        }

        ._b_illustration
        {
            position : absolute;
            bottom : 0;
            left :0;
            width : 100%;
            height: 200px;
            /* background-color : red; */
            background-image : url(${svg_illustr});
            background-position : center;
            background-size : cover;
            background-repeat : no-repeat;
        }
    }
`
