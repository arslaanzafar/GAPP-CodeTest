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

var autoPopulate = function(next) {
    this.populate('teamLead');
    this.populate('people');
    next();
  };
  
  TeamSchema.
    pre('findOne', autoPopulate).
    pre('find', autoPopulate);

const TeamModel = mongoose.model("TeamModel", TeamSchema)

export default TeamModel