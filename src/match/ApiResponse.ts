import { ApiRelationship, ApiRelationshipMultiple, CategoryApiResponseData } from '../api/ApiResponse';
import { GroupApiResponseData } from '../group/ApiResponse';
import { RoundApiResponseData } from '../round/ApiResponse';
import { TeamApiResponseData } from '../team/ApiResponse';
import { TournamentApiResponseData } from '../tournament/ApiResponse';

export interface TournamentDatesApiResponse {
  data: Array<MatchApiResponseData>
}

export interface MatchesApiResponse {
  data: Array<MatchApiResponseData>
  included: Array<
  TeamApiResponseData |
  GroupApiResponseData |
  RoundApiResponseData |
  FacilityApiResponseData |
  ResultApiResponseData |
  PeriodApiResponseData |
  TournamentApiResponseData |
  CategoryApiResponseData
  >
}

export interface MatchApiResponseData {
  id: string
  type: 'match'
  attributes: {
    canceled: boolean
    datetime: string
    finished: boolean
    postponed: boolean
  }
  meta: {
    away_team: string | null
    home_team: string | null
  },
  relationships: {
    faceoff: ApiRelationship
    facility: ApiRelationship
    round: ApiRelationship
    periods?: ApiRelationshipMultiple
    results?: ApiRelationshipMultiple
    teams?: ApiRelationshipMultiple
  }
}

export interface PeriodApiResponseData {
  id: string
  type: 'period'
  attributes: {
    finished: boolean
    name: string
    order: number
  },
  relationships: {
    periodable: ApiRelationship
    results: ApiRelationshipMultiple
  }
}

export interface ResultApiResponseData {
  id: string
  type: 'result'
  attributes: {
    score: number | null
    value: number | null
  },
  relationships: {
    match: ApiRelationship
    parent: ApiRelationship
    period: ApiRelationship
    team: ApiRelationship
  }
}

export interface FacilityApiResponseData {
  id: string
  type: 'facility'
  attributes: {
    active: boolean | null
    address: string | null
    city: string | null
    latitude: number | null
    longitude: number | null
    name: string | null
    phone: string | null
    postal_code: string | null
    province: string | null
  },
  relationships: {
    manager: ApiRelationship
  }
}
