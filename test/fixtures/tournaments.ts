import { TournamentsApiResponse } from "../../src/tournament/ApiResponse";

const tournaments: TournamentsApiResponse = {
  data: [
    {
      type: "tournament",
      id: "t1",
      attributes: {
        gender: "male",
        modality: "teams",
        name: "Tournament 1",
        status: "in_progress",
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
      type: "tournament",
      id: "t2",
      attributes: {
        gender: "male",
        modality: "teams",
        name: "Tournament 2",
        status: "in_progress",
      },
      relationships: {
        category: { data: { type: "category", id: "c2" } },
        delegation: { data: { type: "delegation", id: "d2" } },
        discipline: { data: { type: "discipline", id: "d1" } },
        manager: { data: { type: "manager", id: "m1" } },
        season: { data: { type: "season", id: "s1" } },
        teams: { data: [{ type: "team", id: "te3" }, { type: "team", id: "te4" }] }
      }
    },
  ],
  included: [
    {
      type: "delegation",
      id: "d1",
      attributes: { name: "Delegation 1" }
    },
    {
      type: "delegation",
      id: "d2",
      attributes: { name: "delegation 2" }
    },
    {
      type: "club",
      id: "c1",
      attributes: {
        code: "c1",
        email: "club1@mail.com",
        name: "Club 1",
        phone: "111"
      },
      relationships: {
        delegation: { data: { type: "delegation", id: "d1" } },
        manager: { data: { type: "manager", id: "m1" } }
      }
    },
    {
      type: "club",
      id: "c2",
      attributes: {
        code: "c2",
        email: "club2@mail.cat",
        name: "Club 2",
        phone: "2222"
      },
      relationships: {
        delegation: { data: { type: "delegation", id: "d1" } },
        manager: { data: { type: "manager", id: "m1" } }
      }
    },

    {
      type: "category",
      id: "c1",
      attributes: {
        name: "Category 1",
      }
    },
    {
      type: "category",
      id: "c2",
      attributes: {
        name: "Category 2",
      }
    },    
    {
      type: "team",
      id: "te1",
      attributes: {
        name: "Team 1",
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
        name: "Team 2",
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
        name: "Team 3",
      },
      relationships: {
        category: { data: null },
        club: { data: { type: "club", id: "c1" } },
        registrable: { data: { type: "tournament", id: "t2" } }
      }
    },
    {
      type: "team",
      id: "te4",
      attributes: {
        name: "Team 4",
      },
      relationships: {
        category: { data: null },
        club: { data: { type: "club", id: "c2" } },
        registrable: { data: { type: "tournament", id: "t2" } }
      }
    }
  ]
}

export default tournaments
