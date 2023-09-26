import { GroupsApiResponse } from "../../src/group/ApiResponse";

const groups: GroupsApiResponse = {
  data: [
    {
      type: "group",
      id: "g1",
      attributes: {
        name: "Group 1",
        order: 1,
        type: "league",
        promote: 0,
        relegate: 0
      },
      relationships: {
        tournament: { data: { type: "tournament", id: "t1" } },
        rounds: { data: [{ type: "round", id: "r1" }, { type: "round", id: "r2" }] }
      }
    },
    {
      type: "group",
      id: "g2",
      attributes: {
        name: "Group 2",
        order: 2,
        type: "play_off",
        promote: 0,
        relegate: 0
      },
      relationships: {
        tournament: { data: { type: "tournament", id: "t1" } },
        rounds: { data: [{ type: "round", id: "r3" }, { type: "round", id: "r4" }] }
      }
    }
  ],
  included: [
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
      type: "team",
      id: "te3",
      attributes: {
        name: "Team 3"
      },
      relationships: {
        category: { data: null },
        club: { data: { type: "club", id: "c3" } },
        registrable: { data: { type: "tournament", id: "t1" } }
      }
    },
    {
      type: "team",
      id: "te4",
      attributes: {
        name: "Team 4"
      },
      relationships: {
        category: { data: null },
        club: { data: { type: "club", id: "c4" } },
        registrable: { data: { type: "tournament", id: "t1" } }
      }
    },
    {
      type: "faceoff",
      id: "f1",
      attributes: {
        first_text: "aaa",
        second_text: "bbb",
        winner: "first",
      },
      relationships: {
        first_previous_faceoff: { data: null },
        second_previous_faceoff: { data: null },
        first_team: { data: { type: "team", id: "te1" } },
        second_team: { data: { type: "team", id: "te2" } },
        round: { data: { type: "round", id: "r3" } }
      }
    },
    {
      type: "faceoff",
      id: "f2",
      attributes: {
        first_text: "ccc",
        second_text: "ddd",
        winner: "second",
      },
      relationships: {
        first_previous_faceoff: { data: null },
        second_previous_faceoff: { data: null },
        first_team: { data: { type: "team", id: "te3" } },
        second_team: { data: { type: "team", id: "te4" } },
        round: { data: { type: "round", id: "r3" } }
      }
    },
    {
      type: "faceoff",
      id: "f3",
      attributes: {
        first_text: "eee",
        second_text: "fff",
        winner: "second",
      },
      relationships: {
        first_previous_faceoff: { data: { type: "faceoff", id: "f1" } },
        second_previous_faceoff: { "data": { type: "faceoff", id: "f2" } },
        first_team: { data: { type: "team", id: "te1" } },
        second_team: { data: { type: "team", id: "te4" } },
        round: { data: { type: "round", id: "r4" } }
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
        faceoffs: { data: [] }
      }
    },
    {
      type: "round",
      id: "r2",
      attributes: {
        end_date: null,
        limit_date: null,
        name: "Round 2",
        order: 2,
        start_date: null,
      },
      relationships: {
        group: { data: { type: "group", id: "g1" } },
        faceoffs: { data: [] }
      }
    },
    {
      type: "round",
      id: "r3",
      attributes: {
        end_date: null,
        limit_date: null,
        name: "Round 3",
        order: 1,
        start_date: null
      },
      relationships: {
        group: { data: { type: "group", id: "g2" } },
        faceoffs: { data: [{ type: "faceoff", id: "f1" }, { type: "faceoff", id: "f2" }] }
      }
    },
    {
      type: "round",
      id: "r4",
      attributes: {
        end_date: null,
        limit_date: null,
        name: "Round 4",
        order: 2,
        start_date: null
      },
      relationships: {
        group: { data: { type: "group", id: "g2" } },
        faceoffs: { data: [{ type: "faceoff", id: "f3" }] }
      }
    }
  ]
}

export default groups