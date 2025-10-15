import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCoins, FaDollarSign, FaGem, FaTrophy } from 'react-icons/fa';

interface WalletDisplayProps {
  amount: number;
  showIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

const sparkle = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const coinFlip = keyframes`
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
  100% { transform: rotateY(360deg); }
`;

const StyledWalletDisplay = styled.div<{ 
  $amount: number; 
  $size: string; 
  $animated: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: ${props => {
    switch(props.$size) {
      case 'small': return '4px 8px';
      case 'large': return '12px 16px';
      default: return '8px 12px';
    }
  }};
  
  background: ${props => {
    if (props.$amount >= 2000) return 'linear-gradient(135deg, #FF6B35, #F7931E)';
    if (props.$amount >= 1000) return 'linear-gradient(135deg, #8E44AD, #9B59B6)';
    if (props.$amount >= 500) return 'linear-gradient(135deg, #E74C3C, #C0392B)';
    if (props.$amount >= 100) return 'linear-gradient(135deg, #3498DB, #2980B9)';
    return 'linear-gradient(135deg, #95A5A6, #7F8C8D)';
  }};
  
  border-radius: ${props => {
    switch(props.$size) {
      case 'small': return '6px';
      case 'large': return '12px';
      default: return '8px';
    }
  }};
  
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
  font-size: ${props => {
    switch(props.$size) {
      case 'small': return '0.75rem';
      case 'large': return '1.1rem';
      default: return '0.9rem';
    }
  }};
  
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .wallet-icon {
    font-size: ${props => {
      switch(props.$size) {
        case 'small': return '0.8rem';
        case 'large': return '1.2rem';
        default: return '1rem';
      }
    }};
    
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
    
    ${props => props.$animated && props.$amount >= 1000 && `
      animation: ${coinFlip} 3s infinite linear;
    `}
    
    ${props => props.$amount >= 2000 && `
      &::after {
        content: '✨';
        position: absolute;
        margin-left: -8px;
        margin-top: -8px;
        animation: ${sparkle} 2s infinite;
      }
    `}
  }
  
  .amount-text {
    font-family: var(--main_font);
    letter-spacing: 0.5px;
    position: relative;
  }
  
  .currency-symbol {
    opacity: 0.9;
    margin-left: 2px;
  }
`;

const WalletDisplay: React.FC<WalletDisplayProps> = ({
  amount,
  showIcon = true,
  size = 'medium',
  animated = true,
  className
}) => {
  const getWalletIcon = (amount: number) => {
    if (amount >= 2000) return <FaTrophy className="wallet-icon" />;
    if (amount >= 1000) return <FaGem className="wallet-icon" />;
    if (amount >= 100) return <FaCoins className="wallet-icon" />;
    return <FaDollarSign className="wallet-icon" />;
  };

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(1)}K`;
    return amount.toString();
  };

  return (
    <StyledWalletDisplay 
      $amount={amount} 
      $size={size} 
      $animated={animated}
      className={className}
    >
      {showIcon && getWalletIcon(amount)}
      <span className="amount-text">
        {formatAmount(amount)}
        <span className="currency-symbol">₳</span>
      </span>
    </StyledWalletDisplay>
  );
};

export default WalletDisplay;
