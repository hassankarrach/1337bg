"use client";

import React, { use, useEffect, useState } from "react";
import { StyledLeaderboard } from "./Styled.leaderboard";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Top3 from "./components/Components/Top3";
import ForwardedRankCard from "./components/Components/RankCard";
import VsCard from "./components/Components/VsCard";
import AdminDrawer from "./components/Components/admin";
import { Player } from "./types/user";

const ge_users = async () => {
  try {
    const res = await fetch("/api/integration_week/players", {
      method: "GET",
    });

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch users");
  }
};

const Page = () => {
  const [users, setUsers] = useState<Player[]>([]);
  const [activeSection, setActiveSection] = useState("LeaderBoard");

    useEffect(() => {
    	ge_users().then((data) => {
    		if (data) {
    			setUsers(data.users);
    		}
    	});
    }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <StyledLeaderboard>
      <ToastContainer />
      <AdminDrawer isAdmin={true}/>

      <div className="Banner">
        {/* <Top3 /> */}
        <h1>Leaderboard</h1>
      </div>
      <div className="Container">
        <div className="Options">
          <div className="Switch">
            <div
              onClick={() => handleSectionChange("LeaderBoard")}
              className={`SwitchEl LeaderBoard ${
                activeSection == "LeaderBoard" && "active"
              }`}
            >
              LeaderBoard
            </div>
            <div
              onClick={() => handleSectionChange("Games")}
              className={`SwitchEl Games ${
                activeSection == "Games" && "active"
              }`}
            >
              Games
            </div>
          </div>
        </div>
        {activeSection == "LeaderBoard" && (
          <div className="Leaderboard">
            {users &&
              users.map((user: Player, index) => {
                return (
                  <ForwardedRankCard
                    id={1}
                    FullName={user.full_name}
                    Level={user.total_points_IW}
                    UserName={user.user_name}
                    nickname=""
                    Rank={user.rank}
                    img={user.image_url}
                    is_even
                    is_verified={false}
                    IsUser
                    setSelectedId={() => {}}
                  />
                );
              })}
          </div>
        )}
        {activeSection == "Games" && (
          <div className="GamesSection">
            <VsCard />
          </div>
        )}
      </div>
    </StyledLeaderboard>
  );
};

export default Page;
