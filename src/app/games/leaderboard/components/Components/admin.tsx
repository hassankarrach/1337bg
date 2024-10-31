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
import { Games, Game, Player } from "../../types/user";
import { toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";
import { FaHammer } from 'react-icons/fa';


interface AdminDrawerProps {
  isAdmin: boolean;
}

const SearchInput = styled.input`
  width: 100%; // Full width
  padding: 10px; // Padding for better touch targets
  margin-bottom: 20px; // Space below the input
  border: 1px solid #ccc; // Light border
  border-radius: 4px; // Rounded corners
  font-size: 16px; // Larger font for better readability

  &:focus {
    outline: none; // Remove outline
    border-color: #007bff; // Change border color on focus
  }
`;

const AdminDrawer: React.FC<AdminDrawerProps> = ({ isAdmin }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [GameType, setGameType] = React.useState("Solo");
  const [Users, setUsers] = React.useState([]);

  const [searchQuery, setSearchQuery] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [SelectedUser, setSelectedUser] = React.useState("");

  const [SelectedGame, setSelectedGame] = React.useState<Game>(Games[0]);

  const [SelectedWinners, setSelectedWinners] = React.useState<string[]>([]);

  const MaxPerTeam = 7;

  React.useEffect(() => {
    fetch(`/api/integration_week/players?${Math.random()}`, {
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

      .Infos {
        display: flex;
        flex-direction: row-reverse;
        .Pts {
          display: flex;
          padding: 5px;
          justify-content: center;
          align-items: center;
          color: var(--Par_grey);
          span {
            font-size: 1.2rem;
            font-weight: 400;
          }
        }
      }

      .placeHolder {
        width: auto;
        padding: 5px;
        height: 40px;
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
      .AddWinner {
          position  :absolute;
          display  : flex;
          justify-content : center;
          align-items : center;
          border-radius : 5px;
          right  : 10px;
          bottom : 10px;
          width: 100px;
          height: 40px;
          background-color: var(--light_grey);
          border: 1px solid var(--Par_grey);
          cursor: pointer;
          font-size: 1.1rem;
        }
      .SoloGames {
        display: flex;
        flex-direction: column;
        gap: 5px;
        .Players {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          gap: 3px;
        }


      }
    }
  `;

  const HandleGivePoints = () => {
    try {
      fetch("/api/integration_week/admin/update_player", {
        method: "POST",
        body: JSON.stringify({
          action: "ADD",
          user_id: SelectedUser,
          points: SelectedGame.pts,
          winners: SelectedWinners,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success("Points added successfully");
        });
    } catch (err) {
      toast.error("An error occured while updating the player");
    } finally {
      setSelectedWinners([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGame = Games.find((game) => game.name === e.target.value);
    if (selectedGame) {
      setSelectedGame(selectedGame);
    }
  };

  const AdminPanel = (
    <StyledAdminPanel>
      <div className="GamesPanel">
        <span>Select Game Name: </span>

        <div className="Infos">
          <div className="Pts">
            <span>{SelectedGame.pts}Pts</span>
          </div>
          <select value={SelectedGame.name} onChange={handleChange}>
            {Games.map((game) => (
              <option key={game.name} value={game.name}>
                {game.name}
              </option>
            ))}
          </select>
        </div>

        <div className="SoloGames">
          <span>Select Winners:</span>
          <div className="Players">
            {SelectedWinners.map((winner) => (
              <div
                key={winner}
                className="placeHolder"
                onClick={() => {
                  setSelectedWinners(
                    SelectedWinners.filter((w) => w !== winner)
                  );
                }}
              >
                {winner}
              </div>
            ))}
          </div>
          <Autocomplete
            disablePortal
            options={Users.map((user: Player) => user.user_name)}
            onChange={(event, newValue) => {
              if (newValue) HanleSelectUser(newValue);
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="User" />}
          />
        </div>

        <button className="SubButton" onClick={HandleGivePoints}>
          give points
        </button>

        <button className="AddWinner" onClick={()=>{
          window.location.href = "https://1337bg.live/admin";
        }}>
            <FaHammer size={24}/>
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
    z-index :9;

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
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 10px 5px;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    padding: 10px;
    overflow-y: scroll;
  `;

  const HanleSelectUser = (user: string) => {
    setSelectedUser(user);
    // check max is 7 ....

    // ADD USER TO THE WINNERS
    // check if user is already in the list
    if (
      SelectedWinners.includes(user) ||
      SelectedWinners.length >= MaxPerTeam
    ) {
      toast.error("User is already in the list or max is reached");
    } else {
      setSelectedWinners([...SelectedWinners, user]);
    }
    handleClose();
  };

  const filteredUsers = Users.filter((user: Player) =>
    user.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const PlayerModal = (
    <Modal open={open} onClose={handleClose}>
      <StyledModal>
        <input
          name="body"
          // onChange={handleChange}
          placeholder="placeholder"
        />

        {filteredUsers.map((user: Player, key) => (
          <UserCard
            key={key}
            full_name={user.full_name}
            login={user.user_name}
            totalPts={user.total_points_IW}
            img={user.image_url}
            onSelectUser={HanleSelectUser}
          />
        ))}
      </StyledModal>
    </Modal>
  );

  return isAdmin ? (
    <StyledOpener>
      {PlayerModal}
      <Button onClick={toggleDrawer(true)}>
        <FaUserShield size={25} className="Icon" />
        Admin Panel
      </Button>

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
