import React, { Dispatch, SetStateAction, useEffect, useState, useCallback } from "react";
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
  FaCoins,
  FaGraduationCap,
  FaEye,
} from "react-icons/fa";
//Utils
import { HexToRgba } from "@/utils/HexToRgba";
//Components
import Skeleton from "@mui/material/Skeleton";
import { useSession } from "next-auth/react";

import AdmissionStatus from "@/components/admission_status/AdmissionStatus";
import BioEditor from "@/components/bio_editor/BioEditor";
import FeedbackAvatar from "@/components/feedback_avatar/FeedbackAvatar";
import StatsCard from "@/components/stats_card/StatsCard";

//types
import { User } from "../../../types/user/user";
import { StaticImageData } from "next/image";
import CustomModal from "@/components/modal/modal";
import ConfirmationDialog from "@/components/confirmation_dialog/ConfirmationDialog";
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
    bio: data.bio || null, // Add bio field
    // Add admission fields from data
    accepted: data.accepted || false,
    reason: data.reason || null,
    isvalidated: data.isvalidated || false,
    cheating: data.cheating || false,
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
      gap: 8px;
      padding: 0px 8px;
    }
  }
`;

interface Feedback {
  id: string;
  feedback_text: string;
  giver: {
    user_name: string;
    image_url: string; // URL to the giver's avatar image
    nickname?: string; // Optional, if available
    is_verified: boolean;
  };
  receiver?: {
    user_name: string;
    image_url: string;
    nickname?: string;
    is_verified: boolean;
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
  const [givenFeedbacks, setGivenFeedbacks] = useState<Feedback[]>([]);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);

  async function leaveFeedback(recieverLogin: string, text: string) {
    // user should be verified before being able to provide feedbacks
    if (!session.data?.user?.verified) {
      toast.error("You must be verified to leave feedback.");
      return;
    }

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
      setFeedbackText(""); 
      await fetchReceivedFeedbacks();
      await fetchGivenFeedbacks();
    } catch (err) {
      console.error("Error sending feedback:", err);
      toast.error("Error sending feedback.");
    }
  }

  const fetchReceivedFeedbacks = useCallback(async () => {
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
  }, [userData?.login]);

  const fetchGivenFeedbacks = useCallback(async () => {
    try {
      const res = await fetch(`/api/students/feedbacks/given`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch given feedbacks");

      setGivenFeedbacks(data.feedbacks);
    } catch (err) {
      console.error("Error fetching given feedbacks:", err);
    }
  }, []);

  const deleteFeedback = async (feedbackId: string) => {
    try {
      const res = await fetch(`/api/students/feedbacks/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to delete feedback");

      toast.success("Feedback deleted successfully!");
      await fetchGivenFeedbacks();
      await fetchReceivedFeedbacks(); 
    } catch (err) {
      console.error("Error deleting feedback:", err);
      toast.error("Error deleting feedback.");
    }
  };

  const showDeleteConfirmation = (feedbackId: string) => {
    setFeedbackToDelete(feedbackId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (feedbackToDelete) {
      await deleteFeedback(feedbackToDelete);
      setShowDeleteDialog(false);
      setFeedbackToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setFeedbackToDelete(null);
  };

  useEffect(() => {
    if (StudentData != undefined) UpdateUser(StudentData, setUserData);
    setReceivedFeedbacks([]); 
  }, [StudentData]);

  useEffect(() => {
    if (userData?.login) {
      fetchReceivedFeedbacks();
      fetchGivenFeedbacks();
    }
  }, [userData?.login, fetchReceivedFeedbacks, fetchGivenFeedbacks]);


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
      
      <ConfirmationDialog
        isOpen={showDeleteDialog}
        title="Delete Feedback"
        message="Are you sure you want to delete this feedback? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <div className="User_Banner">
        {!list_is_loading ? (
            <a
              href={
              userData?.login === "Captain"
                ? "https://github.com/AchrafMez"
                : userData?.login === "Zero"
                ? "https://github.com/hassankarrach"
                : `https://profile.intra.42.fr/users/${userData?.login}`
            }
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
          <StatsCard
            icon={FaCoins}
            value={`${userData ? userData.wallet : "-"} ₳`}
            label="Wallet"
            color="#ffd700"
          />
          
          <StatsCard
            icon={FaGraduationCap}
            value={userData?.corrections_points || 0}
            label="Evaluation Points"
            color="#4CAF50"
          />
          
          <StatsCard
            icon={FaEye}
            value={userData && userData.location ? userData.location : "Offline"}
            label="Status"
            color={userData?.location ? "#56ab2f" : "#e53935"}
          />
        </div>

        {/* Admission Status Section */}
        {StudentData && (StudentData.accepted !== undefined || StudentData.cheating !== undefined) && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: 'rgba(33, 33, 37, 0.4)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
          }}>
            <h3 style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Admission Status
            </h3>
            <AdmissionStatus
              accepted={StudentData.accepted || false}
              reason={StudentData.reason || null}
              isvalidated={StudentData.isvalidated || false}
              cheating={StudentData.cheating || false}
              level={parseFloat(userData?.level || '0')}
            />
          </div>
        )}

        {/* User Bio Section */}
        {userData && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: 'rgba(33, 33, 37, 0.4)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
          }}>
            <BioEditor 
              initialBio={userData.bio} 
              isEditable={session?.data?.user?.login === userData.login}
              isOwnProfile={session?.data?.user?.login === userData.login}
            />
          </div>
        )}
      </div>

      <StyledUserFeedbacks>
        <h2>Feedbacks :</h2>
        {(!receivedFeedbacks || receivedFeedbacks.length === 0) && (
          <span>No feedbacks received yet.</span>
        )}
        {receivedFeedbacks.map((feedback, key) => {
          const isMyFeedback = session.data?.user?.login === feedback.giver.user_name;
          
          return (
            <div
              key={key}
              className="Feedback_el"
            >
              <FeedbackAvatar
                username={feedback.giver.user_name}
                imageUrl={feedback.giver.image_url}
                nickname={feedback.giver.nickname}
                className="avatar"
              />
              <div className="feedback_details">
                <h1 className="user_name">
                    {feedback.giver.nickname || feedback.giver.user_name}
                    {feedback.giver.is_verified && (
                    <VerifiedIcon 
                      size={16}  
                      style={{ 
                        marginLeft: "5px", 
                        color: "var(--main_color)",
                      }} 
                    />
                  )}
                </h1>
                
                <span className="FeedbackText">{feedback.feedback_text}</span>

                <span className="time">
                  {formatTimeAgo(feedback.created_at)}
                </span>
              </div>
              
              {isMyFeedback && (
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    showDeleteConfirmation(feedback.id);
                  }}
                  title="Delete your feedback"
                >
                  🗑️
                </button>
              )}
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

  .feedback-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
  }

  .feedback-tabs {
    display: flex;
    gap: 5px;
  }

  .tab {
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    font-weight: 500;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.8);
    }

    &.active {
      background: var(--main_color);
      color: white;
      border-color: var(--main_color);
    }
  }

  h2 {
    color: rgba(255, 255, 255, 0.6);
    padding: 10px 0px;
    font-size: 1.2rem;
    font-weight: 400;
    margin: 0;
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
    position: relative;

    &:hover {
      background-color: rgba(255, 255, 255, 0.07);
    }

    &.given-feedback {
      cursor: default;
      
      .avatar {
        cursor: pointer;
      }
    }

    .delete-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
      border: none;
      border-radius: 50%;
      color: white;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
      opacity: 0;
      transform: scale(0.8);

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 15px rgba(255, 107, 107, 0.5);
      }

      &:active {
        transform: scale(0.95);
      }
    }
    
    &:hover .delete-btn {
      opacity: 1;
      transform: scale(1);
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
      padding-right: 35px; /* Space for delete button */
      
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
