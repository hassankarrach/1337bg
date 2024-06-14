"use client";
import React, { useState, useEffect } from 'react';
import { StyledRanking } from './Styled.ranking';
import { StaticImageData } from 'next/image';
//Components
import Card from './compoents/RankCard';
import CustomDropDown from '@/components/drop_down/dropdown';
import Profile from './compoents/profile';
import { useSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import { Skeleton } from '@mui/material';

// Types
export type Promo = {
    id: number;
    Name: string;
    Prm_color: string;
    sec_color: string
}
type Profile = {
    id: number;
    first_name: string;
    last_name: string;
    Login: string;
    email: string;
    img_small: string; //StaticImageData later.
    img_large: string;
    location: string;
    correction_points: number;
    wallet: number;
    Rank: number;
    Level: number;
    pool_month: string;
    pool_year: string;
    promo: Promo;
};
type Cursuse = {
    CursusId: number,
    CursusName: string
}
// Data
const Promos: Promo[] = [
    {
        id: 0,
        Name: "Black Promo",
        Prm_color: "#000000",
        sec_color: "#343434"
    },
    {
        id: 1,
        Name: "Red Promo",
        Prm_color: "#ff6024",
        sec_color: "#ff7638"
    },
    {
        id: 2,
        Name: "Green Promo",
        Prm_color: "#6ef024",
        sec_color: "#a4ff6f"
    },
    {
        id: 3,
        Name: "Blue Promo",
        Prm_color: "#245aff",
        sec_color: "#4a76ff"
    }
];
const Campuses: { id: number; name: string }[] = [
    { id: 21, name: "Ben guerir" },
    { id: 16, name: "Khouribga" },
    { id: 55, name: "Med" }
];
const Cursuses: Cursuse[] = [
    { CursusId: 21, CursusName: "Cursuse" },
    { CursusId: 9, CursusName: "Pool" }
];

const Ranking = () => {
    const { data: session } = useSession();
    const [FilteredProfiles, setFilteredProfiles] = useState<Profile[]>();
    const [SelectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [selectedPromo, setSelectedPromo] = useState<number>(0);
    const [SelectedCampus, setSelectedCampus] = useState<number>(Campuses[0].id);
    const [IsLoading, setIsLoading] = useState<boolean>(true);


    // const selectedPromoObject = Promos.find(promo => promo.Name === selectedPromo);
    const handlePromoChange = (value: string) => {
        const promoId = parseInt(value, 10);
        setSelectedPromo(promoId);
    };
    const handleCampusChange = (value: string) => {
        const campusId = parseInt(value, 10);
        setSelectedCampus(campusId);
    };
    const toggleLoading = () => {
        setIsLoading((prev) => !prev);
    };


    useEffect(() => {
        if (session && session.accessToken) {
            setIsLoading(true);
            const campusId = SelectedCampus; // Assuming SelectedCampus contains the campus ID you want to fetch students from
            fetch(`https://api.intra.42.fr/v2/campus/${campusId}/users`, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    setFilteredProfiles(data);
                    setSelectedProfile(data[0]);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [session, SelectedCampus]);


    return (
        <StyledRanking>
            <div className='Container'>
                <Profile
                    Avatar={SelectedProfile?.image.versions.small}
                    is_Loading={IsLoading}
                    FullName='Hassan Karrach'
                    UserName='@hkarrach'
                    Promo={Promos[selectedPromo]}
                />
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

                            <div className='Select_container'>
                                <span>Campus :</span>
                                <CustomDropDown
                                    data={Campuses}
                                    getValue={(item) => item.id.toString()}
                                    renderItem={(item) => item.name}
                                    onChange={handleCampusChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='Profiles_container'>
                        {
                            FilteredProfiles ? FilteredProfiles.slice(0, 16).map((profile, key) => {
                                return (
                                    <Card
                                        id={key + 1}
                                        FullName={profile.first_name + " " + profile.last_name}
                                        Level={profile.Level}
                                        Rank={key + 1}
                                        UserName={profile.Login}
                                        img={profile.image.versions.small}
                                        key={key}
                                    />
                                )
                            })
                                : <div className='Skeletons'>
                                    {Array.from({ length: 8 }).map((item, key) => (
                                        <Skeleton
                                            key={key} // generate a unique key for each Skeleton
                                            className='Skeleton'
                                            animation="wave"
                                            variant="rectangular"
                                            width="100%"
                                            height="65px"
                                        />
                                    ))}
                                </div>
                        }
                    </div>
                </div>
            </div>
        </StyledRanking>)
}

export default Ranking;