import {Team} from "../team/Model";

export interface Round {
  id: string;
  name: string;
  order: number;
  start_date?: Date;
  end_date?: Date;
  groupId: string;
  faceoffs: Faceoff[]
}

export interface Faceoff {
  id: string
  firstText: string
  secondText: string
  winner: string
  firstTeam?: Team
  secondTeam?: Team
  firstPreviousFaceoffId?: string,
  secondPreviousFaceoffId?: string,
}