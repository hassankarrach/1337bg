"use client";
import React, { useState } from 'react';
import { StyledRanking } from './Styled.ranking';
import { StaticImageData } from 'next/image';
//Components
import Card from './compoents/card';
import CustomDropDown from '@/components/drop_down/dropdown';
import Profile from './compoents/profile';

// Types
export type Promo = {
        id : number;
        Name : string;
        Prm_color : string;
        sec_color : string
}
type Profile = {
    id: number;
    FullName: string;
    UserName: string;
    img: string; //StaticImageData later.
    Rank: number;
    Level: number;
    promo: Promo;
};

// Data
const Promos: Promo[] = [
    {
        id : 0,
        Name : "Black Promo",
        Prm_color : "#000000",
        sec_color : "#343434"
    },
    {
        id : 1,
        Name : "Red Promo",
        Prm_color : "#ff6024",
        sec_color : "#ff7638"
    },
    {
        id : 2,
        Name : "Green Promo",
        Prm_color : "#6ef024",
        sec_color : "#a4ff6f"
    },
    {
        id : 3,
        Name : "Blue Promo",
        Prm_color : "#245aff",
        sec_color : "#4a76ff"
    }
];
const Campuses: { id: number; name: string }[] = [
    { id: 0, name: "Ben guerir" },
    { id: 1, name: "Khouribga" },
    { id: 2, name: "Med" }
];
const Profiles: Profile[] = [
    {
        id: 1,
        FullName: "Hassan Karrach",
        UserName: "hkarrach",
        img: "https://cdn.intra.42.fr/users/a140a89b5a8e788f2f245f4c1b20e96b/hkarrach.jpeg",
        promo: Promos[0],
        Rank: 1,
        Level: 3.4
    },
    {
        id: 2,
        FullName: "Hassan Karrach",
        UserName: "hkarrach",
        img: "https://cdn.intra.42.fr/users/a140a89b5a8e788f2f245f4c1b20e96b/hkarrach.jpeg",
        promo: Promos[0],
        Rank: 2,
        Level: 3.4
    },
    {
        id: 3,
        FullName: "disregard",
        UserName: "hkarrach",
        img: "https://cdn.intra.42.fr/users/a140a89b5a8e788f2f245f4c1b20e96b/hkarrach.jpeg",
        promo: Promos[0],
        Rank: 3,
        Level: 3.4
    },
    {
        id: 4,
        FullName: "Hassan Karrach",
        UserName: "hkarrach",
        img: "https://cdn.intra.42.fr/users/a140a89b5a8e788f2f245f4c1b20e96b/hkarrach.jpeg",
        promo: Promos[0],
        Rank: 4,
        Level: 3.4
    },
    {
        id: 5,
        FullName: "Hassan Karrach",
        UserName: "hkarrach",
        img: "https://cdn.intra.42.fr/users/a140a89b5a8e788f2f245f4c1b20e96b/hkarrach.jpeg",
        promo: Promos[0],
        Rank: 5,
        Level: 3.4
    }
];

const Ranking = () => {
    const [selectedPromo, setSelectedPromo] = useState<number>(0);
    const [SelectedCampus, setSelectedCampus] = useState<number>(0);

    // const selectedPromoObject = Promos.find(promo => promo.Name === selectedPromo);
    const handlePromoChange = (value: string) => {
        const promoId = parseInt(value, 10);
        setSelectedPromo(promoId);
    };
    
    const handleCampusChange = (value: string) => {
        const campusId = parseInt(value, 10);
        setSelectedCampus(campusId);
    };

    return (
        <StyledRanking>
            <div className='Container'>
                <Profile FullName='Hassan Karrach' UserName='@hkarrach' Promo={Promos[selectedPromo]}/>
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