import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FaCheckSquare as VerifiedIcon } from "react-icons/fa";
import ConfirmationDialog from "@/components/confirmation_dialog/ConfirmationDialog";

interface Feedback {
  id: string;
  feedback_text: string;
  receiver: {
    user_name: string;
    image_url: string;
    nickname?: string;
    is_verified: boolean;
  };
  created_at: string;
}

interface MyFeedbacksModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d30 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  margin: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  transform: ${props => props.$isOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-20px)'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--main_color), var(--main_color_light));
    background-size: 200% 100%;
    animation: shimmer 2s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { background-position: 200% 0; }
    50% { background-position: -200% 0; }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const ModalTitle = styled.h2`
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  font-family: var(--main_font);
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const FeedbacksContainer = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--main_color);
    border-radius: 3px;
  }
`;

const FeedbackItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
`;

const Avatar = styled.div<{ $imageUrl: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  border: 2px solid var(--main_color);
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(102, 126, 234, 0.5);
  }
`;

const FeedbackContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReceiverName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
`;

const FeedbackText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
  word-wrap: break-word;
`;

const FeedbackTime = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
  opacity: 0;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.5);
  }

  ${FeedbackItem}:hover & {
    opacity: 1;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
`;

const MyFeedbacksModal: React.FC<MyFeedbacksModalProps> = ({ open, onClose }) => {
  const { data: session } = useSession();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);

  const fetchGivenFeedbacks = async () => {
    if (!session) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/students/feedbacks/given');
      const data = await res.json();

      if (res.ok) {
        setFeedbacks(data.feedbacks);
      } else {
        toast.error('Failed to fetch feedbacks');
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      toast.error('Error fetching feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = async (feedbackId: string) => {
    try {
      const res = await fetch('/api/students/feedbacks/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedbackId }),
      });

      if (res.ok) {
        toast.success('Feedback deleted successfully!');
        await fetchGivenFeedbacks();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to delete feedback');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast.error('Error deleting feedback');
    }
  };

  const showDeleteConfirmation = (feedbackId: string) => {
    setFeedbackToDelete(feedbackId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (feedbackToDelete) {
      await deleteFeedback(feedbackToDelete);
      setShowDeleteDialog(false);
      setFeedbackToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setFeedbackToDelete(null);
  };

  const formatTimeAgo = (isoDate: string): string => {
    const now = new Date();
    const then = new Date(isoDate);
    const diffMs = now.getTime() - then.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) return `${weeks}w ago`;
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    if (seconds > 0) return `${seconds}s ago`;

    return "just now";
  };

  useEffect(() => {
    if (open) {
      fetchGivenFeedbacks();
    }
  }, [open, session]);

  return (
    <>
      <ModalOverlay $isOpen={open} onClick={onClose}>
        <ModalContainer $isOpen={open} onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>My Feedbacks ({feedbacks.length})</ModalTitle>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>

          <FeedbacksContainer>
            {loading ? (
              <EmptyState>Loading feedbacks...</EmptyState>
            ) : feedbacks.length === 0 ? (
              <EmptyState>No feedbacks given yet</EmptyState>
            ) : (
              feedbacks.map((feedback) => (
                <FeedbackItem key={feedback.id}>
                  <Avatar 
                    $imageUrl={feedback.receiver.image_url}
                    onClick={() => {
                      window.open(
                        `https://profile.intra.42.fr/users/${feedback.receiver.user_name}`,
                        "_blank"
                      );
                    }}
                  />
                  <FeedbackContent>
                    <ReceiverName>
                      To: {feedback.receiver.nickname || feedback.receiver.user_name}
                      {feedback.receiver.is_verified && (
                        <VerifiedIcon 
                          size={16} 
                          style={{ color: "var(--main_color)" }} 
                        />
                      )}
                    </ReceiverName>
                    <FeedbackText>{feedback.feedback_text}</FeedbackText>
                    <FeedbackTime>{formatTimeAgo(feedback.created_at)}</FeedbackTime>
                  </FeedbackContent>
                  <DeleteButton 
                    onClick={() => showDeleteConfirmation(feedback.id)}
                    title="Delete feedback"
                  >
                    🗑️
                  </DeleteButton>
                </FeedbackItem>
              ))
            )}
          </FeedbacksContainer>
        </ModalContainer>
      </ModalOverlay>

      <ConfirmationDialog
        isOpen={showDeleteDialog}
        title="Delete Feedback"
        message="Are you sure you want to delete this feedback? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default MyFeedbacksModal;
