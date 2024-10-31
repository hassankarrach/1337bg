import React from "react";
import styled from "styled-components";

const StyledUserCard = styled.div<{img : string}>`
  width: 100%;
  min-height: 50px;
  border: 1px solid var(--Par_grey);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  .UserAvatar {
    width: 50px;
    height: 100%;
    border-left: 1px solid var(--Par_grey);
  background-image: url(${props => props.img});
    background-size: cover;
    background-position: center;
  }
  .TotalPts {
    height: 100%;
    width: 50px;
    margin-left: auto;
    background-color: var(--light_grey);
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-weight: 500;
    }
  }
  .UserData {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 3px;
    margin-left: 5px;
    span {
      margin: 0;
      padding: 0;
      font-size: 1rem;
      //remove the space span takes
      line-height: 1;
    }
    .full_name {
      font-weight: 500;
    }
  }
`;

const UserCard = ({
  full_name,
  login,
  img,
  totalPts,
  onSelectUser,
}: {
  full_name: string;
  login: string;
  img: string;
  totalPts: number;
  onSelectUser: (user: string) => void;
}) => {
  return (
    <StyledUserCard onClick={()=>{onSelectUser(login)}} img={img}>
      <div className="UserAvatar"></div>
      <div className="UserData">
        <span className="full_name">{full_name}</span>
        <span className="user_name">{login}</span>
      </div>

      <div className="TotalPts">
        <span>{totalPts}</span>
      </div>
    </StyledUserCard>
  );
};

export default UserCard;
