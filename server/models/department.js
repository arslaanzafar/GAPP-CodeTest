import mongoose from 'mongoose'


const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    teams: [
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

var autoPopulate = function(next) {
    this.populate('inCharge');
    this.populate('teams');
    next();
  };
  
  DepartmentSchema.
    pre('findOne', autoPopulate).
    pre('find', autoPopulate)

const DepartmentModel = mongoose.model("DepartmentModel", DepartmentSchema)

export default DepartmentModel