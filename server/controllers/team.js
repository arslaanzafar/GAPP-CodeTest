import TeamModel from "../models/team.js"

import { ErrorMessage } from "../middleware/constant.js"

export const getTeam = async (req, res) => {

    try {

        const { teamID } = req.params

        if (teamID) {
            await UserModel.findOne({ _id: teamID }).exec((error, team) => {

                try {
                    res.status(200).json(team)
                } catch (error) {
                    res.status(400).json([ErrorMessage.SERVER_ERROR])
                }
            })
        } else {
            res.status(400).json(["TeamID is missing"])
        }

    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }

}


export const getTeams = async (req, res) => {
    try {
        res.status(200).json(res.paginatedResult)
    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }
}


export const createTeam = async (req, res) => {
    try {

        const { people, teamLead } = req.body

        const team = new TeamModel({
            people: people,
            teamLead: teamLead,
        })

        try {

            await team.save()

            res.status(200).json(["Team added"])

        } catch (error) {
            res.status(400).json([ErrorMessage.SERVER_ERROR])
        }

    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }
}

export const updateTeam = async (req, res) => {

    try {

        const { people, teamLead } = req.body

        const { teamID } = req.params

        if (teamID) {

            await UserModel.findOne({ _id: teamID }).exec(async (error, team) => {

                try {

                    team.set({ people: people,
                        teamLead: teamLead, })

                    await UserModel.findByIdAndUpdate(team._id, team, { new: true })

                    res.status(200).json(["Team Updated"])

                } catch (error) {
                    res.status(400).json([ErrorMessage.SERVER_ERROR])
                }

            })
        } else {
            res.status(400).json(["TeamID is missing"])
        }

    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }
}

export const deleteTeam = async (req, res) => {
    try {

        const { teamID } = req.params;

        if (teamID) {

            try {

                await TeamModel.findByIdAndRemove(team._id)

                res.status(200).json(["Team Deleted"])

            } catch (error) {
                res.status(400).json([ErrorMessage.SERVER_ERROR])
            }
        } else {
            res.status(400).json(["Team ID is missing"])
        }

    } catch (error) {
        res.status(400).json([ErrorMessage.SERVER_ERROR])
    }
}

