"use client";

import React, { use, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { StyledPage } from "./page.styled";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession, signIn } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { get_last_joined } from "./utils/user_utils";
import { db } from "../../../lib/db";
import { Player } from "./leaderboard/types/user";

const Page = () => {
  const { data: session } = useSession();
  const [Users, setUsers] = useState<Player[]>([]);
  const [UsersCount, setUsersCount] = useState(0);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  // Ref to ensure URL parsing and fetching only happen once
  const hasFetchedData = useRef(false);

  const handle_register = async () => {
    const callbackUrl = "/integration-week?redirected_to_join=true";
    if (!session) {
      await signIn("42-school", { callbackUrl });
      return;
    }
    const loadingToastId = toast.loading("Joining...");

    const res = await fetch(
      `/api/integration_week/register`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    
    const data = await res.json();

    if (data.error)
      toast.update(loadingToastId, {
        render: data.error,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    else
      toast.update(loadingToastId, {
        render: "You have joined successfully.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

    setIsUserRegistered(true);
    get_last_joined_users();
  };

  const get_last_joined_users = async () => {
    try {
      //avoid caching, by adding a random query param
      const res = await fetch(`/api/integration_week/players?${Math.random()}`, {
        method: "GET",
      });

      const data = await res.json();
      setUsers(data.users);
      setUsersCount(data.users.length);

      //check if the user in the list
      setIsUserRegistered(
        data.users.find(
          (user: Player) => user.user_name === session?.user?.login
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // if (hasFetchedData.current) return;

    const urlParams = new URLSearchParams(window.location.search);
    const redirected_to_join = urlParams.get("redirected_to_join");
    if (redirected_to_join && session) {
      toast.info("You signed in successfully. Joining...");
      handle_register();
      // remove the query param
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // hasFetchedData.current = true;
  }, [session]);


  useEffect(() => {
    // extract the query params
    get_last_joined_users();
  }, [session]);

  return (
    <StyledPage>
      <ToastContainer />

      <div className="Left"></div>
      <div className="Right">
        <h1 className="title">Terrain games</h1>
        <p>
        Terrain Games is an exciting event during Integration Week where peers compete in various games on a stadium pitch. Participants earn points by playing different challenges, fostering teamwork and friendly competition. The top scorers on the leaderboard will win fantastic prizes, making it a thrilling experience for everyone involved!
        </p>

        <div className="Bottom">
          <button
            className="JoinButton"
            onClick={handle_register}
            disabled={isUserRegistered}
          >
            {isUserRegistered ? "Joined" : "Join"}
            <FaSignInAlt style={{ marginLeft: "10px" }} />
          </button>
          <div className="LastJoined">
            <div className="AvatarsGrp">
              {Users && Users[0] && (
                <div
                  className="Avatar"
                  style={{ backgroundImage: `url(${Users[0].image_url})` }}
                ></div>
              )}
              {Users && Users[1] && (
                <div
                  className="Avatar"
                  style={{ backgroundImage: `url(${Users[1].image_url})` }}
                ></div>
              )}
              {Users && Users[2] && (
                <div
                  className="Avatar"
                  style={{ backgroundImage: `url(${Users[2].image_url})` }}
                ></div>
              )}

              {UsersCount > 3 && (
                <div className="Avatar Last">+{UsersCount}</div>
              )}
            </div>

            {UsersCount > 0 && <p>{UsersCount} students have joined.</p>}
          </div>
        </div>
      </div>
    </StyledPage>
  );
};

export default Page;
