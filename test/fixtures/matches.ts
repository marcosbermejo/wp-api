import { MatchesApiResponse } from "../../src/match/ApiResponse";

const matches: MatchesApiResponse = {
  data: [
    {
      type: "match",
      id: "m1",
      attributes: {
        datetime: "2023-10-11 17:15:00",
        finished: false,
        canceled: false,
        postponed: false
      },
      meta: {
        home_team: "te1",
        away_team: "te2"
      },
      relationships: {
        faceoff: { data: { type: "faceoff", id: "f1" } },
        facility: { data: { type: "facility", id: "fa1" } },
        round: { data: { type: "round", id: "r1" } },
        periods: { data: [{ type: "period", id: "p1" }, { type: "period", id: "p2" }] },
        results: { data: [{ type: "result", id: "res1" }, { type: "result", id: "res2" }] },
        teams: { data: [{ type: "team", id: "te1" }, { type: "team", id: "te2" }] }
      }
    }
  ],
  included: [
    {
      type: "result",
      id: "res1",
      attributes: {
        value: 1,
        score: 0,
      },
      relationships: {
        match: { data: { id: "m1", type: "match" } },
        parent: { data: { id: "p1", type: "period" } },
        team: { data: { id: "te1", type: "team" } },
        period: { data: { type: "period", id: "p1" } }
      }
    },
    {
      type: "result",
      id: "res2",
      attributes: {
        value: 2,
        score: 0,
      },
      relationships: {
        match: { data: { id: "m1", type: "match" } },
        parent: { data: { id: "p1", type: "period" } },
        team: { data: { id: "te2", type: "team" } },
        period: { data: { type: "period", id: "p1" } }
      }
    },
    {
      type: "result",
      id: "res3",
      attributes: {
        value: 3,
        score: 0,
      },
      relationships: {
        match: { data: { id: "m1", type: "match" } },
        parent: { data: { id: "p2", type: "period" } },
        team: { data: { id: "te1", type: "team" } },
        period: { data: { type: "period", id: "p2" } }
      }
    },
    {
      type: "result",
      id: "res4",
      attributes: {
        value: 4,
        score: 0,
      },
      relationships: {
        match: { data: { id: "m1", type: "match" } },
        parent: { data: { id: "p2", type: "period" } },
        team: { data: { id: "te2", type: "team" } },
        period: { data: { type: "period", id: "p2" } }
      }
    },
    {
      type: "tournament",
      id: "t1",
      attributes: {
        gender: "female",
        modality: "teams",
        name: "Tournament 1",
        status: "in_progress"
      },
      relationships: {
        category: { data: { type: "category", id: "c1" } },
        delegation: { data: { type: "delegation", id: "d1" } },
        discipline: { data: { type: "discipline", id: "d1" } },
        manager: { data: { type: "manager", id: "m1" } },
        season: { data: { type: "season", id: "s1" } },
        teams: { data: [{ type: "team", id: "te1" }, { type: "team", id: "te2" }] }
      }
    },
    {
      type: "group",
      id: "g1",
      attributes: {
        name: "Group 1",
        order: 1,
        type: "play_off",
        promote: 0,
        relegate: 0,
      },
      relationships: {
        tournament: { data: { type: "tournament", id: "t1" } },
        rounds: { data: [{ type: "round", id: "r1" }] }
      }
    },
    {
      type: "facility",
      id: "fa1",
      attributes: {
        active: true,
        latitude: 41.56007839999999,
        longitude: 2.088204000000019,
        name: "Facility 1",
        address: null,
        postal_code: null,
        city: null,
        province: null,
        phone: null
      },
      relationships: {
        manager: { data: { type: "manager", id: "m1" } }
      }
    },
    {
      type: "period",
      id: "p1",
      attributes: {
        finished: true,
        name: "Period 1",
        order: 1
      },
      relationships: {
        periodable: { data: { type: "match", id: "m1" } },
        results: { data: [{ type: "result", id: "res1" }, { type: "result", id: "res2" }] }
      }
    },
    {
      type: "period",
      id: "p2",
      attributes: {
        finished: true,
        name: "Period 2",
        order: 2,
      },
      relationships: {
        periodable: { data: { type: "match", id: "m1" } },
        results: { data: [{ type: "result", id: "res3" }, { type: "result", id: "res4" }] }
      }
    },

    {
      type: "result",
      id: "res5",
      attributes: {
        value: 4,
        score: 0,
      },
      relationships: {
        match: { data: { id: "m1", type: "match" } },
        parent: { data: { id: "m1", type: "match" } },
        team: { data: { id: "te1", type: "team" } },
        period: { data: null }
      }
    },
    {
      type: "result",
      id: "res6",
      attributes: {
        value: 6,
        score: 0
      },
      relationships: {
        match: { data: { id: "m1", type: "match" } },
        parent: { data: { id: "m1", type: "match" } },
        team: { data: { id: "te2", type: "team" } },
        period: { data: null }
      }
    },
    {
      type: "round",
      id: "r1",
      attributes: {
        end_date: null,
        limit_date: null,
        name: "Round 1",
        order: 1,
        start_date: null,
      },
      relationships: {
        group: { data: { type: "group", id: "g1" } },
        faceoffs: { data: null }
      }
    },
    {
      type: "team",
      id: "te1",
      attributes: {
        name: "Team 1"
      },
      relationships: {
        category: { data: null },
        club: { data: { type: "club", id: "c1" } },
        registrable: { data: { type: "tournament", id: "t1" } }
      }
    },
    {
      type: "team",
      id: "te2",
      attributes: {
        name: "Team 2"
      },
      relationships: {
        category: { data: null },
        club: { data: { type: "club", id: "c2" } },
        registrable: { data: { type: "tournament", id: "t1" } }
      }
    },
    {
      type: "matchreferee",
      id: "mr1",
      attributes: {
        attendance: "confirmed",
        published: true,
      },
      relationships: {
        match: { data: { type: "match", id: "m1" } },
        license: { data: { type: "license", id: "l1" } },
        office: { data: { type: "office", id: "o1" } }
      }
    },
    {
      type: "license",
      id: "l1",
      attributes: {
        type: "referee",
        number: null
      },
      relationships: {
        category: { data: null },
        club: { data: { type: "club", id: "c1" } },
        delegation: { data: null },
        discipline: { data: { type: "discipline", id: "d1" } },
        form: { data: { type: "form", id: "f1" } },
        office: { data: { type: "office", id: "o1" } },
        profile: { data: { type: "profile", id: "p1" } },
        refereecategory: { data: null },
        season: { data: { type: "season", id: "s1" } }
      }
    },
    {
      type: "profile",
      id: "p1",
      attributes: {
        birthdate: "1985-12-25",
        first_name: "Marcos",
        gender: "male",
        last_name: "Bermejo",
        nationality: "es",
        number: "08031"
      }
    },
  ]
}

export default matches