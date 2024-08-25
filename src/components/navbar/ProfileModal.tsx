import React, { use, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomModal from "../modal/modal";
import { signIn, useSession } from "next-auth/react";
import { FaCheckSquare as VerifiedIcon } from "react-icons/fa";
import { toast } from "react-toastify";
import { to } from "@react-spring/web";
import useInvalidateUserCache from "@/hooks/useInvalidateCache";

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
    gap: 5px;
    margin-top: 20px;
    input {
      height: 35px;
      width: 100%;
      border-radius: 5px;
      border: 1px solid var(--Par_grey);
      color: var(--Par_grey);
      outline: none;
      padding: 0 10px;
      &::placeholder {
        color: var(--Par_grey);
        opacity: 0.7;
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

  const handleUpdateProfile = async () => {
    if (!session?.user.verified) {
      toast.error("You need to be verified to update your profile.");
      return;
    }
    if (!session) return;
    try {
      const res = await fetch("/api/students/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, bannerUrl }),
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
            <label>nickname :</label>
            <input
              type="text"
              placeholder="Nickname (optional)"
              value={nickname}
              onChange={handleNicknameChange}
            />
            <label>banner url :</label>
            <input
              type="text"
              placeholder="Banner url (.gif, .jpeg, .png)"
              value={bannerUrl}
              onChange={handleBannerUrlChange}
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
