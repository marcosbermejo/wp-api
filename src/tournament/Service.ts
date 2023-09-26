import axios from 'axios';
import Tournament from './Model';
import { TournamentsApiResponse } from './ApiResponse';
import TournamentMapper from './Mapper';
import logger from '../logger';

const seasonId = '6653';
const manager1 = '210453';
const manager2 = '314965';
const baseURL = process.env.API_URL;

const ms = 120_000;
let timestamp: number = 0;
let cache: Tournament[] = [];

export default class TournamentService {
  async getTournaments(): Promise<{ tournaments: Tournament[], maxAge: number }> {
    const now = +new Date();
    const remainingMs = timestamp + ms - now;
    const remainingSec = Math.floor(remainingMs / 1000)
    if (remainingSec > 0) return { tournaments: cache, maxAge: remainingSec };
  
    const include = 'category,teams.club,teams.club.delegation';
  
    const url = (managerId: string) => {
      const filter = `season.id:${seasonId},manager.id:${managerId}`;
      return `${baseURL}/tournaments?filter=${filter}&sort=order&include=${include}&page[size]=100`;
    };
  
    logger.info(`Request Tournament for manager ${manager1}`);
    const { data: data1 } = await axios.get<TournamentsApiResponse>(url(manager1));
  
    logger.info(`Request Tournament for manager ${manager2}`);
    const { data: data2 } = await axios.get<TournamentsApiResponse>(url(manager2));
  
    const mapper = new TournamentMapper({
      data: [...data1.data, ...data2.data],
      included: [...data1.included, ...data2.included],
    });
  
    const tournaments = mapper.mapTournaments();
  
    timestamp = now;
    cache = tournaments;
  
    return { tournaments, maxAge: ms / 1000};
  }
}

