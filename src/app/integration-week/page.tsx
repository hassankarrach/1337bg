"use client";

import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import { StyledPage } from "./page.styled";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession, signIn } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { get_last_joined } from "./utils/user_utils";
import { db } from "../../../lib/db";

// User type
interface User {
  user_name: string;
  image_url: string;
}

const Page = () => {
  const { data: session } = useSession();
  const [Users, setUsers] = useState<User[]>([]);
  const [UsersCount, setUsersCount] = useState(0);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const handle_register = async () => {
    const callbackUrl = "/integration-week?redirected_to_join=true";
    if (!session) {
    	await signIn("42-school", { callbackUrl });
    	return;
    }
	const loadingToastId = toast.loading("Joining...");

    const res = await fetch("/api/integration_week/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await res.json();

    if (data.error) toast.update(loadingToastId, {
		render: data.error,
		type: "error",
		isLoading: false,
		autoClose: 3000,
	});
    else toast.update(loadingToastId, {
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
		const res = await fetch("/api/integration_week/players", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${session?.accessToken}`,
			},
		});

		const data = await res.json();
		setUsers(data.users);
		setUsersCount(data.users.length);
		//check if the user in the list
		setIsUserRegistered(data.users.find((user: User) => user.user_name === session?.user?.login));
	} catch (error) {
		console.log(error);
	}
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirected_to_join = urlParams.get("redirected_to_join");
    if (redirected_to_join && session) {
      toast.info("You signed in successfully. Joining...");
      handle_register();
    }
  }, [session]);

  useEffect(() => {
	// extract the query params
	if (session) get_last_joined_users();
  }, [session]);

  return (
    <StyledPage>
      <ToastContainer />
      <div className="Left"></div>
      <div className="Right">
        <h1>Integration Week</h1>
        <p>
          Integration Week is a week-long event. It is a great opportunity for
          you to meet your fellow peers and get to know the school and the
          university. During Integration Week, you will take part in a variety
          of activities, such as in-campus games, sports events, and parties.
          You will also have the chance to win prizes. Integration Week is a fun
          and exciting way to start your time at 1337.
        </p>

        <div className="Bottom">
          <button className="JoinButton" onClick={handle_register} disabled={isUserRegistered}>
            {isUserRegistered ? "Joined" : "Join"}
            <FaSignInAlt style={{ marginLeft: "10px" }} />
          </button>
          <div className="LastJoined">
            <div className="AvatarsGrp">
              {Users[0] && <div className="Avatar" style={{backgroundImage : `url(${Users[0].image_url})`}}></div>}
			  {Users[1] && <div className="Avatar" style={{backgroundImage : `url(${Users[1].image_url})`}}></div>}
			  {Users[2] && <div className="Avatar" style={{backgroundImage : `url(${Users[2].image_url})`}}></div>}

			  {
				UsersCount > 3 && <div className="Avatar Last">+{UsersCount}</div>
			  }
            </div>

            {UsersCount > 0 && <p>{UsersCount} students have joined.</p>}
          </div>
        </div>
      </div>
    </StyledPage>
  );
};

export default Page;
