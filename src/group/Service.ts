import axios from 'axios';
import logger from '../logger';
import Group from './Model';
import { GroupsApiResponse } from './ApiResponse';
import GroupsMapper from './Mapper';

const baseURL = process.env.API_URL;

const ms = 120_000;
const cache: Record<string, { timestamp: number, groups: Group[] }> = {};

export default class GroupService {

  async getGroups(tournamentId: number): Promise<{ groups: Group[], maxAge: number }> {
    const now = +new Date();
    const { timestamp, groups: cachedGroups } = cache[tournamentId] ?? {};
    const remainingMs = timestamp + ms - now;
    const remainingSec = Math.floor(remainingMs / 1000)
    if (remainingSec > 0) return { groups: cachedGroups, maxAge: remainingSec };

    const include = 'rounds,rounds.faceoffs,rounds.faceoffs.first_team,rounds.faceoffs.second_team'
    const url = `${baseURL}/groups?filter=tournament.id:${tournamentId}&sort=order&include=${include}&page[size]=100`

    logger.info(`Request Groups for tournament ${tournamentId}`);
    const { data } = await axios.get<GroupsApiResponse>(url)

    const mapper = new GroupsMapper(data)
    const groups = mapper.mapGroups()

    cache[tournamentId] = { timestamp: now, groups };
    return { groups, maxAge: ms / 1000 };
  }

}
