import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique:true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique:true,
      },
      password: {
        type: String,
        required: true,
      },
      updated: Date,
      created: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.model('User',UserSchema);