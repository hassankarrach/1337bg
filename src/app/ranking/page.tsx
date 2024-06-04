"use client";
import React, { useState } from 'react';
import { StyledRanking } from './Styled.ranking';

const Ranking = () => {
    const [selected_promo, Set_selected_promo] = useState(1);
    const handleChange = (event: any) => {
        Set_selected_promo(event.target.value);
    };

    return (
        <StyledRanking>
            <div className='Filter'>
                <div className='Select_container'>
                    <select className='Select_box'>
                        <option className='Select_option' value="1">Black Promo</option>
                        <option className='Select_option' value="2">Red Promo</option>
                        <option className='Select_option' value="3">Green Promo</option>
                        <option className='Select_option' value="4">Blue Promo</option>
                    </select>
                </div>
            </div>

            <div className='Table_container'>

            </div>
        </StyledRanking>)
}

export default Ranking;