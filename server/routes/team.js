import express from 'express'
import { getTeam, getTeams, updateTeam, deleteTeam, createTeam } from "../controllers/team.js"
import { paginate } from "../middleware/paginate.js"
import TeamModel from "../models/team.js"

const router = express.Router()

router.get('/teams/:teamID', getTeam)
router.post('/teams', createTeam)
router.get('/teams', paginate(TeamModel, 20), getTeams)
router.put('/teams/:teamID', updateTeam)
router.delete('/teams/:teamID', deleteTeam)

export default router