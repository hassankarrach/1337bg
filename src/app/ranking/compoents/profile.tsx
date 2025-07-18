import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import { Promo } from "../../../types/FortyTwo/types";
//Assets
import BinaryBack from "../../../../public/BinaryBack.png";
import _1337Logo from "../../../../public/logos/1337.svg";
//Icons
import {
  FaCheck,
  FaTimes,
  FaHourglassHalf,
  FaTv,
  FaWallet,
  FaFolder,
  FaThumbsUp,
  FaThumbsDown,
  FaCheckSquare as VerifiedIcon,
} from "react-icons/fa";
//Utils
import { HexToRgba } from "@/utils/HexToRgba";
//Components
import Skeleton from "@mui/material/Skeleton";
import { useSession } from "next-auth/react";
//types
import { User } from "../../../types/user/user";
import { StaticImageData } from "next/image";
import CustomModal from "@/components/modal/modal";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/utils/fetch_users";
import Exams from "./Exams";
import { url } from "inspector";
import { toast } from "react-toastify";

interface ComponentProps {
  Promo: Promo;
  list_is_loading: boolean;
  StudentData: any;
}
interface StyleProps {
  $primary_color: string;
  $second_color: string;
  $level: string;
  $promo_id: number;
  $banner_url: string | null;
}
const UpdateUser = (
  data: any,
  setUserData: Dispatch<SetStateAction<User | null>>
) => {
  const ExtractedUserData: User = {
    id: data.id,
    full_name: `${data.user.first_name} ${data.user.last_name}`,
    email: data.user.email,
    login: data.user.login,
    level: data.level.toFixed(2),
    img: data.user.image?.versions.small,
    location: data.user.location,
    wallet: data.user.wallet,
    intra_link: "data.user.url",
    corrections_points: data.user.correction_point,
    is_pooler: false,
    nickname: data.nickname || null,
  };
  setUserData(ExtractedUserData);
};

const StyledProfile = styled.div<StyleProps>`
  /* width: 100%; */
  flex : 1;
  height: auto;
  background-color: #212125;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .User_Banner {
    width: 100%;
    height: 150px;
    position: sticky;
    top: 0;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(
      circle,
      ${(props) => `${HexToRgba(props.$second_color, 1)} 0%`},
      ${(props) => `${HexToRgba(props.$primary_color, 1)} 100%`}
    );
    position: relative;

    &:after {
      width: 100%;
      height: 100%;
      position: absolute;
      content: "";
      background-image: url(${(props) => props.$banner_url || BinaryBack.src});
      background-size: cover;
      background-position: center;
      opacity: ${(props) => (props.$banner_url ? 1 : 0.6)};
    }

    .Userkind {
      position: absolute;
      color: white;
      opacity: 0.5;
    }
    .BinaryBack {
      width: 100%;
      opacity: 0.5;
    }
    .Profile_UserIcons {
      position: absolute;
      right: 0;
      top: 5px;
      z-index: 2;

      ._42logo {
        width: 30px;
        background-color: transparent;
        fill: white;
        margin: 0px 10px;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
          opacity: 1;
        }
      }
    }
    .Skeleton_avatar {
      position: absolute;
      bottom: -15px;
      left: 10px;
      border-radius: 20%;
      background-color: var(--main_background);
    }
    .Profile_avatar {
      width: 90px;
      height: 90px;
      background-color: var(--main_background);
      border-radius: 20%;
      position: absolute;
      bottom: -15px;
      left: 10px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 3;
      .Profile_Infos {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 20px;
        left: 110%;
        width: auto;
        .Profile_Full_Name {
          /* text-transform : uppercase; */
          font-size: 1.4rem;
          font-weight: 500;
          color: white;
          white-space: nowrap;
        }
        .Profile_UserName {
          font-weight: 400;
          color: white;
        }
      }
    }
    .Profil_UserLevel {
      position: absolute;
      padding: 3px;
      border-radius: 4px;
      background: rgba(19, 19, 19, 0.01);
      backdrop-filter: blur(33px);
      -webkit-backdrop-filter: blur(33px);
      position: absolute;
      right: 10px;
      bottom: 5px;
      z-index: 2;

      span {
        font-size: 1.3rem;
        color: white;
        font-weight: 300;
      }
    }
  }

  .Feedback_feature {
    margin-top: 10px;
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .reaction_buttons {
      height: 100%;
      width: 100%;
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      /* padding : 0px 5px; */
      /* padding : 0px 10px; */
      overflow: hidden;
      border: 1px solid rgba(44, 44, 48, 1);
      .Feedback {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(44, 44, 48, 1);
        transition: 0.2s ease-in-out;
        height: 100%;
        cursor: pointer;
        padding: 8px 0px;
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        span {
          color: rgba(255, 255, 255, 0.3);
          font-size: 1.1rem;
          font-weight: 300;
        }
      }
      .reaction_devider {
        width: 1px;
        height: 100%;
        background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.1) 100%
        );
      }
      .Thumb {
        padding: 0px 15px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: rgba(44, 44, 48, 1);
        transition: 0.2s ease-in-out;
        background-color: rgba(255, 255, 255, 0.16);
      }
      .Thum_up {
        /* flex: 1 1 auto; */
        &:hover {
          background-color: #a8e6cf;
          color: #56ab2f;
        }
      }
      .Thum_down {
        /* flex: 1 1 auto; */
        &:hover {
          background-color: #ff8a80;
          color: #e53935;
        }
      }
    }
  }

  .ContainerProfile {
    flex-grow: 1;
    .User_Stats {
      width: 100%;
      margin-top: 20px;
      display: flex;
      gap: 3px;
      padding: 0px 3px;
      .State_item {
        padding: 2px 10px;
        background-color: rgba(44, 44, 48, 1);
        border-radius: 5px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        flex: 1 1 auto;
        font-size: 1rem;
        font-weight: 800;
        padding: 6px 0px;
        span {
          font-family: var(--main_font);
          color: rgba(255, 255, 255, 0.4);
        }
        .State_item_icon {
          color: rgba(255, 255, 255, 0.4);
        }
        .State_item_active {
          color: #56ab2f;
        }
        .State_item_inactive {
          color: #e53935;
        }
      }
    }
  }
`;

