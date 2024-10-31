import { UUID } from "crypto";

export interface Player {
	id: UUID;
	name: string;
	user_name: string;
    login: string;
	isInMatch: boolean;
	score: number;
	profilePic : string;
	//extended values.
	rank: number;
  }