import mongoose from 'mongoose'


const TeamSchema = new mongoose.Schema({
    people: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
        }
    ],
    teamLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    }

});

const TeamModel = mongoose.model("TeamModel", TeamSchema)

export default TeamModel