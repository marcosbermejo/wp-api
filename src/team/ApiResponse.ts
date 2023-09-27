import { ApiRelationship } from "../api/ApiResponse";

export interface TeamsApiResponse {
  data: Array<TeamApiResponseData>;
  included: Array<ClubApiResponseData | DelegationApiResponseData>
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
    registrable: ApiRelationship
  }
}

export interface ClubApiResponseData {
  id: string;
  type: 'club';
  attributes: {
    code: string
    email: string
    name: string
    phone: string
  },
  relationships: {
    delegation: ApiRelationship,
    manager: ApiRelationship,
  }
}

export interface DelegationApiResponseData {
  id: string;
  type: 'delegation';
  attributes: {
    name: string,
  }
}