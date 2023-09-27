export interface ApiRelationship {
  data: {
    type: string,
    id: string
  } | null
}

export interface ApiRelationshipMultiple {
  data: Array<{
    type: string,
    id: string
  }> | null
}

export interface CategoryApiResponseData {
  id: string;
  type: 'category';
  attributes: {
    name: string,
  }
}