const Profile: React.FC<ComponentProps> = ({
  StudentData,
  Promo,
  list_is_loading,
}) => {
  //Stats
  const [userData, setUserData] = useState<User | null>(null);
  const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);
  //Modal
  const handleOpenModal = () => toast.info("This feature is not available yet");
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (StudentData != undefined) UpdateUser(StudentData, setUserData);
    // console.log(StudentData);
  }, [StudentData]);

  return (
    <StyledProfile
      $primary_color={Promo.Prm_color}
      $second_color={Promo.sec_color}
      $level={userData ? userData.level : "0"}
      $promo_id={Promo.id}
      $banner_url={StudentData?.banner_url}
    >
      <CustomModal open={IsModalOpen} onClose={handleCloseModal} />

      <div className="User_Banner">
        {!list_is_loading ? (
          <a
            href={`https://profile.intra.42.fr/users/${userData?.login}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <div
              className="Profile_avatar"
              style={{ backgroundImage: `url(${userData?.img})` }}
            >
              {!userData?.img && (
                <svg
                  width="76"
                  height="20"
                  viewBox="0 0 76 20"
                  fill="rgba(44,44,48,1)"
                >
                  <path
                    d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z"
                    fill="rgba(44,44,48,1)"
                  ></path>
                  <path
                    d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
                    fill="rgba(44,44,48,1)"
                  ></path>
                  <path
                    d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
                    fill="rgba(44,44,48,1)"
                  ></path>
                  <path
                    d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
                    fill="rgba(44,44,48,1)"
                  ></path>
                </svg>
              )}
              <div className="Profile_Infos">
                <h1 className="Profile_Full_Name">
                  {userData && userData.nickname
                    ? userData.nickname
                    : userData?.full_name}
                  {StudentData?.verified && (
                    <VerifiedIcon  size={18} style={{marginLeft : '5px'}}/>
                  )}
                </h1>
                <span className="Profile_UserName">{userData?.login}</span>
              </div>
            </div>
          </a>
        ) : (
          <Skeleton
            className="Skeleton_avatar"
            animation={"wave"}
            variant="circular"
            width="90px"
            height={"90px"}
          />
        )}
        <div className="Profile_UserIcons">
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
            <polygon id="polygon11" points="928,279.1 762.7,443.9 928,443.9 " />
          </svg>
        </div>

        <div className="Profil_UserLevel">
          <span>{userData?.level}</span>
        </div>
      </div>

      <div className="ContainerProfile">
        <div className="User_Stats">
          <div className="State_item">
            <FaWallet className="State_item_icon" />
            <span>{userData ? userData.wallet : "-"} ₳</span>
          </div>

          <div className="State_item">
            <FaFolder className="State_item_icon" />
            <span>{userData?.corrections_points} Correction point</span>
          </div>

          <div className="State_item">
            <FaTv
              className={`State_item_icon ${
                userData?.location ? "State_item_active" : "State_item_inactive"
              }`}
            />
            <span
              className={`State_item_icon ${
                userData?.location ? "State_item_active" : "State_item_inactive"
              }`}
            >
              {userData && userData.location ? userData.location : "Offline"}
            </span>
          </div>
        </div>
      </div>

      <div className="Feedback_feature">
        <div className="reaction_buttons" onClick={handleOpenModal}>
          <div className="Feedback">
            <span>Leave Anonymous Feedback</span>
          </div>
          <div className="reaction_devider" />
          <div className="Thumb Thum_down">
            <FaThumbsDown />
          </div>
          <div className="reaction_devider" />
          <div className="Thumb Thum_up">
            <FaThumbsUp />
          </div>
        </div>
      </div>
    </StyledProfile>
  );
};

export default Profile;
