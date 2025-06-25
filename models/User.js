import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  code: { type: String, required: true },
  gender: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  score: {
    forward: { type: Number, default: 0 },
    backward: { type: Number, default: 0 },
  }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)
