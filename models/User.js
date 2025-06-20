import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  score: {
    phase1: { type: Number, default: 0 }, // 0 ~ 2
    phase2: { type: Number, default: 0 }, // 0 ~ 2
    phase3: { type: Number, default: 0 }  // 0 ~ 2
  }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)
