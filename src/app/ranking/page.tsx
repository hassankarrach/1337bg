"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyledRanking } from "./Styled.ranking";
// Components
import Card from "./compoents/RankCard";
import CustomDropDown from "@/components/drop_down/dropdown";
import Profile from "./compoents/profile";
import { useSession } from "next-auth/react";
import { Skeleton } from "@mui/material";

// Data
import { Campuses, Filters } from "@/data/Campuses";
import { Promos } from "@/data/Promos";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSessionEnd from "@/hooks/useSessionEnd";
import LevelCalculator from "./compoents/LevelCalculator/LevelCalculator";

import _Tom from "../../../public/tom.png";
import Logtime from "./compoents/LogTime/Logtime";
import Stats from "./compoents/stats/Stats";
import { FaDiscord } from "react-icons/fa";
import Banner from "./compoents/Banner/Banner";

const Ranking: React.FC = () => {
  const { data: session } = useSession();
  const [Users, SetUsers] = useState<any[]>([]);
  const [SearchTerm, setSearchTerm] = useState<string>("");
  const [SelectedUser, SetSelectedUser] = useState<any>();
  const [SelectedPromo, setSelectedPromo] = useState<number>(0);
  const [SelectedGender, setSelectedGender] = useState<string>("All");

  useSessionEnd();

  const loggedInUserCardRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const [SelectedCampus, setSelectedCampus] = useState<number>(75); // default bg

  const lastUserRef = useCallback(
    (node: HTMLSpanElement) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [Users, session]
  );

  const handlePromoChange = (value: string) => {
    SetUsers([]);
    setSelectedGender("All");
    const promoId = parseInt(value, 10);
    setSelectedPromo(promoId);
    console.log(SelectedPromo);
    window.scrollTo(0, 0);
  };

  const fetchUsers = async ({ pageParam = 1 }) => {
    try {
      const response = await fetch(
        `/api/students?started_date=${Promos[SelectedPromo].start_date}&campus_id=${SelectedCampus}&page=${pageParam}&alumni=true`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Students.");
      }

      const data = await response.json();
      return {
        data: data,
        nextPage: data.length > 0 ? pageParam + 1 : undefined,
      };
    } catch (error) {
      toast.error("Error fetching Students, trying again...", { icon: false });
      throw error;
    }
  };

  const handleInvite = () => {
    window.open("https://discord.gg/5cZfS8djyg");
  };

  const { data, status, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["users", SelectedPromo, SelectedCampus, session?.accessToken],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
      initialPageParam: 1,
      retry: 1,
      refetchOnWindowFocus: false,
      enabled:
        session !== undefined &&
        SelectedPromo !== undefined &&
        SelectedPromo !== null,
    });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const scrollToMe = () => {
    // Scroll to the logged-in user's card if the ref exists
    if (loggedInUserCardRef.current) {
      loggedInUserCardRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      toast.error(
        "📋 You are not on the list. ensure that you have loaded all students or selected your promo.",
        {
          icon: false,
        }
      );
    }
  };

  const updateSelectedUserById = (userId: number) => {
    const foundUser = capZero.find((user) => user.user.id === userId);
    if (foundUser) {
      SetSelectedUser(foundUser);
    }
  };

  const Captain = {
    user: {
      id: -1,
      usual_full_name: "Captain",
      login: "Captain",
      email: "Captain@1337.ma",
      image: { versions: { small: "/captain.jpg" } },
      intra_link: "https://github.com/AchrafMez",
    },
    banner_url : "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjMydjc4cnloZGZzdWw5MHRpbTNmMjRsMHI0ZmpjcGMzOXRnbXJsbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XVnd9bARlKj3W/giphy.gif",
    nickname: "Captain",
    level: 99,
    originalRank: 0,
    verified: true,
    Gender: "unknown",
  };

  const boxee = {
    user: {
      id: -1,
      usual_full_name: "! 𝐵 𝒪 𝒳𝐸𝐸",
      login: "Boxee",
      email: "boxee@1337.ma",
      image: {
        versions: {
          small:
            "https://i.pinimg.com/736x/b7/45/c0/b745c0016e41ef445fcde153c334b7a0.jpg",
        },
      },
      nickname: "Boxee",
      level: 42,
      originalRank: 0,
      verified: true,
      Gender: "unknown",
    },
  };

  const Zero = {
    user: {
      id: -2,
      usual_full_name: "Zero",
      login: "Zero",
      email: "Zero@1337.ma",
      image: { versions: { small: "/Zero.jpeg" } },
      intra_link: "https://github.com/AchrafMez",
    },
    nickname: "Zero",
    level: -1337.42,
    originalRank: 42,
    verified: true,
    Gender: "unknown",
    intra_link: "https://github.com/AchrafMez",
  };

  useEffect(() => {
    if (data && session?.accessToken) {
      const newUsers = data.pages.flatMap((page) => page.data);

      const filteredUsers = newUsers.filter((user) => {
        const matchesGender =
          SelectedGender === "All" || user.Gender === SelectedGender;
        const matchesSearchTerm =
          SearchTerm === "" ||
          user.user?.usual_full_name
            ?.toLowerCase()
            .includes(SearchTerm.toLowerCase()) ||
          user.user?.login?.toLowerCase().includes(SearchTerm.toLowerCase()) ||
          user.nickname?.toLowerCase().includes(SearchTerm.toLowerCase());
        return matchesGender && matchesSearchTerm;
      });

      SetSelectedUser(filteredUsers[0]);
      SetUsers(filteredUsers);
    }
  }, [data, session, SelectedGender, SearchTerm]);

  let capZero = Users;
  if (SelectedCampus === 16 || SelectedCampus === 55) {
    capZero = [Captain, ...Users];
  } else if (SelectedCampus === 21) {
    capZero = [...Users, Zero];
  }

  return (
    <StyledRanking>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="foo"
      />

      <div className="Container">
        <div className="LeaderBoardContainer">
          <div className="Ranking">
            <div className="Options">
              <div className="Filters">
                <div className="Select_container">
                  <CustomDropDown
                    data={Promos}
                    getValue={(item) => item.id.toString()}
                    renderItem={(item) => item.Name}
                    onChange={handlePromoChange}
                  />
                  <CustomDropDown
                    data={Campuses}
                    getValue={(item) => item.id.toString()}
                    renderItem={(item) => item.name}
                    onChange={(value) => {
                      setSelectedCampus(Number(value));
                      SetUsers([]);
                      window.scrollTo(0, 0);
                    }}
                  />
                  {/* </div> */}
                  {/* <div className="HideIt"> */}
                  <CustomDropDown
                    data={Filters}
                    getValue={(item) => item.id.toString()}
                    renderItem={(item) => `${item.name}`}
                    onChange={() => {}}
                    // disabled
                  />
                  {/* </div> */}
                </div>
                <div className="Other_filters">
                  <div className="SearchUser">
                    <input
                      placeholder="Search User :"
                      // value={SearchTerm}
                      onChange={handleSearchChange}
                    ></input>
                  </div>
                  <div className="GenderFilter">
                    <div
                      className={`Male ${
                        SelectedGender === "male" && "selected"
                      }`}
                      onClick={() => setSelectedGender("male")}
                    >
                      <span className="gender_type">Male</span>
                    </div>
                    <div className="devider" />
                    <div
                      className={`Female ${
                        SelectedGender === "female" && "selected"
                      }`}
                      onClick={() => setSelectedGender("female")}
                    >
                      <span className="gender_type">Female</span>
                    </div>
                    <div className="devider" />
                    <div
                      className={`All ${
                        SelectedGender === "All" && "selected"
                      }`}
                      onClick={() => setSelectedGender("All")}
                    >
                      <span className="gender_type">All</span>
                    </div>
                  </div>
                  <button className="ToMeButton" onClick={scrollToMe}>
                    Me
                  </button>
                </div>
              </div>
            </div>

            <div className="Profiles_container">
              {isLoading || status === "pending" || !Users[0] ? (
                <div className="Skeletons">
                  {Array.from({ length: 15 }).map((_, key) => (
                    <Skeleton
                      animation={`${key % 2 ? "pulse" : "wave"}`}
                      variant="rectangular"
                      width="100%"
                      height="65px"
                      className="CardSkl"
                      key={key}
                    />
                  ))}
                </div>
              ) : Users ? (
                <>
                  {capZero.map((User: any, key: number) => {
                    if (!User || !User.user) return null;
                    // if (User.Gender === "unknown") console.log(User);

                    return (
                      <Card
                        id={User.user.id}
                        FullName={User.user.usual_full_name}
                        nickname={User.nickname}
                        Level={User.level}
                        Rank={User.originalRank}
                        UserName={User.user.login}
                        img={User.user.image.versions.small}
                        key={key}
                        setSelectedId={updateSelectedUserById}
                        IsUser={User.user.email === session?.user?.email}
                        ref={
                          User.user.email === session?.user?.email
                            ? loggedInUserCardRef
                            : null
                        }
                        is_even={!(key % 2)}
                        is_verified={User.verified}
                      />
                    );
                  })}
                  <span
                    ref={lastUserRef}
                    className={`FetchMore ${hasNextPage && "Animated"}`}
                  >
                    {hasNextPage ? "Fetching more ..." : "No More Users."}
                  </span>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="ProfileContainer">
          {/* <Banner />  */}
          <Profile
            Promo={Promos[SelectedPromo]}
            list_is_loading={!Users[0]}
            StudentData={SelectedUser}
          />
          {/* <Stats /> */}
          {/* <LevelCalculator user_level={Number(session?.user.user_level) || 0} /> */}
          {/* <Logtime /> */}
          {/* <div className="_13Hub">
            <h1 className="Header">
              join <img src="/13HUB.png" className="_13HubLogo" />
            </h1>
            <span>Meet others. Share the journey. Go further, together.</span>
            <button onClick={handleInvite}
             style={{
              cursor: 'pointer',
              zIndex: 2}}>
              <FaDiscord />
              Join
            </button>
          </div> */}
        </div>
      </div>
    </StyledRanking>
  );
};

export default Ranking;
