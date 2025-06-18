import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  age: Number,
  gender: String,
  username: { type: String, unique: true }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
