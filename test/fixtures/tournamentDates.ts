import { TournamentDatesApiResponse } from "../../src/match/ApiResponse";

const matches: TournamentDatesApiResponse = {
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
        faceoff: { data: null },
        facility: { data: { type: "facility", id: "fa1" } },
        round: { data: { type: "round", id: "r1" } }
      }
    }
  ]
}

export default matches