import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Promo } from '../page';
//Assets
import BinaryBack from "../../../../public/BinaryBack.png"
import _1337Logo from "../../../../public/logos/1337.svg"
//Icons
import { FaCheck, FaTimes, FaHourglassHalf, FaTv, FaWallet, FaFolder } from "react-icons/fa";
//Utils
import { HexToRgba } from '@/utils/HexToRgba';
//Components
import Skeleton from '@mui/material/Skeleton';
import { useSession } from 'next-auth/react';
//types
import { User } from "../../../types/user/user"
import { StaticImageData } from 'next/image';


interface ComponentProps {
    Promo: Promo,
    user_id: number
}
interface StyleProps {
    PrmColor: string
    SecColor: string
}

const UpdateUser = (data: any, setUserData: Dispatch<SetStateAction<User | null>>) => {
    const ExtractedUserData: User = {
        id: data.id,
        full_name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        login: data.login,
        level: data.cursus_users[0]?.level?.toString() || 'N/A',
        img: data.image?.versions.small,
        location: data.location,
        wallet: data.wallet,
        corrections_points: data.correction_point,
        projects: data.projects_users.map((project: any) => ({
            cursus_id: project.cursus_ids[0],
            final_make: project.final_mark,
            project_name: project.project.name,
            finished_date: project.updated_at,
            is_marked: project.marked,
            is_validated: project['validated?'],
            status: project.status,
        })),
        achievements: data.achievements.map((achievement: any) => ({
            achievement_name: achievement.name,
            achievement_desc: achievement.description,
            achievement_img: achievement.image,
        })),
    }
    setUserData(ExtractedUserData);
}

