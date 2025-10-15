import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface AdmissionStatusProps {
  accepted: string | boolean;
  reason: string | null;
  isvalidated: string | boolean;
  cheating: boolean;
  level: number;
}

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StatusBadge = styled.div<{ $status: 'admitted' | 'not-admitted'; $clickable?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  height: 26px;
  min-height: 26px;
  max-height: 26px;
  border-radius: 13px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  position: relative;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.25);
  white-space: nowrap;
  min-width: 95px;
  max-width: 150px;
  overflow: visible;
  line-height: 1;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  
  &:hover {
    ${props => props.$clickable && `
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    `}
  }
  
  .status-icon {
    font-size: 0.75rem;
    flex-shrink: 0;
    line-height: 1;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 13px;
    padding: 1px;
    background: ${props => {
      switch (props.$status) {
        case 'admitted':
          return 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)';
        case 'not-admitted':
          return 'linear-gradient(135deg, #ef4444, #dc2626, #b91c1c)';
        default:
          return 'linear-gradient(135deg, #6b7280, #4b5563, #374151)';
      }
    }};
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
  }
  
  ${props => {
    switch (props.$status) {
      case 'admitted':
        return `
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(22, 163, 74, 0.25));
          color: #22c55e;
          border-color: rgba(34, 197, 94, 0.4);
        `;
      case 'not-admitted':
        return `
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(220, 38, 38, 0.25));
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.4);
        `;
      default:
        return `
          background: linear-gradient(135deg, rgba(107, 114, 128, 0.2), rgba(75, 85, 99, 0.2));
          color: #9ca3af;
          border-color: rgba(107, 114, 128, 0.3);
        `;
    }
  }}
`;

const DialogOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${props => props.$isOpen ? 'fadeIn' : 'fadeOut'} 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

const DialogContent = styled.div`
  background: linear-gradient(135deg, rgba(33, 33, 37, 0.95), rgba(44, 44, 48, 0.95));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  margin: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transform: translateY(-20px);
  animation: slideUp 0.3s ease;
  
  @media only screen and (max-width: 767px) {
    max-width: 320px;
    padding: 20px;
    margin: 10px;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(-20px);
      opacity: 1;
    }
  }
`;

const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  
  .dialog-icon {
    font-size: 1.2rem;
    color: #ef4444;
  }
  
  h3 {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }
`;

const DialogBody = styled.div`
  margin-bottom: 20px;
  
  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
    word-wrap: break-word;
  }
  
  .reason-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
    margin-bottom: 4px;
    font-weight: 500;
  }
  
  .reason-text {
    color: #ef4444;
    font-weight: 600;
    font-size: 1rem;
  }
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  
  button {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }
  }
`;

const AdmissionStatus: React.FC<AdmissionStatusProps> = ({
  accepted,
  reason,
  isvalidated,
  cheating,
  level
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const getAdmissionStatus = () => {
    // Check cheating first - this overrides everything
    if (cheating === true) {
      return {
        status: 'not-admitted' as const,
        text: 'Not Admitted',
        reason: 'Cheating',
        icon: FaTimesCircle
      };
    }

    // Check if accepted but didn't validate final exam and level <= 7
    if (accepted === 'yes' && isvalidated && isvalidated !== 'yes' && level <= 7) {
      return {
        status: 'not-admitted' as const,
        text: 'Not Admitted',
        reason: 'Final exam',
        icon: FaTimesCircle
      };
    }

    // Special case: accepted=yes, reason=null, cheating=false, level>7, isvalidated=no -> Admitted
    if (accepted === 'yes' && 
        (reason === null || reason === undefined) && 
        cheating === false && 
        level > 7 && 
        isvalidated === 'no') {
      return {
        status: 'admitted' as const,
        text: 'Admitted',
        reason: null,
        icon: FaCheckCircle
      };
    }

    // Standard admission logic
    const isAdmitted = accepted === 'yes' || accepted === true;
    
    if (isAdmitted) {
      return {
        status: 'admitted' as const,
        text: 'Admitted',
        reason: null,
        icon: FaCheckCircle
      };
    } else {
      let rejectionReason = 'Staff decision';
      
      if (reason) {
        if (reason.toLowerCase() === 'non admitted') {
          rejectionReason = 'Staff decision';
        } else if (reason.toLowerCase() !== 'admitted' && 
                   reason.toLowerCase() !== 'not admitted') {
          rejectionReason = reason;
        }
      }
      
      return {
        status: 'not-admitted' as const,
        text: 'Not Admitted',
        reason: rejectionReason,
        icon: FaTimesCircle
      };
    }
  };

  const { status, text, reason: statusReason, icon: StatusIcon } = getAdmissionStatus();

  const handleBadgeClick = () => {
    if (status === 'not-admitted' && statusReason) {
      setIsDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <StatusContainer>
        <StatusBadge 
          $status={status} 
          $clickable={status === 'not-admitted' && !!statusReason}
          onClick={handleBadgeClick}
        >
          <StatusIcon className="status-icon" />
          {status === 'admitted' ? 'Admitted' : 'Non admitted'}
        </StatusBadge>
      </StatusContainer>

      <DialogOverlay $isOpen={isDialogOpen} onClick={handleCloseDialog}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <FaTimesCircle className="dialog-icon" />
            <h3>Admission Status</h3>
          </DialogHeader>
          <DialogBody>
            <div className="reason-label">Reason for non-admission:</div>
            <div className="reason-text">{statusReason}</div>
          </DialogBody>
          <DialogActions>
            <button onClick={handleCloseDialog}>Close</button>
          </DialogActions>
        </DialogContent>
      </DialogOverlay>
    </>
  );
};

export default AdmissionStatus;
