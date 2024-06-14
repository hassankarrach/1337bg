import React from 'react';
import styled from 'styled-components';
import { Promo } from '../page';
//Assets
import BinaryBack from "../../../../public/BinaryBack.png"
import { HexToRgba } from '@/utils/HexToRgba';
//Components
import Skeleton from '@mui/material/Skeleton';

interface Profileprops {
    UserName: string,
    FullName: string,
    Promo: Promo,
    Avatar : string,
    is_Loading : boolean
}

interface ProfileStylesProps {
    PrmColor: string
    SecColor: string
    Avatar  : string
}

const StyledProfile = styled.div<ProfileStylesProps>`
            width : 35%;
            height : 100%;
            background-color : #fafafa;
            border-radius : 5px;
            position  :sticky;
            top :0;
            left : 0;
            overflow : hidden;
            padding : 5px;
            /* border: 1px solid pink; */
            
            .Profile_banner{
                width : 100%;
                height : 150px;
                background-color : black;
                position : relative;
                background-position : center;
                background-size : cover;
                background-repeat : no-repeat;
                border-radius : 5px;
                display  : flex;
                justify-content : center;
                align-items : center;
                background: radial-gradient(
                  circle, 
                  ${props => `${HexToRgba(props.SecColor, 1)} 0%`}, 
                  ${props => `${HexToRgba(props.PrmColor, 1)} 100%`}
                );

                .BinaryBack{
                    width : 100%;
                    opacity : 0.5;
                }
                .Profile_UserIcons{
                    position : absolute;
                    right :0;
                    top : 5px;

                    ._42logo{
                    width : 30px;
                    background-color : transparent;
                    fill : white;
                    margin : 0px 10px;
                    cursor : pointer;
                    transition : 0.2s ease-in-out;
                    opacity : 0.8;
                    &:hover{
                        opacity : 1;
                    }
                }
                }
                .Skeleton_avatar{
                    position : absolute;
                    bottom : -15px;
                    left : 10px;
                    border-radius : 20%;
                    background-color : var(--light_grey);
                }
                .Profile_avatar{
                    width : 90px;
                    height: 90px;
                    background-color : var(--light_grey);
                    border-radius : 20%;
                    position : absolute;
                    bottom : -15px;
                    left : 10px;
                    background-image :  ${props => `${props.Avatar}`};
                    background-position : center;
                    background-size : cover;
                    background-repeat : no-repeat;
                    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
                    }
                    .Profile_Infos{
                        display : flex;
                        color : white;
                        flex-direction : column;
                        position  :absolute;
                        margin-left: 110px;
                        bottom : 10px;
                        .Profile_Full_Name{
                            /* text-transform : uppercase; */
                            font-size : 1.4rem;
                            font-weight : 500;
                            text-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                        }
                        .Profile_UserName{
                            font-weight : 400;
                        }
                    }
            }
`
const Profile: React.FC<Profileprops> = ({ FullName, Promo, UserName, is_Loading, Avatar }) => {
    // console.log(Avatar);
    return (
        <StyledProfile PrmColor={Promo.Prm_color} SecColor={Promo.sec_color} Avatar={Avatar}>
            <div className='Profile_banner'>
                <img className='BinaryBack' src={BinaryBack.src}/>

                {
                    !is_Loading ? <div className='Profile_avatar'/>
                    : <Skeleton className='Skeleton_avatar' animation={"wave"} variant="circular" width = "90px" height={"90px"}/>
                }

                {/* <div className='Profile_Infos'>
                    <h1 className="Profile_Full_Name">Hassan Karrach</h1>
                    <span className='Profile_UserName'>@hkarrach</span>
                </div> */}

                <div className='Profile_UserIcons'>
                    <svg className="_42logo" version="1.1" id="Calque_1" x="0px" y="0px" viewBox="0 -200 960 960" enable-background="new 0 -200 960 960">
                        <polygon id="polygon5" points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1   32,279.1 " />
                        <polygon id="polygon7" points="597.9,114.2 762.7,-51.1 597.9,-51.1 " />
                        <polygon id="polygon9" points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 " />
                        <polygon id="polygon11" points="928,279.1 762.7,443.9 928,443.9 " />
                    </svg>
                </div>

                <div className='Profil_UserLevel'>

                </div>
            </div>
        </StyledProfile>
    );
}

export default Profile;