const StyledProfile = styled.div<StyleProps>`
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
            
            .User_Banner{
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
                    background-position : center;
                    background-size : cover;
                    background-repeat : no-repeat;
                    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
                    display : flex;
                    justify-content :center;
                    align-items : center;
                    .Profile_Infos{
                        display : flex;
                        flex-direction : column;
                        position  :absolute;
                        bottom : 20px;
                        left :110%;
                        width : auto;
                        .Profile_Full_Name{
                            /* text-transform : uppercase; */
                            font-size : 1.4rem;
                            font-weight : 500;
                            color : white;
                            white-space: nowrap;
                        }
                        .Profile_UserName{
                            font-weight : 400;
                            color : white;
                        }
                    }
                }
                .Profil_UserLevel{
                    position  :absolute;
                    padding : 3px;
                    border-radius : 4px;
                    background: rgba( 19, 19, 19, 0.01 );
                    backdrop-filter: blur( 33px );
                    -webkit-backdrop-filter: blur( 33px );
                    position : absolute;
                    right :10px;
                    bottom : 5px;
                    span{
                        font-size : 1.3rem;
                        color : white;
                        font-weight : 300;
                    }
                }
            }
            .User_Exams{
                width : 100%;
                height : auto;
                border-width: 0 0 0 0;
                border-top: 1px solid;
                border-image: linear-gradient(90deg, rgba(231,231,231,0) 0%, rgba(231,231,231,1) 50%, rgba(231,231,231,0) 100%) 1; 
                padding : 2px;
                position : absolute;
                bottom :0;
                display : flex;
                flex-direction : column;

                .Exam_container{
                    width : 100%;
                    height : 100%;
                    border-radius : 4px;
                    display : flex;
                    justify-content : space-between;
                    align-items : center;
                    padding : 5px;
                    .Status_icon{
                        size : 10px;
                        margin-right : 3px;
                    }
                    .status_icon_validated{
                        color : #56ab2f;
                        background-color : #a8e6cf;
                    }
                    .status_icon_failed{
                        color : #e53935;
                        background-color  : #ff8a80;
                    }
                    .status_icon_ongoing{
                        color : #9e9e9e;
                        background-color : #b71c1c;
                    }
                    .Exam_status{
                        width : 80px;
                        height : 100%;
                        display : flex;
                        justify-content : center;
                        align-items : center;
                        background-color  : var(--light_grey);
                        padding : 0px 3px;
                        margin-left: auto;
                    }
                }
            }
            .User_Stats{
                width  : 100%;
                margin-top : 20px;
                display  :flex;
                gap  :3px;
                .State_item{
                    padding : 2px 10px;
                    background-color : var(--light_grey);
                    border-radius : 5px;
                    border : 1px solid var(--border_grey);
                    display : flex;
                    justify-content : center;
                    align-items : center;
                    gap : 5px;
                    .State_item_icon{
                        color : var(--Header_grey);
                    }
                    .State_item_active{
                        color : #56ab2f;
                    }
                    .State_item_inactive{
                        color : #e53935;
                    }
                }
            }
`
const Profile: React.FC<ComponentProps> = ({ Promo, user_id }) => {
    const [userData, setUserData] = useState<User | null>(null);
    const [IsLoading, setIsLoading] = useState<boolean>(true);
    const { data: session } = useSession();

    useEffect(() => {
        if (session && session.accessToken) {
            setIsLoading(true);
            const baseUrl = `https://api.intra.42.fr/v2/users/${user_id}`;
            fetch(`${baseUrl}`, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    UpdateUser(data, setUserData);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [user_id])

    return (
        <StyledProfile PrmColor={Promo.Prm_color} SecColor={Promo.sec_color}>
            <div className='User_Banner'>
                <img className='BinaryBack' src={BinaryBack.src} />
                {
                    !IsLoading ?
                        <div className='Profile_avatar' style={{ backgroundImage: `url(${userData?.img})` }}>
                            {
                                !userData?.img &&
                                <svg width="76" height="20" viewBox="0 0 76 20" fill="var(--border_grey)">
                                    <path d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z" fill="var(--border_grey)"></path>
                                    <path d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z" fill="var(--border_grey)"></path>
                                    <path d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z" fill="var(--border_grey)"></path>
                                    <path d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z" fill="var(--border_grey)"></path>
                                </svg>
                            }
                            <div className='Profile_Infos'>
                                <h1 className="Profile_Full_Name">{userData?.full_name}</h1>
                                <span className='Profile_UserName'>{userData?.login}</span>
                            </div>

                        </div>
                        : <Skeleton className='Skeleton_avatar' animation={"wave"} variant="circular" width="90px" height={"90px"} />
                }
                <div className='Profile_UserIcons'>
                    <svg className="_42logo" version="1.1" id="Calque_1" x="0px" y="0px" viewBox="0 -200 960 960" enable-background="new 0 -200 960 960">
                        <polygon id="polygon5" points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1   32,279.1 " />
                        <polygon id="polygon7" points="597.9,114.2 762.7,-51.1 597.9,-51.1 " />
                        <polygon id="polygon9" points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 " />
                        <polygon id="polygon11" points="928,279.1 762.7,443.9 928,443.9 " />
                    </svg>
                </div>

                <div className='Profil_UserLevel'>
                    <span>{userData?.level}</span>
                </div>
            </div>

            <div className='User_Stats'>
                <div className='State_item'>
                    <FaWallet className='State_item_icon'/>
                    <span>{userData? userData.corrections_points : "-"} ₳</span>
                </div>

                <div className='State_item'>
                    <FaFolder className='State_item_icon'/>
                    <span>{userData?.corrections_points} Correction point</span>
                </div>

                <div className='State_item'>
                    <FaTv className={`State_item_icon ${userData?.location? "State_item_active" : "State_item_inactive"}`}/>
                    <span className={`State_item_icon ${userData?.location? "State_item_active" : "State_item_inactive"}`}>
                        {userData && userData.location? userData.location : "Offline"}
                    </span>
                </div>
            </div>

            <div className='User_Exams'>
                <span>Exams :</span>
                {
                    userData ? userData.projects
                        .filter(project => project.project_name
                            .toUpperCase()
                            .includes("EXAM"))
                        .map((Item, index) => {
                            console.log(Item);
                            return (
                                <div className='Exam_container' key={index}>
                                    {
                                        Item.is_validated ? <FaCheck className='Status_icon status_icon_validated' />
                                            : !Item.is_validated ? <FaTimes className='Status_icon status_icon_failed' />
                                                : ""
                                    }
                                    <span className='Exam_Title'>{Item.project_name}</span>
                                    <div className='Exam_status'>
                                        <span>{Item.final_make}</span>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <Skeleton
                            className='Skeleton'
                            animation="wave"
                            variant="rectangular"
                            width="100%"
                            height="65px"
                        />
                }
            </div>


        </StyledProfile>
    );
}

export default Profile;