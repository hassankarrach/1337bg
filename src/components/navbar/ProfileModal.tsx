import React, { use, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomModal from "../modal/modal";
import { signIn, useSession } from "next-auth/react";
import { FaCheckSquare as VerifiedIcon } from "react-icons/fa";
import { toast } from "react-toastify";
import { to } from "@react-spring/web";
import useInvalidateUserCache from "@/hooks/useInvalidateCache";
import BioEditor from "@/components/bio_editor/BioEditor";

interface Props {
  open: boolean;
  onClose: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface StyledProfileModalProps {
  $banner_url: string | undefined;
}
const StyledProfileModal = styled.div<StyledProfileModalProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .CloseIcon_elghalaba {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 1.2rem;
    font-weight: 600;
    color: red;
    opacity: 0.5;
    font-family: var(--main_font);
    z-index : 999;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
      opacity: 0.8;
    }
  }

  .User_Banner {
    width: 100%;
    height: 150px;
    position: sticky;
    top: 0;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--main_color_light);
    position: relative;

    &:after {
      width: 100%;
      height: 100%;
      position: absolute;
      content: "";
      background-image: url(${(props) => props.$banner_url});
      background-size: cover;
      background-position: center;
      opacity: ${(props) => (props.$banner_url ? 1 : 0.6)};
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

  .UpdateSection {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    padding: 20px 0px;
  }
  .GetVerifiedButton {
    width: 400px;
    padding: 10px 20px;
    background-color: var(--main_color);
    color: var(--main_color_dark);
    border: 1px solid rgba(17, 136, 46, 0.3);
    border-radius: 5px;
    cursor: pointer;
    /* position : absolute;
	bottom : 20px;
	right : 20px; */
    font-weight: 600;
    font-size: 1.1rem;
  }
  .Extras {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    
    .field-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      label {
        color: black;
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
      }
      
      input {
        height: 45px;
        width: 100%;
        border-radius: 8px;
        background: rgba(33, 33, 37, 0.8);
        border: 1px solid rgba(183, 251, 43, 0.3);
        color: white;
        outline: none;
        padding: 12px;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        font-family: inherit;
        
        &:focus {
          border-color: var(--main_color);
          box-shadow: 0 0 0 2px rgba(183, 251, 43, 0.1);
        }
        
        &::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }
    
    .ErrorSpan {
      color: red;
      font-size: 1rem;
    }
  }
`;

const ProfileModal: React.FC<Props> = ({ open, onClose, setIsOpen }) => {
  const { data: session } = useSession();
  const [nickname, setNickname] = React.useState("");
  const [bannerUrl, setBannerUrl] = React.useState("");
  const [userBio, setUserBio] = React.useState<string | null>(null);
  //Hooks
  const invalidateUserCache = useInvalidateUserCache();

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleBannerUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBannerUrl(event.target.value);
  };

  const handleBioUpdate = (newBio: string) => {
    setUserBio(newBio);
  };

  const fetchUserBio = async () => {
    try {
      const response = await fetch('/api/users/bio');
      if (response.ok) {
        const data = await response.json();
        setUserBio(data.bio);
      }
    } catch (error) {
      console.error('Error fetching bio:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!session?.user.verified) {
      toast.error("You need to be verified to update your profile.");
      return;
    }
    if (!session) return;
    try {
      // Update all profile fields in a single API call
      const res = await fetch("/api/students/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          nickname, 
          bannerUrl, 
          bio: userBio?.trim() || ""
        }),
      });
      const data = await res.json();

      if (data.status === 200) {
        invalidateUserCache();
        await signIn("42-school", { redirect: false });
        toast.success("Profile updated successfully.");
        setIsOpen(false);
      } else {
        toast.info(data.error);
      }
    } catch (error: any) {
      toast.error("An error occurred while updating the profile.");
    }
  };

  useEffect(() => {
    if (session) {
      setBannerUrl(session.user.banner_url);
      setNickname(session.user.nickname);
      fetchUserBio();
    }
  }, [session]);

  return (
    <CustomModal onClose={onClose} open={open} width="500px">
      <StyledProfileModal $banner_url={bannerUrl} tabIndex={-1}>
        <span className="CloseIcon_elghalaba" onClick={() => setIsOpen(false)}>
          X
        </span>
        <div className="User_Banner">
          <div
            className="Profile_avatar"
            style={{ backgroundImage: `url(${session?.user.image})` }}
          >
            <div className="Profile_Infos">
              <h1 className="Profile_Full_Name">
                {session && nickname != "" ? nickname : session?.user.name}
                {session?.user.verified && (
                  <VerifiedIcon size={18} style={{ marginLeft: "5px" }} />
                )}
              </h1>
              <span className="Profile_UserName">{session?.user.login}</span>
            </div>
          </div>
        </div>

        <div className="UpdateSection">
          <div className="Extras">
            <div className="field-group">
              <label>Nickname</label>
              <input
                type="text"
                placeholder="Enter your nickname (optional)"
                value={nickname}
                onChange={handleNicknameChange}
                maxLength={50}
              />
            </div>
            
            <div className="field-group">
              <label>Banner URL</label>
              <input
                type="url"
                placeholder="Enter banner URL (.gif, .jpeg, .png)"
                value={bannerUrl}
                onChange={handleBannerUrlChange}
                maxLength={200}
              />
            </div>
            
            <BioEditor 
              initialBio={userBio} 
              onBioUpdate={handleBioUpdate}
              isEditable={true}
              directEdit={true}
              isOwnProfile={true}
            />
          </div>

          <button
            className="GetVerifiedButton"
            onClick={() => {
              handleUpdateProfile();
            }}
          >
            Update Profile
          </button>
        </div>
      </StyledProfileModal>
    </CustomModal>
  );
};

export default ProfileModal;
