import express, { Request, Response } from 'express';
import { MATCH_NOT_FOUND, NOT_VALID_ID } from '../messages';
import MatchService from '../match/Service';

const router = express.Router();
const matchService = new MatchService()

router.get('/:matchId', async (req: Request, res: Response) => {
  const matchId = +req.params.matchId;
  if (Number.isNaN(matchId)) return res.status(400).json({ message: NOT_VALID_ID });

  const { match, maxAge } = await matchService.getMatch(matchId);
  if (!match) return res.status(404).json({ message: MATCH_NOT_FOUND });

  res.setHeader('Cache-Control', `max-age=${maxAge}`);
  return res.status(200).json(match);
});

export default router;
