import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';

interface StatsCardProps {
  icon: IconType;
  value: string | number;
  label: string;
  color?: string;
  className?: string;
  onClick?: () => void;
  isClickable?: boolean;
}

const StyledStatsCard = styled.div<{ $color?: string; $isClickable?: boolean }>`
  padding: 16px 12px;
  background: linear-gradient(135deg, rgba(44, 44, 48, 0.8), rgba(33, 33, 37, 0.9));
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 1 auto;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: ${props => props.$isClickable ? 'pointer' : 'default'};
  
  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${props => props.$color || 'var(--main_color)'}, rgba(183, 251, 43, 0.6));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  .stats-icon {
    color: ${props => props.$color || 'var(--main_color)'};
    font-size: 1.4rem;
    margin-bottom: 4px;
    transition: all 0.3s ease;
  }
  
  &:hover .stats-icon {
    transform: scale(1.1);
    filter: brightness(1.2);
  }
  
  .stats-value {
    font-family: var(--main_font);
    color: white;
    font-weight: 700;
    font-size: 1.1rem;
    text-align: center;
    line-height: 1.2;
    word-break: break-word;
  }
  
  .stats-label {
    font-family: var(--Sec_Font);
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    font-size: 0.75rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  value,
  label,
  color,
  className,
  onClick,
  isClickable = false
}) => {
  return (
    <StyledStatsCard 
      $color={color} 
      $isClickable={isClickable}
      className={className}
      onClick={onClick}
    >
      <Icon className="stats-icon" />
      <div className="stats-value">{value}</div>
      <div className="stats-label">{label}</div>
    </StyledStatsCard>
  );
};

export default StatsCard;
