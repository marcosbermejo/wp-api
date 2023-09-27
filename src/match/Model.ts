import { Round } from '../round/Model';
import {Team} from '../team/Model';
import Tournament from '../tournament/Model';

export default interface Match {
  id: string;
  finished: boolean;
  postponed: boolean;
  canceled: boolean;
  periods: Period[];
  referees: Profile[];
  facility?: string;
  date?: Date;
  homeTeam?: Team;
  awayTeam?: Team;
  homeTeamResult?: number;
  awayTeamResult?: number;
  round?: Round;
  faceoffId?: string;
  tournament?: Tournament;
}

export interface Period {
  id: string;
  name: string;
  finished: boolean;
  order: number;
  homeTeamResult: number;
  awayTeamResult: number;
}

export interface Profile {
  id: string;
  name: string;
}
