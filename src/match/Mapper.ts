import { parse } from 'date-fns';
import { TeamApiResponseData } from '../team/ApiResponse';
import TeamMapper from '../team/Mapper';
import Team from '../team/Model';
import {
  FacilityApiResponseData,
  MatchesApiResponse,
  PeriodApiResponseData,
  ResultApiResponseData,
} from './ApiResponse';
import Match, { Period } from './Model';
import { ApiRelationshipMultiple, CategoryApiResponseData } from '../api/ApiResponse';
import { TournamentApiResponseData } from '../tournament/ApiResponse';
import TournamentMapper from '../tournament/Mapper';
import { RoundApiResponseData } from '../round/ApiResponse';
import RoundMapper from '../round/Mapper';
import { Round } from '../round/Model';
import { GroupApiResponseData } from '../group/ApiResponse';

export default class MatchesMapper {
  private readonly data: MatchesApiResponse;

  constructor(data: MatchesApiResponse) {
    this.data = data;
  }

  public mapMatches(): Match[] {
    return this.data.data.map(({ id, attributes, meta, relationships }): Match => {
      const { canceled, postponed, finished, datetime } = attributes;

      const match: Match = {
        id,
        canceled,
        postponed,
        finished,
        date: parseDate(datetime),
        facility: this.findFacility(relationships.facility.data?.id),
        periods: relationships.periods ? this.findPeriods(relationships.periods, meta.home_team, meta.away_team) : []
      };

      const round = this.findRound(relationships.round.data?.id)
      if (round) match.round = round

      const homeTeam = meta.home_team ? this.findTeam(meta.home_team) : undefined
      if (homeTeam) {
        match.homeTeam = homeTeam
        const homeTeamResult = this.findMatchResult(id, meta.home_team)
        if (homeTeamResult) match.homeTeamResult = homeTeamResult
      }

      const awayTeam = meta.away_team ? this.findTeam(meta.away_team) : undefined
      if (awayTeam) {
        match.awayTeam = awayTeam
        const awayTeamResult = this.findMatchResult(id, meta.away_team)
        if (awayTeamResult) match.awayTeamResult = awayTeamResult
      }

      if (relationships.faceoff.data?.id) match.faceoffId = relationships.faceoff.data?.id
      if (match.round?.groupId) match.tournament = this.findTournament(match.round.groupId);

      return match;
    });
  }

  private findRound(roundId?: string): Round | undefined {
    if (!roundId) return undefined;

    const data = this.data.included.find(entity =>
      entity.type === 'round' &&
      entity.id === roundId
    ) as RoundApiResponseData | undefined;

    if (!data) return undefined;

    const mapper = new RoundMapper({ data: [data], included: [] });
    return mapper.mapRounds()[0];
  }

  private findFacility(facilityId?: string): string {
    if (!facilityId) return '';

    const data = this.data.included.find(entity =>
      entity.type === 'facility' &&
      entity.id === facilityId
    ) as FacilityApiResponseData | undefined;

    if (!data) return '';

    return data.attributes.name ?? '';
  }

  private findTeam(teamId: string | null): Team | undefined {
    if (!teamId) return undefined;

    const data = this.data.included.find(entity =>
      entity.type === 'team' &&
      entity.id === teamId
    ) as TeamApiResponseData | undefined;

    if (!data) return undefined;

    const mapper = new TeamMapper({ data: [data] });
    return mapper.mapTeams()[0];
  }

  private findMatchResult(matchId: string, teamId: string | null): number | undefined {
    if (!teamId) return undefined;

    const data = this.data.included.find(entity => (
      entity.type === 'result' &&
      entity.relationships.parent.data?.type === 'match' &&
      entity.relationships.parent.data?.id === matchId &&
      entity.relationships.team.data?.id === teamId
    )) as ResultApiResponseData;

    if (!data) return undefined

    return data.attributes.value ?? undefined
  }

  private findPeriods(
    { data }: ApiRelationshipMultiple,
    homeTeamId: string | null,
    awayTeamId: string | null
  ): Period[] {
    if (!homeTeamId || !awayTeamId || !data) return [];

    const periods: Period[] = [];

    data.forEach(({ id }) => {
      const periodData = this.data.included.find(entity =>
        entity.type === 'period' &&
        entity.id === id
      ) as PeriodApiResponseData | undefined;

      if (periodData) {
        const { attributes: { name, finished, order } } = periodData;

        periods.push({
          id,
          name,
          finished,
          order,
          homeTeamResult: this.findPeriodResult(id, homeTeamId),
          awayTeamResult: this.findPeriodResult(id, awayTeamId),
        });
      }
    });
    return periods;
  }

  private findPeriodResult(periodId: string, teamId: string): number {
    const data = this.data.included.find(entity =>
      entity.type === 'result' &&
      entity.relationships.period.data?.id === periodId &&
      entity.relationships.team.data?.id === teamId
    ) as ResultApiResponseData | undefined;

    if (!data) return 0

    return data.attributes.value ?? 0;
  }

  private findTournament(groupId?: string) {
    if (!groupId) return undefined;

    const group = this.data.included.find(entity =>
      entity.type === 'group' &&
      entity.id === groupId
    ) as GroupApiResponseData | undefined;

    if (!group) return undefined;

    const tournamentId = group.relationships.tournament.data?.id;
    if (!tournamentId) return undefined;

    const data = this.data.included.find(entity =>
      entity.type === 'tournament' &&
      entity.id === tournamentId
    ) as TournamentApiResponseData | undefined;

    if (!data) return undefined;

    const included = this.data.included.filter(entity =>
      entity.type === 'category'
    ) as CategoryApiResponseData[];

    const mapper = new TournamentMapper({ data: [data], included });
    return mapper.mapTournaments()[0];
  }
}

function parseDate(date: string): Date | undefined {
  if (!date) return undefined;
  return parse(`${date} Z`, 'yyyy-MM-dd HH:mm:ss X', new Date());
}
