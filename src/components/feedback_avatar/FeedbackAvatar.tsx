import React from 'react';
import styled from 'styled-components';
import { useUserImage } from '@/hooks/useUserImage';

interface FeedbackAvatarProps {
  username: string;
  imageUrl: string | null;
  nickname?: string;
  className?: string;
  onClick?: () => void;
}

const AvatarContainer = styled.div<{ $hasImage: boolean; $isLoading: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.1);
  
  ${props => !props.$hasImage && `
    background: linear-gradient(135deg, #4a5568, #2d3748);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.2rem;
    color: white;
    text-transform: uppercase;
  `}
  
  ${props => props.$isLoading && `
    background: linear-gradient(135deg, #4a5568, #2d3748);
    position: relative;
    overflow: hidden;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
  `}
  
  &:hover {
    transform: scale(1.05);
    border-color: var(--main_color);
  }
`;

const FeedbackAvatar: React.FC<FeedbackAvatarProps> = ({
  username,
  imageUrl,
  nickname,
  className,
  onClick
}) => {
  const { imageUrl: fetchedImageUrl, isLoading } = useUserImage(username, imageUrl);
  
  // Use fetched image if original was null, otherwise use original
  const finalImageUrl = imageUrl || fetchedImageUrl;
  
  // Generate initials from nickname or username
  const getInitials = (name: string) => {
    if (!name) return '??';
    return name.split(' ')
      .map(part => part.trim())
      .filter(part => part.length > 0)
      .map(part => part[0].toUpperCase())
      .join('')
      .slice(0, 2);
  };
  
  const initials = getInitials(nickname || username);
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open(`https://profile.intra.42.fr/users/${username}`, "_blank");
    }
  };

  return (
    <AvatarContainer
      className={className}
      $hasImage={!!finalImageUrl}
      $isLoading={isLoading}
      style={finalImageUrl ? { backgroundImage: `url(${finalImageUrl})` } : {}}
      onClick={handleClick}
      title={`${nickname || username} - Click to view 42 profile`}
    >
      {!finalImageUrl && !isLoading && initials}
    </AvatarContainer>
  );
};

export default FeedbackAvatar;
