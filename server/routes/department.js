import express from 'express'
import { getDepartment, getDepartments, updateDepartment, deleteDepartment, createDepartment } from "../controllers/department.js"
import { paginate } from "../middleware/paginate.js"
import DepartmentModel from "../models/department.js"

const router = express.Router()

router.get('/departments/:departmentID', getDepartment)
router.post('/departments', createDepartment)
router.get('/departments', paginate(DepartmentModel, 20), getDepartments)
router.put('/departments/:departmentID', updateDepartment)
router.delete('/departments/:departmentID', deleteDepartment)

export default router