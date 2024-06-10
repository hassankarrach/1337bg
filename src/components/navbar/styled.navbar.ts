import styled from "styled-components";

export const StyledNavbar = styled.div`
    width : 100%;
    height: 60px;
    background: rgba( 255, 255, 255, 0.65 );
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    backdrop-filter: blur( 9px );
    -webkit-backdrop-filter: blur( 9px );
    position : fixed;
    top : 0;
    z-index : 9999;
    padding : 0px 6%;
    overflow : hidden;

    display : flex;
    justify-content : space-between;
    align-items : center;

    ._13hub_logo{
        height : 70%;
        background-color : transparent;
        cursor : pointer;
    }

    .Navbar_Right{
        height : 100%;
        display : flex;
        background-color : transparent;
        .Notifications
        {
            background-color : transparent;
            display : flex;
            justify-content : center;
            align-items :center;
            .Bell_icon
            {
                background-color : transparent;
                cursor : pointer;
                transition :0.1s ease-in-out;
                color : var(--Header_grey);

                &:hover{
                    color : var(--main_color);
                }
            }
        }
        .avatar{
            height : 100%;
            display : flex;
            justify-content : center;
            align-items : center;
            background-color : transparent;
            margin-left : 25px;
            cursor : pointer;
            .Avatar_icon
            {
                margin-left : 5px;
                height: 60%;
                background-color : transparent;
                border-radius : 30%;
                border : 1px solid var(--Header_grey);
                transition : 0.2s ease-in-out;
                &:hover
                {
                    box-shadow: 0 8px 32px 0 rgba(164,202,255, 0.35 );
                    border : 1px solid var(--light_blue);
                }
            }
            .Login_name{
                background-color : transparent;
                color : var(--Header_grey);
                font-weight : 500;
            }
        }
    }
`