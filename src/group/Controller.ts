import express, { Request, Response } from 'express';
import { NOT_VALID_ID, NOT_VALID_PAGE } from '../messages';
import MatchService from '../match/Service';

const router = express.Router();
const matchService = new MatchService()

router.get('/:groupId/matches', async (req: Request, res: Response) => {
  const groupId = +req.params.groupId;
  if (Number.isNaN(groupId)) return res.status(400).json({ message: NOT_VALID_ID });

  const page = req.query.page ? +req.query.page : 1
  if (Number.isNaN(page)) return res.status(400).json({ message: NOT_VALID_PAGE });

  const { matches, maxAge } = await matchService.getGroupMatches(groupId, page);

  res.setHeader('Cache-Control', `max-age=${maxAge}`);
  return res.status(200).json(matches);
});

export default router;
