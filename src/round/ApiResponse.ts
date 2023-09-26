import { ApiRelationship, ApiRelationshipMultiple } from "../api/ApiResponse";
import { TeamApiResponseData } from "../team/ApiResponse";

export interface RoundsApiResponse {
  data: Array<RoundApiResponseData>;
  included: Array<TeamApiResponseData | FaceoffApiResponseData>
}

export interface RoundApiResponseData {
  id: string
  type: 'round'
  attributes: {
    end_date: string | null
    limit_date: string | null
    name: string
    order: number
    start_date: string | null
  }
  relationships: {
    group: ApiRelationship,
    faceoffs: ApiRelationshipMultiple
  }
}


export interface FaceoffApiResponseData {
  id: string
  type: 'faceoff'
  attributes: {
    first_text: string | null
    second_text: string | null
    winner: string | null
  },
  relationships: {
    round: ApiRelationship
    first_previous_faceoff: ApiRelationship
    second_previous_faceoff: ApiRelationship
    first_team: ApiRelationship
    second_team: ApiRelationship
  }
}