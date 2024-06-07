"use client";
import React, { useState } from 'react';
import { StyledRanking } from './Styled.ranking';
import { StaticImageData } from 'next/image';
//Components
import Card from './compoents/card';
import CustomDropDown from '@/components/drop_down/dropdown';

// types.ts
type Profile = {
    id: number;
    FullName: string;
    UserName: string;
    img: string; //StaticImageData later.
    Rank: number;
    Level: number;
    promo: string;
};


const Promos: string[] = [
    "Black Promo",
    "Red Promo",
    "Green Promo",
    "Blue Promo"
];

const Campuses: string[] = [
    "Ben guerir",
    "Khouribga",
    "Med"
]
const Profiles: Profile[] = [
    {
        id: 1,
        FullName: "Hassan Karrach",
        UserName: "hkarrach",
        img: "https://cdn.intra.42.fr/users/a140a89b5a8e788f2f245f4c1b20e96b/hkarrach.jpeg",
        promo: "black",
        Rank: 1,
        Level: 3.4
    },
    {
        id: 2,
        FullName: "Hassan Karrach",
        UserName: "hkarrach",
        img: "https://cdn.intra.42.fr/users/a140a89b5a8e788f2f245f4c1b20e96b/hkarrach.jpeg",
        promo: "black",
        Rank: 2,
        Level: 3.4
    },
    {
        id: 3,
        FullName: "disregard",
        UserName: "hkarrach",
        img: "https://cdn.intra.42.fr/users/a140a89b5a8e788f2f245f4c1b20e96b/hkarrach.jpeg",
        promo: "black",
        Rank: 3,
        Level: 3.4
    },
    {
        id: 4,
        FullName: "Hassan Karrach",
        UserName: "hkarrach",
        img: "https://cdn.intra.42.fr/users/a140a89b5a8e788f2f245f4c1b20e96b/hkarrach.jpeg",
        promo: "black",
        Rank: 4,
        Level: 3.4
    },
    {
        id: 5,
        FullName: "Hassan Karrach",
        UserName: "hkarrach",
        img: "https://cdn.intra.42.fr/users/a140a89b5a8e788f2f245f4c1b20e96b/hkarrach.jpeg",
        promo: "black",
        Rank: 5,
        Level: 3.4
    }
];

//Banners
const BlackBanner = "https://www.shutterstock.com/shutterstock/videos/1087391348/thumb/1.jpg?ip=x480";

const Ranking = () => {
    const [selectedPromo, setSelectedPromo] = useState<string | undefined>(Promos[0]);
    const [SelectedCampus, setSelectedCampus] = useState<string | undefined>(Promos[0]);

    return (
        <StyledRanking>
            <div className='Container'>
                <div className='Profile'>
                    <div className='Profile_banner' style={{ backgroundImage: "url('https://www.shutterstock.com/shutterstock/videos/1087391348/thumb/1.jpg?ip=x480')" }}>
                        <div className='Profile_avatar' style={{ backgroundImage: "url('https://cdn.intra.42.fr/users/a140a89b5a8e788f2f245f4c1b20e96b/hkarrach.jpeg')" }} />

                        <div className='Profile_Infos'>
                            <h1 className="Profile_Full_Name">Hassan Karrach</h1>
                            <span className='Profile_UserName'>@hkarrach</span>
                        </div>

                        <div className='Profile_UserIcons'>
                            <svg className="_42logo" version="1.1" id="Calque_1" x="0px" y="0px" viewBox="0 -200 960 960" enable-background="new 0 -200 960 960">
                                <polygon id="polygon5" points="32,412.6 362.1,412.6 362.1,578 526.8,578 526.8,279.1 197.3,279.1 526.8,-51.1 362.1,-51.1   32,279.1 " />
                                <polygon id="polygon7" points="597.9,114.2 762.7,-51.1 597.9,-51.1 " />
                                <polygon id="polygon9" points="762.7,114.2 597.9,279.1 597.9,443.9 762.7,443.9 762.7,279.1 928,114.2 928,-51.1 762.7,-51.1 " />
                                <polygon id="polygon11" points="928,279.1 762.7,443.9 928,443.9 " />
                            </svg>
                        </div>

                        <div className='Profil_UserLevel'>

                        </div>
                    </div>
                </div>
                <div className='Ranking'>
                    <div className='Options'>
                        <div className='Filters'>
                            <div className='Select_container'>
                                <span>Promo :</span>
                                <CustomDropDown data={Promos} onChange={setSelectedPromo} />
                            </div>

                            <div className='Select_container'>
                                <span>Campus :</span>
                                <CustomDropDown data={Campuses} onChange={setSelectedCampus} />
                            </div>
                        </div>
                    </div>
                    {
                        Profiles.map((Profile) => {
                            return (
                                <Card key={Profile.id} id={Profile.id} FullName={Profile.FullName} UserName={Profile.UserName} Level={Profile.Level} Rank={Profile.Rank} />
                            )
                        })
                    }
                </div>
            </div>
        </StyledRanking>)
}

export default Ranking;