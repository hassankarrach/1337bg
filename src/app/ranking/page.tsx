"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyledRanking } from "./Styled.ranking";
import { StaticImageData } from "next/image";
// Components
import Card from "./compoents/RankCard";
import CustomDropDown from "@/components/drop_down/dropdown";
import Profile from "./compoents/profile";
import { useSession } from "next-auth/react";
import { Skeleton } from "@mui/material";
// Icons
import { FaSearch, FaFemale, FaMale, FaOdnoklassniki } from "react-icons/fa";
// Types
import { Promo, Cursuse } from "@/types/FortyTwo/types";
// Data
import { Campuses } from "@/data/Campuses";
import { Cursuses } from "@/data/Cursuses";
import { Promos } from "@/data/Promos";
// Utils
// import { fetchUsers } from '@/utils/fetch_users';
import { getGender } from "@/utils/get_gender";
// RQ
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InitialUsers } from "@/data/Fake";

const Ranking: React.FC = () => {
  const { data: session } = useSession();
  const [Users, SetUsers] = useState<any[]>([]);
  const [SearchTerm, setSearchTerm] = useState<string>("");
  const [SelectedUser, SetSelectedUser] = useState<number>(0);
  const [SelectedPromo, setSelectedPromo] = useState<number>(0);
  const [SelectedGender, setSelectedGender] = useState<string>("All");

  const loggedInUserCardRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

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
  };

  const fetchUsers = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `/api/students?started_date=${Promos[SelectedPromo].start_date}&page=${pageParam}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    const data = await response.json();

    const usersWithRankAndGender = data.map((user: any, index: number) => ({
      ...user,
      originalRank: (pageParam - 1) * 100 + index + 1,
      Gender: getGender(user.user.first_name.trim()),
    }));

    return {
      data: usersWithRankAndGender,
      nextPage: data.length > 0 ? pageParam + 1 : undefined,
    };
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["users", SelectedPromo, session?.accessToken],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
    initialPageParam: 1,
    // retry: 2,
    // refetchOnWindowFocus: false,
    enabled:
      session !== undefined &&
      SelectedPromo !== undefined &&
      SelectedPromo !== null,
  });

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  const scrollToMe = () => {
    // Scroll to the logged-in user's card if the ref exists
    if (loggedInUserCardRef.current) {
      loggedInUserCardRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      toast.info(
        "You are not on the list. ensure that you have loaded all students or selected your promo."
      );
    }
  };

  
  useEffect(() => {
    //Filter By Gender ===========================
    if (SelectedGender !== 'All' && data) {
      SetUsers([]);
      const newUsers = data.pages.flatMap(page => page.data);
      const FilteredUsers = newUsers.filter(user => {
            // console.log(user.Gender);
            return user.Gender === SelectedGender;
      });
      SetUsers(FilteredUsers);
    }
    //=============================================

  }, [SelectedGender])

  useEffect(() => {
    if (data && session?.accessToken) {
      const newUsers = data.pages.flatMap(page => page.data);
      // SetSelectedUser(newUsers[0].user.id);
      
      // Filter By search ===========================
      //   const filteredUsers = newUsers.filter(user =>
      //       user.user.usual_full_name.toLowerCase().includes(SearchTerm.toLowerCase())
      //   );
      //=============================================
      SetUsers(newUsers);
    }
  }, [data, session]);

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
        // transition:Bounce,
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
                </div>
                <div className="SearchUser">
                  <input
                    placeholder="Search User :"
                    // value={SearchTerm}
                    // onChange={handleSearchChange}
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
                    className={`All ${SelectedGender === "All" && "selected"}`}
                    onClick={() => setSelectedGender("All")}
                  >
                    <span className="gender_type">All</span>
                  </div>
                </div>
                <button
                  className="ToMeButton"
                  onClick={scrollToMe}
                >
                  Me
                </button>
              </div>
            </div>

            <div className="Profiles_container">
              {isLoading || status === "pending" || !Users[0] ? (
                <div className="Skeletons">
                  {Array.from({ length: 11 }).map((_, key) => (
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
                  {Users.map((User: any, key: number) => {
                    return (
                      <Card
                        id={User.user.id}
                        FullName={User.user.usual_full_name}
                        Level={User.level}
                        Rank={User.originalRank}
                        UserName={User.user.login}
                        img={User.user.image.versions.small}
                        key={key}
                        setSelectedId={SetSelectedUser}
                        IsUser={User.user.email === session?.user?.email}
                        ref={
                          User.user.email === session?.user?.email
                            ? loggedInUserCardRef
                            : null
                        }
                        is_even = {!(key % 2)}
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
          <Profile
            Promo={Promos[SelectedPromo]}
            user_id={SelectedUser}
            list_is_loading={!Users[0]}
          />
        </div>
      </div>
    </StyledRanking>
  );
};

export default Ranking;
