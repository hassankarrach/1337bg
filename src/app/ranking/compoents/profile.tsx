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
  flex: 1;
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
    height: 55px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 4px;
    align-items: center;
    padding: 4px;

    button {
      width: 200px;
      height: 45px;
      background-color: var(--main_color);
      color: var(--main_color_dark);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.2s ease-in-out;
      font-weight: 500;
      font-size: 1rem;
      outline: none;
    }
    input {
      width: 100%;
      height: 45px;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 1rem;
      font-family: var(--main_font);
      outline: none;
      padding: 10px 5px;
      resize: none;
    }
  }

  .ContainerProfile {
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

interface Feedback {
  id: number;
  feedback_text: string;
  giver: {
    user_name: string;
    image_url: string; // URL to the giver's avatar image
    nickname?: string; // Optional, if available
  };
  created_at: string;
}
const Profile: React.FC<ComponentProps> = ({
  StudentData,
  Promo,
  list_is_loading,
}) => {
  //Stats
  const session = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);
  //Modal
  const handleOpenModal = () => toast.info("This feature is not available yet");
  const handleCloseModal = () => setIsModalOpen(false);
  //Feedbacks
  const [receivedFeedbacks, setReceivedFeedbacks] = useState<Feedback[]>([]);
  const [feedbackText, setFeedbackText] = useState<string>("");

  async function leaveFeedback(recieverLogin: string, text: string) {
    // user should be verified before being able to provide feedbacks
    if (!session.data?.user?.verified) {
      toast.error("You must be verified to leave feedback.");
      return;
    }
    // Approximate 2-line limit: max 2 line breaks OR ~200 characters
    const lineCount = text.split("\n").length;
    if (lineCount > 2 || text.length > 200) {
      toast.error("Feedback must not exceed 2 lines.");
      return;
    }

    try {
      const res = await fetch("/api/students/feedbacks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _userName: recieverLogin,
          feedbackText: text.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send feedback");

      toast.success("Feedback sent successfully!");
      setFeedbackText(""); // Clear the feedback text
      await fetchReceivedFeedbacks();
    } catch (err) {
      console.error("Error sending feedback:", err);
      toast.error("Error sending feedback.");
    }
  }

  const fetchReceivedFeedbacks = async () => {
    if (!userData?.login) return;

    try {
      const res = await fetch(`/api/students/feedbacks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: userData.login }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch feedbacks");

      setReceivedFeedbacks(data.feedbacks);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    if (StudentData != undefined) UpdateUser(StudentData, setUserData);
    setReceivedFeedbacks([]); // Reset feedbacks when StudentData changes
  }, [StudentData]);

  useEffect(() => {
    fetchReceivedFeedbacks();
  }, [userData?.id]);

  function formatTimeAgo(isoDate: string): string {
    const now = new Date();
    const then = new Date(isoDate);
    const diffMs = now.getTime() - then.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) return `${weeks}w ago`;
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    if (seconds > 0) return `${seconds}s ago`;

    return "just now";
  }

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
                    <VerifiedIcon size={18} style={{ marginLeft: "5px" }} />
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

      <StyledUserFeedbacks>
        <h2>Feedbacks :</h2>
        {(!receivedFeedbacks || receivedFeedbacks.length === 0) && (
          <span>No feedbacks received yet.</span>
        )}
        {receivedFeedbacks.map((feedback, key) => {
          return (
            <div
              key={key}
              className="Feedback_el"
              onClick={() => {
                window.open(
                  `https://profile.intra.42.fr/users/${feedback.giver.user_name}`,
                  "_blank"
                );
              }}
            >
              <div
                className="avatar"
                style={{ backgroundImage: `url(${feedback.giver.image_url})` }}
              />
              <div className="feedback_details">
                <h1 className="user_name">
                  {feedback.giver.nickname || feedback.giver.user_name}
                </h1>
                <span className="FeedbackText">{feedback.feedback_text}</span>

                <span className="time">
                  {formatTimeAgo(feedback.created_at)}
                </span>
              </div>
            </div>
          );
        })}
      </StyledUserFeedbacks>

      <div className="Feedback_feature">
        <input
          placeholder="Leave a feedback..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />

        <button
          onClick={() => leaveFeedback(userData?.login || "", feedbackText)}
        >
          Send Feedback
        </button>
      </div>
    </StyledProfile>
  );
};

const StyledUserFeedbacks = styled.div`
  width: 100%;
  flex: 1;
  padding: 5px;
  overflow-y: auto;
  display: flex;
  gap: 5px;
  flex-direction: column;
  overflow-x: hidden;

  h2 {
    color: rgba(255, 255, 255, 0.6);
    padding: 10px 0px;
    font-size: 1.2rem;
    font-weight: 400;
  }
  .Feedback_el {
    width: 100%;
    height: auto;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 4px;
    gap: 4px;
    border-radius: 5px;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.07);
    }
    .avatar {
      min-width: 40px;
      min-height: 40px;
      width: 40px;
      height: 40px;
      border-radius: 5px;
      background-position: center;
      background-size: cover;
    }
    .feedback_details {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      justify-content: center;
      align-items: flex-start;
      padding: 5px;
      .FeedbackText {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.5);
        margin-bottom: 5px;
        word-wrap: break-word;
        max-width: 350px;
        font-weight: 300;
      }
      .time {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.3);
        position: absolute;
        right: 0px;
        font-weight: 200;
      }
    }
    .user_name {
      text-transform: uppercase;
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

export default Profile;
