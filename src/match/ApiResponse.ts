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
  CategoryApiResponseData |
  ProfileApiResponseData |
  LicenseApiResponseData |
  MatchrefereeApiResponseData
  >
}

export interface PaginatedMatchesApiResponse extends MatchesApiResponse {
  links: {
    first: string,
    self: string,
    next?: string,
    prev?: string
  }
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
    matchreferees?: ApiRelationshipMultiple
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

export interface ProfileApiResponseData {
  id: string
  type: 'profile'
  attributes: {
    birthdate: string | null
    first_name: string | null
    gender: string | null
    last_name: string | null
    nationality: string | null
    number: string | null
  }
}

export interface LicenseApiResponseData {
  id: string
  type: 'license'
  attributes: {    
    number: string | null
    type: 'referee'
  }
  relationships: {
    category: ApiRelationship
    club: ApiRelationship
    delegation: ApiRelationship
    discipline: ApiRelationship
    form: ApiRelationship
    office: ApiRelationship
    profile: ApiRelationship
    refereecategory: ApiRelationship
    season: ApiRelationship
  }
}

export interface MatchrefereeApiResponseData {
  id: string
  type: 'matchreferee'
  attributes: {    
    attendance: 'confirmed'
    published: boolean
  }
  relationships: {
    license: ApiRelationship
    match: ApiRelationship
    office: ApiRelationship
  }
}


