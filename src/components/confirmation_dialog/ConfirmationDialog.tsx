import React from 'react';
import styled from 'styled-components';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DialogOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const DialogContainer = styled.div<{ $isOpen: boolean }>`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d30 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  max-width: 400px;
  width: 90%;
  margin: 20px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 8px 32px rgba(255, 107, 107, 0.1);
  transform: ${props => props.$isOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-20px)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff6b6b, #ff8e8e, #ff6b6b);
    background-size: 200% 100%;
    animation: shimmer 2s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { background-position: 200% 0; }
    50% { background-position: -200% 0; }
  }
`;

const DialogIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 24px;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
`;

const DialogTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin: 0 0 15px 0;
  font-family: var(--main_font);
`;

const DialogMessage = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  margin: 0 0 30px 0;
  font-family: var(--main_font);
`;

const DialogActions = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const DialogButton = styled.button<{ $variant: 'confirm' | 'cancel' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  font-family: var(--main_font);
  position: relative;
  overflow: hidden;

  ${props => props.$variant === 'confirm' ? `
    background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
    color: white;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: white;
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}) => {
  return (
    <DialogOverlay $isOpen={isOpen} onClick={onCancel}>
      <DialogContainer $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <DialogIcon>🗑️</DialogIcon>
        <DialogTitle>{title}</DialogTitle>
        <DialogMessage>{message}</DialogMessage>
        <DialogActions>
          <DialogButton $variant="cancel" onClick={onCancel}>
            {cancelText}
          </DialogButton>
          <DialogButton $variant="confirm" onClick={onConfirm}>
            {confirmText}
          </DialogButton>
        </DialogActions>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default ConfirmationDialog;
