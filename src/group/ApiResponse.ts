import { ApiRelationship, ApiRelationshipMultiple } from '../api/ApiResponse';
import { FaceoffApiResponseData, RoundApiResponseData } from '../round/ApiResponse';
import { TeamApiResponseData } from '../team/ApiResponse';

export interface GroupsApiResponse {
  data: Array<GroupApiResponseData>
  included: Array<
  TeamApiResponseData |
  RoundApiResponseData |
  FaceoffApiResponseData
  >
}
export interface GroupApiResponseData {
  id: string
  type: 'group'
  attributes: {
    name: string
    order: number
    promote: number
    relegate: number
    type: 'league' | 'play_off'
  }
  relationships: {
    rounds: ApiRelationshipMultiple
    tournament: ApiRelationship
  }
}
