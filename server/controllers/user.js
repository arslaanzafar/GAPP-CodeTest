import UserModel from "../models/user.js"

import { ErrorMessage } from "../middleware/constant.js"

export const getUser = async (req, res) => {

    try {

        const { userID } = req.params

        if (userID) {
            await UserModel.findOne({ _id: userID }).exec((error, user) => {

                try {
                    res.status(200).json(user)
                } catch (error) {
                    res.status(400).json([ErrorMessage.SERVER_ERROR])
                }
            })
        } else {
            res.status(400).json(["UserID is missing"])
        }

    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }

}


export const getUsers = async (req, res) => {
    try {
        res.status(200).json(res.paginatedResult)
    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }
}


export const createUser = async (req, res) => {
    try {

        const { name } = req.body

        const user = new UserModel({
            name: name
        })

        try {

            await user.save()

            res.status(200).json(["User added"])

        } catch (error) {
            res.status(400).json([ErrorMessage.SERVER_ERROR])
        }

    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }
}

export const updateUser = async (req, res) => {

    try {

        const { name } = req.body

        const { userID } = req.params

        if (userID) {

            await UserModel.findOne({ _id: userID }).exec(async (error, user) => {

                try {

                    user.set({ name: name })

                    await UserModel.findByIdAndUpdate(user._id, user, { new: true })

                    res.status(200).json(["User Updated"])

                } catch (error) {
                    res.status(400).json([ErrorMessage.SERVER_ERROR])
                }

            })
        } else {
            res.status(400).json(["UserID is missing"])
        }

    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }
}

export const deleteUser = async (req, res) => {
    try {

        const { userID } = req.params;

        if (userID) {

            try {

                await UserModel.findByIdAndRemove(user._id)

                res.status(200).json(["User Deleted"])

            } catch (error) {
                res.status(400).json([ErrorMessage.SERVER_ERROR])
            }
        } else {
            res.status(400).json(["User ID is missing"])
        }

    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }
}

