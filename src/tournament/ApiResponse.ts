import {
  ApiRelationship,
  ApiRelationshipMultiple,
  CategoryApiResponseData,
  DelegationApiResponseData,
} from '../api/ApiResponse';

import { TeamApiResponseData } from '../team/ApiResponse';

export interface TournamentsApiResponse {
  data: Array<TournamentApiResponseData>;
  included: Array<
  DelegationApiResponseData |
  CategoryApiResponseData |
  ClubApiResponseData |
  TeamApiResponseData
  >
}

export interface TournamentApiResponseData {
  id: string
  type: 'tournament'
  attributes: {
    name: string,
    gender: string,
    modality: string,
    status: string
  }
  relationships: {
    category: ApiRelationship,
    delegation: ApiRelationship,
    discipline: ApiRelationship,
    manager: ApiRelationship,
    season: ApiRelationship,
    teams: ApiRelationshipMultiple
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