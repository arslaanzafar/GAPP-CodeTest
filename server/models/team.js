import mongoose from 'mongoose'


const TeamSchema = new mongoose.Schema({
    team_id: {
        type: Integer,
        required: true,
        trim: true,
        unique: true,
    },
    people: [
        []
    ],
    teamLead: {
        type: String,
        trim: true,
        required: true,
    }

});

const TeamModel = mongoose.model("TeamModel", TeamSchema)

export default TeamModel