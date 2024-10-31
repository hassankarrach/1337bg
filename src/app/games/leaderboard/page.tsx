"use client";

import React, { use, useEffect, useState } from "react";
import { StyledLeaderboard } from "./Styled.leaderboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Top3 from "./components/Components/Top3";
import ForwardedRankCard from "./components/Components/RankCard";
import VsCard from "./components/Components/VsCard";
import AdminDrawer from "./components/Components/admin";
import { Player } from "./types/user";
import { useSession } from "next-auth/react";

const ge_users = async () => {
  try {
    const res = await fetch(`/api/integration_week/players?timestamp=${Date.now()}`, { method: "GET" ,
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    cache: "no-store",
    });
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch users");
  }
};

const Page = () => {
  const { data: session } = useSession();
  
  const [users, setUsers] = useState<Player[]>([]);
  const [activeSection, setActiveSection] = useState("LeaderBoard");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    ge_users().then((data) => {
      if (data) setUsers(data.users);
    });
  }, []);

  const handleSectionChange = (section: string) => setActiveSection(section);
  const Top3Players = users.slice(0, 3);

  useEffect(() => {
    if (session) {
      const admins = process.env.NEXT_PUBLIC_ADMINS?.split(",") || [];
      setIsAdmin(admins.includes(session.user.login));
    }
  }, [session]);

  return (
    <StyledLeaderboard>
      <ToastContainer />
      <AdminDrawer isAdmin={isAdmin} />

      <div className="Banner">
      <Top3 users={Top3Players} />
        {/* <h1>Leaderboard</h1> */}
      </div>
      <div className="Container">
        {/* <div className="Options">
          <div className="Switch">
            <div
              onClick={() => handleSectionChange("LeaderBoard")}
              className={`SwitchEl LeaderBoard ${
                activeSection === "LeaderBoard" && "active"
              }`}
            >
              LeaderBoard
            </div>
            <div
              onClick={() => handleSectionChange("Games")}
              className={`SwitchEl Games ${
                activeSection === "Games" && "active"
              }`}
            >
              Games
            </div>
          </div>
        </div> */}
        {activeSection === "LeaderBoard" && (
          <div className="Leaderboard">
            {users.map((user: Player, index) => (
              <ForwardedRankCard
                key={index}
                id={1}
                FullName={user.full_name}
                Level={user.total_points_IW}
                UserName={user.user_name}
                nickname=""
                Rank={user.rank}
                img={user.image_url}
                is_even={index % 2 === 0}
                is_verified={false}
                IsUser
                setSelectedId={() => {}}
              />
            ))}

            {
              Array.from({ length: 40 - users.length }).map((_, index) => (
                <ForwardedRankCard
                  key={index}
                  id={1}
                  FullName=""
                  Level={0}
                  UserName=""
                  nickname=""
                  Rank={0}
                  img=""
                  is_even={index % 2 === 0}
                  is_verified={false}
                  IsUser
                  setSelectedId={() => {}}
                />
              ))
            }
          </div>
        )}
        {activeSection === "Games" && (
          <div className="GamesSection">
            <VsCard />
          </div>
        )}
      </div>
    </StyledLeaderboard>
  );
};

export default Page;
