import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    gender: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    score: {
      phase1: { type: [Number], default: [0, 0] }, // [forward, backward]
      phase2: { type: [Number], default: [0, 0] },
      phase3: { type: [Number], default: [0, 0] },
      phase4: { type: [Number], default: [0, 0] },
      phase5: { type: [Number], default: [0, 0] },
      phase6: { type: [Number], default: [0, 0] },
      phase7: { type: [Number], default: [0, 0] },
      phase8: { type: [Number], default: [0, 0] },
    },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
