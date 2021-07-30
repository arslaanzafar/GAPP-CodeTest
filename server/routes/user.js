import express from 'express'
import { getUser, getUsers, updateUser, deleteUser, createUser } from "../controllers/user.js"
import { paginate } from "../middleware/paginate.js"
import UserModel from "../models/user.js"

const router = express.Router()

router.get('/users/:userID', getUser)
router.post('/users', createUser)
router.get('/users', paginate(UserModel, 20), getUsers)
router.put('/users/:userID', updateUser)
router.delete('/users/:userID', deleteUser)

export default router