import { TeamsApiResponse } from './ApiResponse';
import Team from './Model';

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
      return {
        id,
        name: attributes.name,
        image: `${process.env.CDN_URL}/logos/${clubId}.jpg`
      }
    });
  }
}
