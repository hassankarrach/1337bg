import { UUID } from "crypto";

export interface Player {
	id : string
	full_name : string
	user_name : string
	image_url : string
	rank : number
	total_points_IW : number
}


export interface Game {
  id : string
  name : string
  type : string
  players_count : number
  pts : number
}
export const Games = [
  {
    id: "0",
    name: "Water Match",
    type: "team",
    players_count: 4,
    pts: 10,
  },
  {
    id: "1",
    name: "Penalties",
    type: "solo",
    players_count: 1,
    pts: 5,
  },
  {
    id: "2",
    name: "Rope game",
    type: "team",
    players_count: 6,
    pts: 5,
  },
  {
    id: "3",
    name: "XO",
    type: "team",
    players_count: 2,
    pts: 3,
  },
  {
    id: "4",
    name: "khnachi",
    type: "team",
    players_count: 2,
    pts: 3,
  },
  {
    id: "5",
    name: "Captain hack",
    type: "solo",
    players_count: 1,
    pts: 5,
  },
  {
    id: "6",
    name: "foot ping pong",
    type: "team",
    players_count: 2,
    pts: 5,
  },
  {
    id: "7",
    name: "yajour game",
    type: "team",
    players_count: 3,
    pts: 7,
  },
  {
    id: "8",
    name: "catch me if you can",
    type: "solo",
    players_count: 2,
    pts: 7,
  },
  {
    id: "9",
    name: "throw ball game",
    type: "solo",
    players_count: 3,
    pts: 7,
  },
  {
    id: "10",
    name: " je mappele",
    type: "solo",
    players_count: 1,
    pts: 7,
  },
  {
    id: "11",
    name: "jibha if you can",
    type: "solo",
    players_count: 1,
    pts: 3,
  },
  {
    id: "12",
    name: "Yes or No",
    type: "solo",
    players_count: 1,
    pts: 5,
  },
  {
    id: "13",
    name: "kofrat",
    type: "solo",
    players_count: 1,
    pts: 7,
  },
  {
    id: "14",
    name: "throw the disc",
    type: "solo",
    players_count: 1,
    pts: 3,
  },
  {
    id: "15",
    name: "Mini game",
    type: "solo",
    players_count: 1,
    pts: 2,
  },
];
