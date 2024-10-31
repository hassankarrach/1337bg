import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import styled from "styled-components";
import { FaUserShield } from "react-icons/fa";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import zIndex from "@mui/material/styles/zIndex";
import UserCard from "./UserCard";

interface AdminDrawerProps {
  isAdmin: boolean;
}

const AdminDrawer: React.FC<AdminDrawerProps> = ({ isAdmin }) => {
  // Admin Panel
  const [isOpen, setIsOpen] = React.useState(false);
  const [GameType, setGameType] = React.useState("Solo");
  const [Users, setUsers] = React.useState([]);
  // ========================================

  // Modal Stats
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [SelectedUser, setSelectedUser] = React.useState<{user_name : string}>({user_name : ""});
  // ========================================

  //Teams
  // case 1, TeamVsTeam
  const [Team1, setTeam1] = React.useState([]);
  const [Team2, setTeam2] = React.useState([]);
  // case 2, Solo
  const [SoloPlayers, setSoloPlayers] = React.useState([]);
  // case 3, 1vs1
  const [Player1, setPlayer1] = React.useState();
  const [Player2, setPlayer2] = React.useState();
  // ========================================
  const MaxPerTeam = 8;
  // ========================================

  // fetch users
  React.useEffect(() => {
    fetch("/api/integration_week/players", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  const StyledAdminPanel = styled.div`
    width: 100%;
    height: 50vh;
    background-color: white;
    padding: 15px 5%;
    display: flex;
    justify-content: center;
    align-items: center;

    .SubButton {
      width: 100%;
      height: 50px;
      background-color: var(--main_color);
      border: 1px solid var(--main_color_dark);
      color: var(--main_color_dark);
      border-radius: 5px;
      font-size: 1.2rem;
      font-weight: 500;
      cursor: pointer;
      transition: 0.2s ease-in-out;
      margin-top: 15px;
      &:hover {
        filter: brightness(0.9);
      }
      // in flex container, align this button to bottom
      margin-top: auto;
    }

    select {
      width: 100%;
      height: 40px;
      border: 1px solid var(--Par_grey);
      color: var(--Par_grey);
      border-radius: 5px;
      cursor: pointer;
    }

    .GamesPanel {
      height: 100%;
      width: 500px;
      display: flex;
      flex-direction: column;
      .placeHolder {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        background-color: var(--light_grey);
        border: 1px solid var(--Par_grey);
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--Par_grey);
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
          filter: brightness(0.95);
        }
      }
      .TeamGames {
        .TeamContainer {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          gap: 5px;
        }
      }
      .OneVsOne {
      }
      .SoloGames {
        display: flex;
        flex-direction: column;
        gap: 5px;
        .Players {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  `;

  const handleGameTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGameType(e.target.value);
  };

  const AdminPanel = (
    <StyledAdminPanel>
      <div className="GamesPanel">
        <span>Select Game Name :</span>
        <select>
          <option>Game 1</option>
          <option>Game 2</option>
          <option>Game 3</option>
        </select>

        <span>Select Game type :</span>

        <select value={GameType} onChange={handleGameTypeChange}>
          <option value="Solo">Solo</option>
          <option value="1vs1">1vs1</option>
          <option value="Team">Team</option>
        </select>

        {GameType == "1vs1" ? (
          <div className="OneVsOne">
            <span>Player 1 :</span>
            <div className="placeHolder">+</div>
            <span>Player 2 :</span>
            <div className="placeHolder">+</div>
          </div>
        ) : GameType == "Solo" ? (
          <div className="SoloGames">
            <span>Select Players :</span>

            <div className="Players">
              {[...Array(MaxPerTeam)].map(() => {
                return <div className="placeHolder">+</div>;
              })}
            </div>
          </div>
        ) : GameType == "Team" ? (
          <div className="TeamGames">
            <span>Team 1 : </span>
            <div className="TeamContainer">
              {[...Array(MaxPerTeam)].map(() => {
                return <div className="placeHolder">+</div>;
              })}
            </div>

            <span>Team 2 : </span>
            <div className="TeamContainer">
              {[...Array(MaxPerTeam)].map(() => {
                return <div className="placeHolder">+</div>;
              })}
            </div>
          </div>
        ) : (
          ""
        )}

        <span></span>
        <button onClick={() => setOpen(true)} className="SubButton">
          New Game
        </button>
      </div>
    </StyledAdminPanel>
  );
  const StyledOpener = styled.div`
    width: 100%;
    position: fixed;
    bottom: 5px;
    left: 5px;
    display: flex;
    justify-content: flex-end;
    padding: 5px 10px;
    Button {
      background-color: rgba(255, 215, 0, 0);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: white;
      font-size: 1.1rem;

      .Icon {
        margin-right: 8px;
      }
    }
  `;

  const StyledModal = styled.div`
    width: 700px;
    height: 80%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    padding: 10px;
    z-index: 99999;
  `;
  const PlayerModal = (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledModal>
        {Users.map((user: { user_name: string }) => {
          return (
            <UserCard
              full_name={"test"}
              login={user.user_name}
              totalPts="10"
              img="dasf"
              onClick={() => {
                setSelectedUser;
              }}
            />
          );
        })}
      </StyledModal>
    </Modal>
  );

  // adding player logic
  const addPlayerHanlder = () => {
    if (GameType == "Solo") {
      // setSoloPlayers([...SoloPlayers, SelectedPlayer]);
    } else if (GameType == "1vs1") {
    } else if (GameType == "Team") {
    }
  };

  return isAdmin ? (
    <StyledOpener>
      {PlayerModal}
      <Button onClick={toggleDrawer(true)}>
        <FaUserShield size={25} className="Icon" />
        Admin Panel
      </Button>

	  <h1>{SelectedUser.user_name}</h1>

      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={toggleDrawer(false)}
        style={{ zIndex: 9 }}
      >
        {AdminPanel}
      </Drawer>
    </StyledOpener>
  ) : null;
};

export default AdminDrawer;
