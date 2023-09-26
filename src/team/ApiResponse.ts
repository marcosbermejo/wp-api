import { ApiRelationship } from "../api/ApiResponse";

export interface TeamsApiResponse {
  data: Array<TeamApiResponseData>;
}

export interface TeamApiResponseData {
  id: string;
  type: 'team';
  attributes: {
    name: string
  },
  relationships: {
    category: ApiRelationship,
    club: ApiRelationship,
    registrable: ApiRelationship,
  }
}
