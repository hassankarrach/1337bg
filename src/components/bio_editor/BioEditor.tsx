import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface BioEditorProps {
  initialBio?: string | null;
  onBioUpdate?: (newBio: string) => void;
  isEditable?: boolean;
  directEdit?: boolean; // New prop to enable direct editing mode
  isOwnProfile?: boolean; // New prop to determine if it's the user's own profile
}

const BioContainer = styled.div`
  margin: 0rem 0;
`;

const BioHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  h3 {
    color: ${props => props.theme?.isDirectEdit ? 'black' : 'white'};
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }
`;

const EditButton = styled.button`
  background: rgba(183, 251, 43, 0.1);
  border: 1px solid rgba(183, 251, 43, 0.3);
  color: var(--main_color);
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  
  &:hover {
    background: rgba(183, 251, 43, 0.2);
    transform: translateY(-1px);
  }
`;

const BioText = styled.div<{ $isEmpty?: boolean }>`
  background: rgba(33, 33, 37, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  color: ${props => props.$isEmpty ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)'};
  font-size: 0.9rem;
  line-height: 1.4;
  min-height: 60px;
  font-style: ${props => props.$isEmpty ? 'italic' : 'normal'};
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const BioTextArea = styled.textarea`
  width: 100%;
  background: rgba(33, 33, 37, 0.8);
  border: 1px solid rgba(183, 251, 43, 0.3);
  border-radius: 8px;
  padding: 12px;
  color: white;
  font-size: 0.9rem;
  line-height: 1.4;
  min-height: 80px;
  resize: vertical;
  outline: none;
  font-family: inherit;
  
  &:focus {
    border-color: var(--main_color);
    box-shadow: 0 0 0 2px rgba(183, 251, 43, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const BioActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const ActionButton = styled.button<{ $variant: 'save' | 'cancel' }>`
  background: ${props => props.$variant === 'save' 
    ? 'linear-gradient(135deg, #22c55e, #16a34a)' 
    : 'rgba(239, 68, 68, 0.2)'};
  border: 1px solid ${props => props.$variant === 'save' 
    ? 'rgba(34, 197, 94, 0.3)' 
    : 'rgba(239, 68, 68, 0.3)'};
  color: white;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  
  &:hover {
    transform: translateY(-1px);
    background: ${props => props.$variant === 'save' 
      ? 'linear-gradient(135deg, #16a34a, #15803d)' 
      : 'rgba(239, 68, 68, 0.3)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CharacterCount = styled.div<{ $isNearLimit?: boolean }>`
  font-size: 0.75rem;
  color: ${props => props.$isNearLimit ? '#ef4444' : 'rgba(255, 255, 255, 0.5)'};
  text-align: right;
  margin-top: 4px;
`;

const BioEditor: React.FC<BioEditorProps> = ({ 
  initialBio, 
  onBioUpdate, 
  isEditable = true,
  directEdit = false,
  isOwnProfile = true
}) => {
  const [bio, setBio] = useState(initialBio || '');
  const [isEditing, setIsEditing] = useState(directEdit);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBio(initialBio || '');
  }, [initialBio]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setBio(initialBio || '');
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (directEdit) {
      // In direct edit mode, just call the callback without API call
      onBioUpdate?.(bio.trim());
      return;
    }
    
    // For standalone bio editing (not in profile modal), keep the original API call
    setIsLoading(true);
    try {
      const response = await fetch('/api/users/bio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio: bio.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to update bio');
      }

      const result = await response.json();
      toast.success('Bio updated successfully!');
      setIsEditing(false);
      onBioUpdate?.(bio.trim());
    } catch (error) {
      toast.error('Failed to update bio. Please try again.');
      console.error('Error updating bio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const characterCount = bio.length;
  const maxCharacters = 500;
  const isNearLimit = characterCount > maxCharacters * 0.8;

  const getEmptyMessage = () => {
    if (isOwnProfile) {
      return 'No bio available. Click edit to add one!';
    }
    return 'No bio available.';
  };

  return (
    <BioContainer>
      <BioHeader theme={{ isDirectEdit: directEdit }}>
        <h3>Bio</h3>
        {isEditable && !isEditing && !directEdit && (
          <EditButton onClick={handleEdit}>
            <FaEdit />
            Edit
          </EditButton>
        )}
      </BioHeader>

      {isEditing || directEdit ? (
        <>
          <BioTextArea
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              if (directEdit) {
                onBioUpdate?.(e.target.value);
              }
            }}
            placeholder="Tell others about yourself... (max 500 characters)"
            maxLength={maxCharacters}
          />
          <CharacterCount $isNearLimit={isNearLimit}>
            {characterCount}/{maxCharacters}
          </CharacterCount>
          {!directEdit && (
            <BioActions>
              <ActionButton 
                $variant="save" 
                onClick={handleSave}
                disabled={isLoading || characterCount > maxCharacters}
              >
                <FaSave />
                {isLoading ? 'Saving...' : 'Save'}
              </ActionButton>
              <ActionButton 
                $variant="cancel" 
                onClick={handleCancel}
                disabled={isLoading}
              >
                <FaTimes />
                Cancel
              </ActionButton>
            </BioActions>
          )}
        </>
      ) : (
        <BioText $isEmpty={!bio.trim()}>
          {bio.trim() || getEmptyMessage()}
        </BioText>
      )}
    </BioContainer>
  );
};

export default BioEditor;
