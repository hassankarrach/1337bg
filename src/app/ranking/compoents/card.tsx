import React, {FC} from 'react';
import styled from 'styled-components';
// TOP3 icons.
import First_icon from "../../../../public/assets/icons/1.png"
import Sec_icon from "../../../../public/assets/icons/2.png"
import Third_icon from "../../../../public/assets/icons/3.png"

interface StyledProps{
    Rank : number;
}

const StyledCard = styled.div<StyledProps>`
    width : 100%;
    height: 65px;
    background-color : white;
    border-left : 4px solid ${props => (props.Rank == 1 || props.Rank == 2 || props.Rank == 3) ? "#FFD700"
    : "var(--border_grey)"};
    border-right : 1px solid var(--border_grey);
    border-bottom : 1px solid var(--border_grey);
    border-top : 1px solid var(--border_grey);
    border-radius : 5px;
    display : flex;
    cursor: pointer;
    position : relative;
    transition : 0.3s ease-in-out;
    &:hover
    {
        box-shadow: ${props => (props.Rank == 1 || props.Rank == 2 || props.Rank == 3) ? "rgb(255, 215, 0, 0.1)" : "rgba(0, 0, 0, 0.1)"} 
        0px 1px 3px 0px, 
        ${props => (props.Rank == 1 || props.Rank == 2 || props.Rank == 3) ? "rgb(255, 215, 0, 0.4)" : "rgba(0, 0, 0, 0.1)"}
        0px 1px 2px 0px;
    }


    .Card_Avatar{
        width: 60px;
        height : 100%;
        position : relative;
        background-color : gray;
        /* transform: skewX(-15deg); */
        background-image : url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
        background-position : center;
        background-size : cover;
        overflow : hidden;
    }
    .Card_Rank{
        width : 50px;
        height :100%;
        display : flex;
        justify-content  :center;
        align-items : center;
        .Rank_icon{
            width : 25px;
        }
        span{
            position : absolute;
            font-family: "Poppins", sans-serif;
            font-weight : 500;
            font-size : 1.2rem;
        }
    }
    .Card_Data{
        margin-left : 10px;
        font-family: "Poppins", sans-serif;
        height : 100%;
        display : flex;
        flex-direction : column;
        justify-content : center;
        align-items : flex-start;
        h1{
            font-size : 1.1rem;
            font-weight: 400;
            font-style: normal;
        }
        .Card_UserName{
            font-size : 0.8rem;
            font-weight : 300;
        }
    }
    .Card_level{
        position : absolute;
        right : 10px;
        height : 100%;
        display : flex;
        justify-content :center;
        align-items : center;
        span{
            font-size : 1rem;
            font-weight :300;
        }
    }
`


interface Profile{
    id : number;
    FullName : string;
    UserName : string;
    Rank : number;
    Level : number;
}

const card:FC<Profile> = ({id, FullName, UserName, Rank, Level}) => {
    return <StyledCard Rank = {Rank}>
        <div className='Card_Rank'>
            {/* <div className="arrow-right"></div> */}
            {(Rank >= 1 && Rank <= 3) ? 
                <img className='Rank_icon' src={`/assets/icons/${Rank}.png`}/>
                : <span>{Rank}</span>
            }
        </div>
        <div className='Card_Avatar'>
        </div>

        <div className='Card_Data'>
            <h1 className='Card_FullName'>{FullName}</h1>
            <h2 className='Card_UserName'>{UserName}</h2>
        </div>

        <div className='Card_level'>
            <span>{Level}</span>
        </div>
    </StyledCard>;
}

export default card;