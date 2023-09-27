import { ClubApiResponseData, TeamsApiResponse } from './ApiResponse';
import { Club, Delegation, Team } from './Model';

const clubIdTranslations: Record<string, string> = {
  '4977195': '4979833',
  '4977307': '4979866',
  '4977185': '4979827',
  '4977194': '4979832',
  '4977218': '4979843',
  '4977216': '4979842',
  '4977223': '4979845',
  '4977205': '4979839',
  '4978708': '4980017',
  '4977186': '4979828',
  '4977233': '4979847',
  '4977221': '4979844',
  '4977253': '4979850',
  '4977191': '4979830',
  '4977193': '4979831',
  '4977252': '4979849',
  '4977516': '4979925',
  '4978706': '4980016',
  '4978719': '4980021'
}

export default class TeamMapper {
  private readonly data: TeamsApiResponse;

  constructor(data: TeamsApiResponse) {
    this.data = data;
  }

  public mapTeams(): Team[] {
    return this.data.data.map(({ id, attributes, relationships }): Team => {
      let clubId = relationships.club.data?.id ?? ''
      clubId = clubIdTranslations[clubId] ?? clubId
      const team: Team = {
        id,
        name: attributes.name,
        image: `${process.env.CDN_URL}/logos/${clubId}.jpg`
      }

      if (clubId) {
        const club = this.findClub(clubId)
        if (club) team.club = club
      }

      return team
    });
  }

  private findClub(clubId: string): Club | undefined {
    if (!clubId) return undefined;

    const data = this.data.included.find(entity =>
      entity.type === 'club' &&
      entity.id === clubId
    ) as ClubApiResponseData | undefined

    if (!data) return undefined

    const club: Club = {
      id: data.id,
      name: data.attributes.name,
      image: `${process.env.CDN_URL}/logos/${data.id}.jpg`
    }

    if (data.relationships.delegation.data?.id) {
      const delegation = this.findDelegation(data.relationships.delegation.data.id)
      if (delegation) club.delegation = delegation
    }

    return club
  }

  private findDelegation(delegationId: string): Delegation | undefined {
    if (!delegationId) return undefined;

    const data = this.data.included.find(entity =>
      entity.type === 'delegation' &&
      entity.id === delegationId
    )
    return data ? {
      id: data.id,
      name: data.attributes.name,
    } as Delegation : undefined
  }
}
