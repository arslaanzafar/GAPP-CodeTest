import mongoose from 'mongoose'


const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    team: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TeamModel',
        }
    ],
    inCharge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    }

});

const DepartmentModel = mongoose.model("DepartmentModel", DepartmentSchema)

export default DepartmentModel