import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
    user_id: {
        type: Integer,
        required: true,
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    }

});

const UserModel = mongoose.model("UserModel", UserSchema)

export default UserModel