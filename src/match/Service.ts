import axios from 'axios';
import { MatchApiResponseData, MatchesApiResponse, PaginatedMatchesApiResponse, TournamentDatesApiResponse } from './ApiResponse';
import logger from '../logger';
import MatchesMapper from './Mapper';
import Match, { Profile } from './Model';

const ms = 120_000;
const matchMs = 10_000;
const baseURL = process.env.API_URL;

type PaginatedMatches = { matches: Match[], hasNext: boolean, hasPrev: boolean }
type CachedPaginatedMatches = { timestamp: number, matches: PaginatedMatches }
type CachedPageMatches = Record<number, CachedPaginatedMatches>

type Dates = [number, number]
type CachedDates = { timestamp: number, dates: Dates }
type CachedMatch = { timestamp: number, match: Match }

const datesCache: Record<string, CachedDates> = {};
const matchesCache: Record<string, CachedPageMatches> = {}
const matchCache: Record<string, CachedMatch> = {}

export default class MatchService {

  async getTournamentDates(tournamentId: number): Promise<{ dates: Dates, maxAge: number }> {
    const now = +new Date();
    const { timestamp, dates: cachedDates } = datesCache[tournamentId] ?? {};
    const remainingMs = timestamp + ms - now;
    const remainingSec = Math.floor(remainingMs / 1000)
    if (remainingSec > 0) return { dates: cachedDates, maxAge: remainingSec };

    async function getDate(first: boolean): Promise<number> {
      const filter = `round.group.tournament.id:${tournamentId},!datetime:null`;
      const url = `${baseURL}/matches?filter=${filter}&sort=${first ? '' : '-'}datetime&page[size]=1`;

      logger.info(`Request ${first ? 'first' : 'last'} Match for tournament ${tournamentId}`);
      const { data } = await axios.get<TournamentDatesApiResponse>(url);

      const mapper = new MatchesMapper({ ...data, included: [] });
      const match = mapper.mapMatches()[0];
      return match && match.date ? +match.date : 0;
    }

    const dates: Dates = [await getDate(true), await getDate(false)];
    datesCache[tournamentId] = { timestamp: now, dates };

    return { dates, maxAge: ms / 1000 }
  }

  async getGroupMatches(groupId: number, page: number): Promise<{ matches: PaginatedMatches, maxAge: number }> {

    const now = +new Date();
    const { timestamp, matches: cachedMatches } = matchesCache[groupId]?.[page] ?? {};
    const remainingMs = timestamp + ms - now;
    const remainingSec = Math.floor(remainingMs / 1000)
    if (remainingSec > 0) return { matches: cachedMatches, maxAge: remainingSec };

    const filter = `round.group.id:${groupId},!datetime:null`
    const include = 'teams,round,facility,results,periods,periods.results, round.group.tournament'
    const url = `${baseURL}/matches?filter=${filter}&sort=datetime&include=${include}&page[number]=${page}&page[size]=20`

    logger.info(`Request Matches for group ${groupId} page ${page}`);
    const { data } = await axios.get<PaginatedMatchesApiResponse>(url)
    const { links } = data
    const mapper = new MatchesMapper(data)

    const matches: PaginatedMatches = {
      matches: mapper.mapMatches(),
      hasNext: Boolean(links?.next),
      hasPrev: Boolean(links?.prev)
    }

    matchesCache[groupId] = matchesCache[groupId] ?? {}
    matchesCache[groupId][page] = { timestamp: now, matches }

    return { matches, maxAge: ms / 1000 }
  }

  async getMatch (matchId: number): Promise<{ match: Match, maxAge: number}> {

    const now = +new Date();
    const { timestamp, match: cachedMatch } = matchCache[matchId] ?? {};
    const remainingMs = timestamp + matchMs - now;
    const remainingSec = Math.floor(remainingMs / 1000)
    if (remainingSec > 0) return { match: cachedMatch, maxAge: remainingSec };

    const filter = `id:${matchId}`
    const include = 'teams,round,facility,results,periods,periods.results,round.group.tournament,matchreferees.license.profile'
    const url = `${baseURL}/matches?filter=${filter}&sort=datetime&include=${include}`

    logger.info(`Request Match ${matchId}`);
    const { data } = await axios.get<MatchesApiResponse>(url)
    const mapper = new MatchesMapper(data)
    const matches = mapper.mapMatches()
    const match = matches[0]
   
    matchCache[matchId] = { timestamp: now, match }
    return { match, maxAge: matchMs / 1000 }
  }

}


