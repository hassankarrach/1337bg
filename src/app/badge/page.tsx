"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
import Badge from "./components/Badge";
import { useSession } from "next-auth/react";

const StyledBadgePage = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--main_background);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  h1 {
    color: white;
  }
  .Container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 80%;
    h1 {
      color: white;
    }
    /* flex-direction: column; */
    .badge_settings {
      padding: 10px;
      .badge_settings__form {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: flex-start;
        gap: 3px;
        h2 {
          margin-bottom: 15px;
        }
        input {
          width: 300px;
          outline: none;
          border: none;
          background-color: rgba(44, 44, 48, 0.9);
          padding: 10px 6px;
          border-radius: 5px;
        }
        button {
          width: 300px;
          padding: 5px;
          height: 40px;
          background-color: var(--main_color_light);
          outline: none;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }
`;

const page = () => {
  const { data: session } = useSession();
  const [banner_url, setBannerUrl] = React.useState<string>(
    "https://media.tenor.com/Zlq493uaVWcAAAAM/u-got-that.gif"
  );
  const [avatar_url, setAvatarUrl] = React.useState<string>(
    "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
  );
  const [fullname, setFullname] = React.useState<string>("");
  const [level, setLevel] = React.useState<number>(0);
  const [login, setLogin] = React.useState<string>("");
  const [mail, setMail] = React.useState<string>("");
  const [cursus_id, setCursusId] = React.useState<number>(0);
  const [joined_year, setJoinedYear] = React.useState<string>("");
  const [nickname, setNickname] = React.useState<string>("");
  const [linkedin_url, setLinkedinUrl] = React.useState<string>("");
  const [github_url, setGithubUrl] = React.useState<string>("");
  const [twitter_url, setTwitterUrl] = React.useState<string>("");

  useEffect(() => {
    if (session) {
      console.log(session);
      setFullname(session.user.name);
      setAvatarUrl(
        session.user.image ||
          "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
      );
      setLogin(session.user.login);
      setMail(session.user.email);
      setCursusId(session.user.main_cursus);
      setLevel(parseInt(session.user.user_level, 10));
      const year = new Date(session.user.start_year).getUTCFullYear();
      setJoinedYear(year.toString());
    }
  }, [session, banner_url]);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  return (
    <StyledBadgePage>
      <h1>Get your digital badge.</h1>

      <div className="Container">
        <div className="badge_settings">
          <div className="badge_settings__form">
            <h2>Badge Settings</h2>
            <input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e: any) => {
                setNickname(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Banner url (.gif, .jpg, .png)"
              // value={banner_url}
              onChange={(e: any) => {
                setBannerUrl(e.target.value);
              }}
            />
            <input type="text" placeholder="Linkedin url" />
            <input type="text" placeholder="Github url" />
            <input type="text" placeholder="Twitter url" />
            <button>Generate Badge</button>
          </div>
        </div>

        <div>
          <h3>Preview :</h3>
          <Badge
            avatar_url={avatar_url}
            banner_url={banner_url}
            full_name={fullname}
            login={login}
            email={mail}
            cursus={
              cursus_id === 21
                ? "Main cursus"
                : cursus_id === 9
                ? "Pool"
                : "Advanced cursus"
            }
            join_date={joined_year}
            campus="Benguerir"
            level={level}
            nickname={nickname}
            github_link={github_url}
            linkedin_link={linkedin_url}
            twitter_link={twitter_url}
          />
        </div>
      </div>
    </StyledBadgePage>
  );
};

export default page;
