import { useSession } from 'next-auth/react';
import React, { FC, forwardRef, Ref } from 'react';
import styled from 'styled-components';

interface StyledProps {
    Rank: number;
    Avatar: string;
    isUser: boolean;
}

const StyledCard = styled.div<StyledProps>`
    width: 100%;
    min-height: 65px;
    background-color: ${props => props.isUser ? "var(--light_blue)" : "white"};
    border: 1px solid var(--border_grey);
    border-left: 5px solid ${props =>
        (props.Rank === 1 || props.Rank === 2 || props.Rank === 3) ? "#FFD700"
            : props.isUser ? "var(--main_color)" : "var(--border_grey)"};
    border-radius: 5px;
    display: flex;
    cursor: pointer;
    position: relative;
    transition: 0.3s ease-in-out;

    &:hover {
        box-shadow: ${props =>
            (props.Rank === 1 || props.Rank === 2 || props.Rank === 3) ? "rgb(255, 215, 0, 0.1)" : "rgba(0, 0, 0, 0.1)"} 0px 1px 3px 0px,
            ${props =>
            (props.Rank === 1 || props.Rank === 2 || props.Rank === 3) ? "rgb(255, 215, 0, 0.4)" : "rgba(0, 0, 0, 0.1)"} 0px 1px 2px 0px;
    }

    .Card_Avatar {
        width: 60px;
        height: 100%;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        position: relative;
        background-color: var(--border_grey);
        background-image: ${props => `url(${props.Avatar})`};
        background-position: center;
        background-size: cover;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
    }

    .Card_Rank {
        width: 50px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .Rank_icon {
            width: 25px;
        }

        span {
            position: absolute;
            font-family: "Poppins", sans-serif;
            font-weight: 500;
            font-size: 1.2rem;
            color: ${props => props.isUser && "white"};
        }
    }

    .Card_Data {
        margin-left: 10px;
        font-family: "Poppins", sans-serif;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        h1 {
            font-size: 1.1rem;
            font-weight: 400;
            font-style: normal;
            color: ${props => props.isUser && "white"};
        }

        .Card_UserName {
            font-size: 0.8rem;
            font-weight: 300;
            color: ${props => props.isUser && "white"};
        }
    }

    .Card_level {
        position: absolute;
        right: 10px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            font-size: 1rem;
            font-weight: 300;
            color: ${props => props.isUser && "white"};
        }
    }
`;

interface Profile {
    id: number;
    FullName: string;
    UserName: string;
    Rank: number;
    Level: number;
    img: string;
    IsUser: boolean;
    setSelectedId: (id: number) => void;
}

const RankCard: FC<Profile & { forwardedRef: Ref<HTMLDivElement> }> = ({ id, FullName, UserName, Rank, Level, img, setSelectedId, IsUser, forwardedRef }) => {
    const { data: session } = useSession();

    const handleClick = () => {
        console.log(id);
        setSelectedId(id);
    };

    return (
        <StyledCard Rank={Rank} Avatar={img} onClick={handleClick} isUser={IsUser} ref={forwardedRef}>
            <div className='Card_Rank'>
                {(Rank >= 1 && Rank <= 3) ?
                    <img className='Rank_icon' src={`/assets/icons/${Rank}.png`} alt={`Rank ${Rank}`} />
                    : <span>{Rank}</span>
                }
            </div>
            <div className='Card_Avatar'>
                {
                    !img &&
                    <svg width="76" height="20" viewBox="0 0 76 20" fill="var(--Par_grey)">
                        <path d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z" fill="var(--Par_grey)"></path>
                        <path d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z" fill="var(--Par_grey)"></path>
                        <path d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z" fill="var(--Par_grey)"></path>
                        <path d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z" fill="var(--Par_grey)"></path>
                    </svg>
                }
            </div>

            <div className='Card_Data'>
                <h1 className='Card_FullName'>{FullName}</h1>
                <h2 className='Card_UserName'>{UserName}</h2>
            </div>

            <div className='Card_level'>
                <span>{Level.toFixed(2)}</span>
            </div>
        </StyledCard>
    );
};

const ForwardedRankCard = forwardRef((props: Profile, ref: Ref<HTMLDivElement>) => <RankCard {...props} forwardedRef={ref} />);

export default ForwardedRankCard;
