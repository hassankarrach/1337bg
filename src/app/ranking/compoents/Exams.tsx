import React from 'react';
import styled from 'styled-components';
import { FaCheck, FaTimes, FaHourglassHalf } from 'react-icons/fa';
import { Skeleton } from '@mui/material';

const StyledExams = styled.div`
  width: 100%;
  height: auto;
  border-width: 0 0 0 0;
  border-top: 1px solid;
  border-image: linear-gradient(90deg, rgba(231,231,231,0) 0%, rgba(231,231,231,1) 50%, rgba(231,231,231,0) 100%) 1;
  padding: 2px;
  display: flex;
  flex-direction: column;

  .Exam_container {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;

    .Status_icon {
      size: 10px;
      margin-right: 3px;
    }

    .status_icon_validated {
      color: #56ab2f;
      background-color: #a8e6cf;
    }

    .status_icon_failed {
      color: #e53935;
      background-color: #ff8a80;
    }

    .status_icon_waiting {
      color: #9e9e9e;
      background-color: var(--border_grey);
    }

    .Exam_status {
      width: 80px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--light_grey);
      padding: 0px 3px;
      margin-left: auto;
    }
  }
`;

const Exams = ({ UserData }: { UserData: any }) => {
  let PoolerExams: any[] = [];
  let StudentExams: any[] = [];
  let PlaceholderTitles: string[] = [];

  if (UserData && UserData.is_pooler) {
    PoolerExams = UserData.projects.filter(
      (project: any) =>
        project.project_name.toUpperCase().includes('PISCINE') &&
        project.project_name.toUpperCase().includes('EXAM')
    );

    // Determine how many placeholders are needed
    const numExistingExams = PoolerExams.length;
    const numPlaceholders = Math.max(4 - numExistingExams, 0);

    // Generate placeholder titles
    PlaceholderTitles = Array.from({ length: numPlaceholders }, (_, index) => {
      if (index === numPlaceholders - 1) {
        return 'Final Exam';
      } else {
        return `C Piscine Exam 0${numExistingExams + index}`;
      }
    });
  } else if (UserData) {
    StudentExams = UserData.projects.filter(
      (project: any) =>
        project.project_name.toUpperCase().includes('EXAM') &&
        !project.project_name.toUpperCase().includes('PISCINE')
    );
  }

  return (
    <StyledExams>
      <div className='User_Exams'>
        <span>Exams :</span>

        {/* Render PoolerExams or StudentExams */}
        {(UserData && UserData.is_pooler ? PoolerExams : StudentExams).map((Item, index) => (
          <div className='Exam_container' key={index}>
            {Item.is_validated ? (
              <FaCheck className='Status_icon status_icon_validated' />
            ) : (
              <FaTimes className='Status_icon status_icon_failed' />
            )}
            <span className='Exam_Title'>{Item.project_name}</span>
            <div className='Exam_status'>
              <span>{Item.final_make}</span>
            </div>
          </div>
        ))}

        {/* Render placeholders only if the user is a pooler */}
        {UserData && UserData.is_pooler && PlaceholderTitles.map((title, index) => (
          <div className='Exam_container' key={index + PoolerExams.length}>
            <FaHourglassHalf className='Status_icon status_icon_waiting' />
            <span className='Exam_Title'>{title}</span>
            <div className='Exam_status'>
              <span>NA</span> {/* Placeholder for final_make */}
            </div>
          </div>
        ))}

        {/* Skeleton loading while UserData is not available */}
        {!UserData && (
          <Skeleton
            className='Skeleton'
            animation='wave'
            variant='rectangular'
            width='100%'
            height='65px'
          />
        )}
      </div>
    </StyledExams>
  );
};

export default Exams;
