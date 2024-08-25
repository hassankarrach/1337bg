import React, { useEffect } from "react";
import styled from "styled-components";
import CustomModal from "../modal/modal";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import useInvalidateUserCache from "@/hooks/useInvalidateCache";

const StyledGetVerified = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .CloseIcon_elghalaba {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 1.2rem;
    font-weight: 600;
    color: red;
    opacity: 0.5;
    font-family: var(--main_font);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
      opacity: 0.8;
    }
  }

  .Intro {
    width: 400px;
    display: flex;
    flex-direction: column;
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

interface Props {
  open: boolean;
  onClose: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const GetVerified: React.FC<Props> = ({ open, onClose, setIsOpen }) => {
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



  const handleCreateUser = async () => {
    if (session) {
      try {
        const res = await fetch("/api/students/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // pass the nickname and bannerUrl to the server
          body: JSON.stringify({ nickname, bannerUrl }),
        });
        const data = await res.json();
        if (data.status === 200) {
          // Successfully created user
          session.user.verified = true;
          invalidateUserCache(); // so, the data will be refetched with the new user props.
          await signIn("42-school", { redirect: false });
          setIsOpen(false);
          toast.success("You are now verified!");
        } else {
          toast.info(data.error);
        }
      } catch (error: any) {
        if (error.status === 400) {
          toast.error(error.message);
          return;
        } else {
          toast.error("Error getting verified.");
        }
        return;
      }
    } else {
      toast.error("Please login first!");
    }
  };

  const handleGetVerified = () => {
    // Perform get verified action
    handleCreateUser();
  };

  return (
    <CustomModal open={open} onClose={onClose}>
      <StyledGetVerified>
        <span className="CloseIcon_elghalaba" onClick={() => setIsOpen(false)}>
          X
        </span>
        <div className="Intro">
          <h1>Get Verified</h1>
          <p>Get verified to get more features</p>
        </div>

        <div className="Extras">
          <input
            type="text"
            placeholder="Nickname (optional)"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <input
            type="text"
            placeholder="Banner url (.gif, .jpeg, .png)"
            value={bannerUrl}
            onChange={handleBannerUrlChange}
          />
        </div>

        <button className="GetVerifiedButton" onClick={handleGetVerified}>
          Get Verified
        </button>
      </StyledGetVerified>
    </CustomModal>
  );
};

export default GetVerified;
