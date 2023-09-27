import { parse } from "date-fns";
import { FaceoffApiResponseData, RoundsApiResponse } from "./ApiResponse";
import { Faceoff, Round } from "./Model";
import {Team} from "../team/Model";
import { TeamApiResponseData } from "../team/ApiResponse";
import TeamMapper from "../team/Mapper";

export default class RoundMapper {
  private readonly data: RoundsApiResponse;

  constructor(data: RoundsApiResponse) {
    this.data = data;
  }

  public mapRounds(): Round[] {
    return this.data.data.map(({ id, attributes, relationships }): Round => {
      const round = {
        id: id,
        name: attributes.name,
        order: attributes.order,
        groupId: relationships.group.data?.id,
        faceoffs: this.findFaceoffs(id)
      } as Round;

      if (attributes.start_date) round.start_date = parseDate(attributes.start_date)
      if (attributes.end_date) round.end_date = parseDate(attributes.end_date)

      return round
    });
  }

  private findFaceoffs(roundId: string): Faceoff[] {
    const data = this.data.included.filter(entity =>
      entity.type === 'faceoff' &&
      entity.relationships.round.data?.id === roundId
    ) as FaceoffApiResponseData[]

    return data.map(({ id, attributes, relationships }): Faceoff => {

      const faceoff: Faceoff = {
        id,
        firstText: attributes.first_text ?? '',
        secondText: attributes.second_text ?? '',
        winner: attributes.winner ?? '',
        firstTeam: this.findTeam(relationships.first_team.data?.id ?? ''),
        secondTeam: this.findTeam(relationships.second_team.data?.id ?? ''),
      }

      if (relationships.first_previous_faceoff.data?.id) {
        faceoff.firstPreviousFaceoffId = relationships.first_previous_faceoff.data?.id
      }

      if (relationships.second_previous_faceoff.data?.id) {
        faceoff.secondPreviousFaceoffId = relationships.second_previous_faceoff.data?.id
      }

      return faceoff

    })
  }

  private findTeam(teamId: string): Team | undefined {
    const data = this.data.included.find(entity =>
      entity.type === 'team' &&
      entity.id === teamId
    ) as TeamApiResponseData | undefined

    if (!data) return undefined
    const mapper = new TeamMapper({ data: [data], included: [] });
    return mapper.mapTeams()[0];
  }
}

function parseDate(date: string): Date | undefined {
  if (!date) return undefined;
  return parse(`${date} Z`, 'yyyy-MM-dd HH:mm:ss X', new Date());
}