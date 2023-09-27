import {Team} from '../team/Model';

export default interface Tournament {
  id: string;
  name: string;
  status: string;
  category: string;
  teams: Team[];
}
