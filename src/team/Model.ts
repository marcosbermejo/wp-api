export interface Team {
  id: string;
  name: string;
  image: string;
  club?: Club
}

export interface Club {
  id: string
  name: string,
  image: string,
  delegation?: Delegation,
  phone?: string,
  email?: string,
  address?: string,
  postalCode?: string,
  city?: string,
  province?: string,
  president?: string,
}

export interface Delegation {
  id: string,
  name: string
}