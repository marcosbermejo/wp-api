import TournamentsFixture from './fixtures/tournaments'
import MatchesFixture from './fixtures/matches'
import TournamentDatesFixture from './fixtures/tournamentDates'
import GroupsFixture from './fixtures/groups'
import TournamentMapper from '../src/tournament/Mapper';
import MatchesMapper from '../src/match/Mapper';
import Match, { Period } from '../src/match/Model';
import { Round } from '../src/round/Model';
import Team from '../src/team/Model';
import Tournament from '../src/tournament/Model';
import GroupsMapper from '../src/group/Mapper';
import Group from '../src/group/Model';

const team = (id: number, clubId: number): Team => ({
  id: `te${id}`,
  name: `Team ${id}`,
  image: `${process.env.CDN_URL}/logos/c${clubId}.jpg`
})

const period = (id: number, r1: number, r2: number): Period => ({
  id: `p${id}`,
  name: `Period ${id}`,
  finished: true,
  order: id,
  homeTeamResult: r1,
  awayTeamResult: r2
})

const round = (id: number, groupId: number): Round => ({
  id: `r${id}`,
  name: `Round ${id}`,
  order: id,
  groupId: `g${groupId}`,
  faceoffs: []
})

describe('Mappers', () => {

  it('Maps tournaments', () => {

    const mapper = new TournamentMapper(TournamentsFixture);
    const tournaments = mapper.mapTournaments();

    const tournament1: Tournament = {
      id: 't1',
      name: 'Tournament 1',
      status: 'in_progress',
      category: 'Category 1',
      teams: [team(1, 1), team(2, 2)]
    }

    const tournament2: Tournament = {
      id: 't2',
      name: 'Tournament 2',
      status: 'in_progress',
      category: 'Category 2',
      teams: [team(3, 1), team(4, 2)]
    }

    expect(tournaments).toEqual([tournament1, tournament2])

  });

  it('Matps matches without includes', () => {
    const mapper = new MatchesMapper({...TournamentDatesFixture, included: []})
    const matches = mapper.mapMatches()    

    const match: Match = {
      id: 'm1',
      finished: false,
      postponed: false,
      canceled: false,
      periods: [],
      facility: '',
      date: new Date(2023, 9, 11, 19, 15, 0)
    }

    expect(matches).toEqual([match])

  })

  it('Maps matches', () => {
    const mapper = new MatchesMapper(MatchesFixture)
    const matches = mapper.mapMatches()

    const tournament: Tournament = {
      id: 't1',
      name: 'Tournament 1',
      status: 'in_progress',
      category: '',
      teams: []
    }

    const match: Match = {
      id: 'm1',
      finished: false,
      postponed: false,
      canceled: false,
      periods: [period(1, 1, 2), period(2, 3, 4)],
      facility: 'Facility 1',
      date: new Date(2023, 9, 11, 19, 15, 0), //gmt
      homeTeam: team(1, 1),
      awayTeam: team(2, 2),
      homeTeamResult: 4,
      awayTeamResult: 6,
      round: round(1, 1),
      faceoffId: 'f1',
      tournament
    }

    expect(matches).toEqual([match])
  })

  it('Maps groups', () => {
    const mapper = new GroupsMapper(GroupsFixture)
    const groups = mapper.mapGroups()

    const group1: Group = {
      id: 'g1',
      name: 'Group 1',
      type: 'league',
      promote: 0,
      relegate: 0,
      standings: [],
      rounds: [
        round(1, 1),
        round(2, 1)
      ],
    }

    const group2: Group = {
      id: 'g2',
      name: 'Group 2',
      type: 'play_off',
      promote: 0,
      relegate: 0,
      standings: [],
      rounds: [
        {
          ...round(3, 2),
          order: 1,
          faceoffs: [
            {
              id: 'f1',
              firstText: 'aaa',
              secondText: 'bbb',
              winner: 'first',
              firstTeam: team(1, 1),
              secondTeam: team(2, 2)
            },
            {
              id: 'f2',
              firstText: 'ccc',
              secondText: 'ddd',
              winner: 'second',
              firstTeam: team(3, 3),
              secondTeam: team(4, 4)
            }                       
          ]
        },
        {
          ...round(4, 2),
          order: 2,
          faceoffs: [
            {
              id: 'f3',
              firstText: 'eee',
              secondText: 'fff',
              winner: 'second',
              firstPreviousFaceoffId: 'f1',
              secondPreviousFaceoffId: 'f2',
              firstTeam: team(1, 1),
              secondTeam: team(4, 4)
            }  
          ]
        }
      ],
    }

    expect(groups).toEqual([group1, group2])
  })
});
