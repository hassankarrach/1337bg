import { FC } from "react";
import { StyledCard } from './styled.card';
import { FaArrowRight } from "react-icons/fa";
import _feedback_icon from "../../../../public/assets/icon.png"
import { StaticImageData } from "next/image";

interface CardProps {
    title: string;
    desc: string;
    icon: StaticImageData;
    gradientColor: string;
    link: string;
  }

const Card: FC<CardProps> = ({ title, desc, icon, gradientColor, link }) => {
    return (
        <StyledCard gradientColor={gradientColor}>
            <h1>{title}</h1>
            <h5>{desc}</h5>

            <svg className='gradient_' width="1160" height="1024" viewBox="0 0 1160 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_1327_287)">
                    <path d="M762.177 873.449C208.967 786.276 92.1313 244.305 -102.878 239.116C-348.017 232.593 -353.809 728.959 -175.403 936.856C34.8895 1181.91 1137.08 932.525 762.177 873.449Z" fill={gradientColor} />
                </g>
                <defs>
                    <filter id="filter0_f_1327_287" x="-619.333" y="-80.9482" width="1778.65" height="1443.61" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="160" result="effect1_foregroundBlur_1327_287" />
                    </filter>
                </defs>
            </svg>

            <img src={icon.src} className='_service_icon'/>

            <FaArrowRight size={20} className='go_icon'/>
        </StyledCard>
    )
}

export default Card;