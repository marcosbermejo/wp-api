import axios from 'axios';
import { MatchesApiResponse, TournamentDatesApiResponse } from './ApiResponse';
import logger from '../logger';
import MatchesMapper from './Mapper';

const baseURL = process.env.API_URL;

const ms = 120_000;
const cache: Record<string, { timestamp: number, dates: [number, number] }> = {};

export default class MatchService {

  async getTournamentDates(tournamentId: number): Promise<{dates: [number, number], maxAge: number}> {
    const now = +new Date();
    const { timestamp, dates: cachedDates } = cache[tournamentId] ?? {};
    const remainingMs = timestamp + ms - now;
    const remainingSec = Math.floor(remainingMs / 1000)
    if (remainingSec > 0) return { dates: cachedDates, maxAge: remainingSec};

    async function getDate(first: boolean): Promise<number> {
      const filter = `round.group.tournament.id:${tournamentId},!datetime:null`;
      const url = `${baseURL}/matches?filter=${filter}&sort=${first ? '' : '-'}datetime&page[size]=1`;

      logger.info(`Request ${first ? 'first' : 'last'} Match for tournament ${tournamentId}`);
      const { data } = await axios.get<TournamentDatesApiResponse>(url);

      const mapper = new MatchesMapper({ ...data, included: [] });
      const match = mapper.mapMatches()[0];
      return match && match.date ? +match.date : 0;
    }

    const dates: [number, number] = [await getDate(true), await getDate(false)];
    cache[tournamentId] = { timestamp: now, dates };

    return { dates, maxAge: ms / 1000}
  }
}

