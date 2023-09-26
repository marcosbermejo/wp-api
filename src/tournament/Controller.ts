import express, { Request, Response } from 'express';
import { NOT_VALID_ID } from '../messages';
import MatchService from '../match/Service';
import TournamentService from './Service';
import GroupService from '../group/Service';

const router = express.Router();
const tournamentService = new TournamentService()
const matchService = new MatchService()
const groupService = new GroupService()

router.get('/', async (req: Request, res: Response) => {
  const { tournaments, maxAge } = await tournamentService.getTournaments();
  res.setHeader('Cache-Control', `max-age=${maxAge}`);
  return res.status(200).json(tournaments);
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = +req.params.id;
  if (Number.isNaN(id)) return res.status(400).json({ message: NOT_VALID_ID });

  const { dates, maxAge } = await matchService.getTournamentDates(id);
  res.setHeader('Cache-Control', `max-age=${maxAge}`);
  return res.status(200).json(dates);
});

router.get('/:id/groups', async (req: Request, res: Response) => {
  const id = +req.params.id;
  if (Number.isNaN(id)) return res.status(400).json({ message: NOT_VALID_ID });

  const { groups, maxAge } = await groupService.getGroups(id);
  res.setHeader('Cache-Control', `max-age=${maxAge}`);
  return res.status(200).json(groups);
});

export default router;
