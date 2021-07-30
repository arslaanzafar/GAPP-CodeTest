import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    }

});

const UserModel = mongoose.model("UserModel", UserSchema)

export default UserModel