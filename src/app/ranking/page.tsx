"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyledRanking } from './Styled.ranking';
import { StaticImageData } from 'next/image';
// Components
import Card from './compoents/RankCard';
import CustomDropDown from '@/components/drop_down/dropdown';
import Profile from './compoents/profile';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@mui/material';
// Icons
import { FaSearch, FaFemale, FaMale, FaOdnoklassniki } from "react-icons/fa";
// Types
import { Promo, Cursuse } from '@/types/FortyTwo/types';
// Data
import { Campuses } from '@/data/Campuses';
import { Cursuses } from '@/data/Cursuses';
import { Promos } from '@/data/Promos';
// Utils
// import { fetchUsers } from '@/utils/fetch_users';
import { getGender } from '@/utils/get_gender';
// RQ
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Ranking: React.FC = () => {
    const { data: session } = useSession();
    const [Users, SetUsers] = useState<any[]>([]);
    const [SearchTerm, setSearchTerm] = useState<string>('');
    const [SelectedUser, SetSelectedUser] = useState<number>(0);
    const [SelectedPromo, setSelectedPromo] = useState<number>(0);
    const [SelectedGender, setSelectedGender] = useState<string>('All');

    const loggedInUserCardRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    const lastUserRef = useCallback((node: HTMLSpanElement) => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });

        if (node) observer.current.observe(node);
    }, [Users, session]);

    const handlePromoChange = (value: string) => {
        SetUsers([]);
        const promoId = parseInt(value, 10);
        setSelectedPromo(promoId);
    };

    const fetchUsers = async ({ pageParam = 1 }) => {
        const response = await fetch(`https://api.intra.42.fr/v2/cursus_users?&filter[campus_id]=21&filter[begin_at]=${Promos[SelectedPromo].start_date}&page[size]=100&page[number]=${pageParam}&sort=-level`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });
        const data = await response.json();
        return {
            data,
            nextPage: data.length > 0 ? pageParam + 1 : undefined,
        };
    };

    const {
        data,
        status,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isPending,
        isError,
    } = useInfiniteQuery({
        queryKey: ["users", SelectedPromo, session?.accessToken],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
        initialPageParam: 1,
        retry: 2,
        refetchOnWindowFocus: false, 
        enabled: session !== undefined && SelectedPromo !== undefined && SelectedPromo !== null,
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const scrollToMe = () => {
        // Scroll to the logged-in user's card if the ref exists
        if (loggedInUserCardRef.current) {
            loggedInUserCardRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        else
        {
            toast.info("You are not on the list. ensure that you have loaded all students or selected your promo.");
        }
    };

    useEffect(() => {
        if (data && session?.accessToken) {
            // Add rank to each user based on their position in the flat array
            let newUsers = data.pages.flatMap((page, pageIndex) =>
                page.data.map((user: any, userIndex: number) => ({
                    ...user,
                    originalRank: pageIndex * 100 + userIndex + 1, // Calculate rank based on page and index
                    Gender : getGender(user.user.first_name.trim())
                }))
            );
            SetSelectedUser(newUsers[0].user.id);

            if (SelectedGender !== 'All') {
                newUsers = newUsers.filter(user => {
                    // console.log(user.Gender);
                    return user.Gender === SelectedGender;
                });
            }

            // console.log(getGender("anas"));

            // Filter users based on SearchTerm
            // const filteredUsers = newUsers.filter(user =>
            //     user.user.usual_full_name.toLowerCase().includes(SearchTerm.toLowerCase())
            // );
            SetUsers(newUsers);
        }
    }, [data, session, SelectedGender]);



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
            <div className='Container'>
                {/* <Profile Promo={Promos[SelectedPromo]} user_id={SelectedUser} list_is_loading={!Users[0]}/> */}
                <div className='Ranking'>
                    <div className='Options'>
                        <div className='Filters'>
                            <div className='Select_container'>
                                <span>Promo :</span>
                                <CustomDropDown
                                    data={Promos}
                                    getValue={(item) => item.id.toString()}
                                    renderItem={(item) => item.Name}
                                    onChange={handlePromoChange}
                                />
                            </div>
                            <div className='SearchUser'>
                                <input placeholder='Search User :'
                                    value={SearchTerm}
                                    onChange={handleSearchChange}
                                >
                                </input>
                            </div>
                            <div className='GenderFilter'>
                                <div className={`Male ${SelectedGender === 'male' && 'selected'}`} onClick={()=>setSelectedGender("male")}>
                                    <FaMale className='GenderIcon' size={20}/>
                                    <span className='gender_type'>Male</span>
                                </div>
                                <div className='devider' />
                                <div className={`Female ${SelectedGender === 'female' && 'selected'}`} onClick={()=>setSelectedGender("female")}>
                                    <FaFemale className='GenderIcon' size={20}/>
                                    <span className='gender_type'>Female</span>
                                </div>
                                <div className='devider' />
                                <div className={`All ${SelectedGender === 'All' && 'selected'}`} onClick={()=>setSelectedGender("All")}>
                                    {/* <FaOdnoklassniki className='GenderIcon' size={20}/> */}
                                    <span className='gender_type'>All</span>
                                </div>
                            </div>
                            <button className='ToMeButton' onClick={scrollToMe}>Me</button>
                        </div>
                    </div>
                    <div className='Profiles_container'>
                        {
                            (isLoading || status === "pending" || !Users[0]) ?
                                <div className='Skeletons'>
                                    {Array.from({ length: 8 }).map((_, key) => (
                                        <Skeleton
                                            animation={`${key % 2 ? "pulse" : "wave"}`}
                                            variant="rectangular"
                                            width="100%"
                                            height="65px"
                                            className='CardSkl'
                                            key={key}
                                        />
                                    ))}
                                </div>
                                : Users ?
                                    <>
                                        {
                                            Users.map((User: any, key: number) => {

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
                                                        ref={User.user.email === session?.user?.email ? loggedInUserCardRef : null}
                                                    />
                                                );
                                            })
                                        }
                                        <span ref={lastUserRef} className={`FetchMore ${hasNextPage && "Animated"}`}>
                                            {hasNextPage ? "Fetching more ..." : "No More Users."}
                                        </span>
                                    </>
                                    : ""
                        }
                    </div>
                </div>
            </div>
        </StyledRanking>
    );
};

export default Ranking;

