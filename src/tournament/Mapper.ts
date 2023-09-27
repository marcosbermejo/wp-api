import { ClubApiResponseData, DelegationApiResponseData, TeamApiResponseData } from '../team/ApiResponse';
import TeamMapper from '../team/Mapper';
import { Team } from '../team/Model';
import { TournamentsApiResponse } from './ApiResponse';
import Tournament from './Model';

const categoryIdTranslations: Record<string, Record<string, string>> = {
  female: {'2090': '4815'},
  male: {'2090': '4814'},
}

export default class TournamentMapper {
  private readonly data: TournamentsApiResponse;

  constructor(data: TournamentsApiResponse) {
    this.data = data;
  }

  public mapTournaments(): Tournament[] {
    return this.data.data.map(({ id, attributes, relationships }): Tournament => ({
      id,
      status: attributes.status,
      name: attributes.name,
      category: this.findCategory(attributes.gender, relationships.category.data?.id),
      teams: this.findTeams(id),
    }));
  }

  private findCategory(gender: string, categoryId?: string): string {
    if (!categoryId) return '';

    categoryId = categoryIdTranslations[gender]?.[categoryId] ?? categoryId
    const data = this.data.included.find((entity) => entity.type === 'category' && entity.id === categoryId);

    return data?.attributes.name ?? '';
  }

  private findTeams(tournamentId: string): Team[] {
    const data = this.data.included.filter(entity =>
      entity.type === 'team' &&
      entity.relationships.registrable.data?.type === 'tournament' &&
      entity.relationships.registrable.data?.id === tournamentId
    ) as Array<TeamApiResponseData>;

    const included = this.data.included.filter(entity =>
      entity.type === 'club' ||
      entity.type === 'delegation'
    ) as Array<ClubApiResponseData | DelegationApiResponseData>

    const mapper = new TeamMapper({ data, included });
    return mapper.mapTeams();
  }
}
