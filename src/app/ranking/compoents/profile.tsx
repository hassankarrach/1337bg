import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import { Promo } from '../../../types/FortyTwo/types';
//Assets
import BinaryBack from "../../../../public/BinaryBack.png"
import _1337Logo from "../../../../public/logos/1337.svg"
//Icons
import { FaCheck, FaTimes, FaHourglassHalf, FaTv, FaWallet, FaFolder, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
//Utils
import { HexToRgba } from '@/utils/HexToRgba';
//Components
import Skeleton from '@mui/material/Skeleton';
import { useSession } from 'next-auth/react';
//types
import { User } from "../../../types/user/user"
import { StaticImageData } from 'next/image';
import CustomModal from '@/components/modal/modal';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/utils/fetch_users';
import Exams from './Exams';


interface ComponentProps {
    Promo: Promo,
    user_id: number,
    list_is_loading : boolean
}
interface StyleProps {
    PrmColor: string
    SecColor: string
    level: string
}

const UpdateUser = (data: any, setUserData: Dispatch<SetStateAction<User | null>>) => {
    const ExtractedUserData: User = {
        id: data.id,
        full_name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        login: data.login,
        level: data.cursus_users.length == 2 ? data.cursus_users[1].level.toFixed(2) : data.cursus_users[0].level.toFixed(2),
        img: data.image?.versions.small,
        location: data.location,
        wallet: data.wallet,
        intra_link: data.url,
        corrections_points: data.correction_point,
        is_pooler: data.cursus_users.length === 1 ? true : false,
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
            display : flex;
            flex-direction : column;
            justify-content  :space-between;
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

                .Userkind{
                    position : absolute;
                    color : #c8c8c3;
                }

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
      
      
            .Feedback_feature{
                height : 45px;
                width : 100%;
                display  :flex;
                justify-content : space-between;
                align-items : center;
                .reaction_buttons{
                    height : 100%;
                    width : 100%;
                    border-radius : 5px;
                    display  :flex;
                    justify-content  :center;
                    align-items : center;
                    /* padding : 0px 5px; */
                    /* padding : 0px 10px; */
                    overflow : hidden;
                    border : 1px solid var(--border_grey);
                    .Feedback{
                        flex-grow: 1;
                        display : flex;
                        justify-content : center;
                        align-items :center;
                    }
                    .reaction_devider{
                        width : 1px;
                        height : 100%;
                        background : linear-gradient(0deg, rgba(231,231,231,0) 0%, rgba(231,231,231,1) 50%, rgba(231,231,231,0) 100%);
                    }
                    .Thumb{
                        padding : 0px 15px;
                        height : 100%;
                        display : flex;
                        justify-content :center;
                        align-items : center;
                        cursor: pointer;
                        color : var(--Header_grey);
                        transition : 0.2s ease-in-out;
                    }
                    .Thum_up{
                        /* flex: 1 1 auto; */
                        &:hover{
                            background-color : #a8e6cf;
                            color : #56ab2f; 
                        }
                    }
                    .Thum_down{
                        /* flex: 1 1 auto; */
                        &:hover{
                            background-color  : #ff8a80;
                            color : #e53935;
                        }
                    }
                }
                .feedback_btn{
                    background-color : transparent;
                    border : 1px solid var(--border_grey);
                    border-radius : 5px;
                    padding : 0px 15px;
                    cursor: pointer;
                    text-transform : uppercase;
                    background-color : #bfd9ff;
                    /* border :1px solid #5B8BD1; */
                    color : #5B8BD1;
                    font-weight : 400;
                }
            }

            .ContainerProfile{
                flex-grow: 1;
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
                    flex: 1 1 auto;
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

                .RNCP_progress{
                display : flex;
                justify-content  : center;
                flex-direction : column;
                padding : 5px 0px;
                gap : 2px;
                .Progress_item{
                    padding : 3px 5px;
                    border-radius : 4px;
                    border : 1px solid var(--border_grey);
                    position : relative;
                    cursor: pointer;
                    /* flex: 1 1 auto; */
                    display : flex;
                    justify-content :center;
                    align-items : center;
                    &:after{
                        content :"";
                        left : 0;
                        bottom : 0;
                        position : absolute;
                        width : ${props => (props.level / 21) * 100}%;
                        height : 10%;
                        background-color : #a8e6cf;
                        z-index : -1;
                    }
                }
                }
            }
`
const Profile: React.FC<ComponentProps> = ({ Promo, user_id, list_is_loading}) => {
    //Stats
    const [userData, setUserData] = useState<User | null>(null);
    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);
    //Modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    //Auth
    const { data: session } = useSession();

    const BaseUrl = `https://api.intra.42.fr/v2/users/${user_id}`;
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['user', user_id],
        queryFn: () => fetchUsers(BaseUrl, session?.accessToken),
        enabled: !!user_id,
        retry: 2,
        refetchOnWindowFocus: false,
        staleTime : 5 * 24 * 60 * 60 * 1000,
    });

    useEffect(() => {
        console.log(user_id);
        if (data) {
            UpdateUser(data, setUserData);
        }
    }, [data, user_id])

    return (
        <StyledProfile PrmColor={Promo.Prm_color} SecColor={Promo.sec_color} level={userData ? userData.level : "0"}>
            <CustomModal open={IsModalOpen} onClose={handleCloseModal} />

            <div className='User_Banner'>
                {
                    userData?.is_pooler && <h1 className='Userkind'>POOLER</h1>
                }
                <img className='BinaryBack' src={BinaryBack.src} />
                {
                    (!isLoading && !list_is_loading) ?
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
                    <a href={`https://profile.intra.42.fr/users/${userData?.login}`} target='_blank'>
                        <svg className="_42logo" version="1.1" id="Calque_1" x="0px" y="0px" viewBox="0 -200 960 960" enable-background="new 0 -200 960 960">
                            <polygon id="polygon5" points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1   32,279.1 " />
                            <polygon id="polygon7" points="597.9,114.2 762.7,-51.1 597.9,-51.1 " />
                            <polygon id="polygon9" points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 " />
                            <polygon id="polygon11" points="928,279.1 762.7,443.9 928,443.9 " />
                        </svg>
                    </a>
                </div>

                <div className='Profil_UserLevel'>
                    <span>{userData?.level}</span>
                </div>
            </div>

            <div className='ContainerProfile'>
                <div className='User_Stats'>
                    <div className='State_item'>
                        <FaWallet className='State_item_icon' />
                        <span>{userData ? userData.wallet : "-"} ₳</span>
                    </div>

                    <div className='State_item'>
                        <FaFolder className='State_item_icon' />
                        <span>{userData?.corrections_points} Correction point</span>
                    </div>

                    <div className='State_item'>
                        <FaTv className={`State_item_icon ${userData?.location ? "State_item_active" : "State_item_inactive"}`} />
                        <span className={`State_item_icon ${userData?.location ? "State_item_active" : "State_item_inactive"}`}>
                            {userData && userData.location ? userData.location : "Offline"}
                        </span>
                    </div>
                </div>
                {
                    !userData?.is_pooler &&
                    <>
                        <span>RNCP 7 Progress :</span>
                        <div className='RNCP_progress'>
                            <div className='Progress_item'>
                                <span>{userData?.level} / 21 Level</span>
                            </div>
                            <div className='Progress_item'>
                                <span>0 / 4 Events</span>
                            </div>
                            <div className='Progress_item'>
                                <span>0 / 2 Experiances</span>
                            </div>
                        </div>
                    </>
                }
                <Exams UserData={userData} />
            </div>

            <div className='Feedback_feature'>
                <div className='reaction_buttons' onClick={handleOpenModal}>
                    <div className='Feedback'>
                        <span>Leave Anonymous Feedback</span>
                    </div>
                    <div className='reaction_devider' />
                    <div className='Thumb Thum_up'>
                        <FaThumbsUp />
                    </div>
                    <div className='reaction_devider' />
                    <div className='Thumb Thum_down'>
                        <FaThumbsDown />
                    </div>
                </div>
            </div>
        </StyledProfile>
    );
}

export default Profile;