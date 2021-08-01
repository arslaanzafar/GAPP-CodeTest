import DepartmentModel from "../models/department.js"

import { ErrorMessage } from "../middleware/constant.js"

export const getDepartment = async (req, res) => {

    try {

        const { departmentID } = req.params

        if (departmentID) {
            await UserModel.findOne({ _id: departmentID }).exec((error, department) => {

                try {
                    res.status(200).json(department)
                } catch (error) {
                    res.status(400).json([ErrorMessage.SERVER_ERROR])
                }
            })
        } else {
            res.status(400).json(["DepartmentID is missing"])
        }

    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }

}


export const getDepartments = async (req, res) => {
    try {
        res.status(200).json(res.paginatedResult)
    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }
}


export const createDepartment = async (req, res) => {
    try {

        const { name, teams, inCharge } = req.body

        const department = new DepartmentModel({
            name: name,
            teams: teams,
            inCharge: inCharge,
        })

        try {

            await department.save()

            res.status(200).json(["Department added"])

        } catch (error) {
            res.status(400).json([ErrorMessage.SERVER_ERROR])
        }

    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }
}

export const updateDepartment = async (req, res) => {

    try {

        const { name, teams, inCharge } = req.body

        const { departmentID } = req.params

        if (departmentID) {

            await UserModel.findOne({ _id: departmentID }).exec(async (error, department) => {

                try {

                    department.set({
                        name: name,
                        teams: teams,
                        inCharge: inCharge,
                    })

                    await UserModel.findByIdAndUpdate(department._id, department, { new: true })

                    res.status(200).json(await TeamModel.findOne({ _id: departmentID }))

                } catch (error) {
                    res.status(400).json([ErrorMessage.SERVER_ERROR])
                }

            })
        } else {
            res.status(400).json(["DepartmentID is missing"])
        }

    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }
}

export const deleteDepartment = async (req, res) => {
    try {

        const { departmentID } = req.params;

        if (departmentID) {

            try {

                await DepartmentModel.findByIdAndRemove(departmentID)

                res.status(200).json(["Department Deleted"])

            } catch (error) {
                res.status(400).json([ErrorMessage.SERVER_ERROR])
            }
        } else {
            res.status(400).json(["Department ID is missing"])
        }

    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }
}

