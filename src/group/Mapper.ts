import { Round } from "../round/Model"
import { GroupsApiResponse } from "./ApiResponse"
import Group from "./Model"
import RoundMapper from "../round/Mapper"
import { TeamApiResponseData } from "../team/ApiResponse"
import { FaceoffApiResponseData, RoundApiResponseData } from "../round/ApiResponse"

export default class GroupsMapper {

  private readonly data: GroupsApiResponse

  constructor(data: GroupsApiResponse) {
    this.data = data
  }

  public mapGroups(): Group[] {
    return this.data.data.map(({ id, attributes }): Group => ({
      id,
      name: attributes.name,
      type: attributes.type,
      promote: attributes.promote,
      relegate: attributes.relegate,
      rounds: this.findRounds(id),
      standings: []
    }))
  }

  private findRounds(groupId: string): Round[] {
    if (!this.data.included) return [];

    const data = this.data.included.filter(entity =>
      entity.type === 'round' &&
      entity.relationships.group.data?.id === groupId
    ) as Array<RoundApiResponseData>

    const included = this.data.included.filter(entity =>
      entity.type === 'faceoff' ||
      entity.type === 'team'
    ) as Array<TeamApiResponseData | FaceoffApiResponseData>

    const mapper = new RoundMapper({ data, included });
    return mapper.mapRounds()
  }
}
