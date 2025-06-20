import mongoose from 'mongoose'

let isConnected = false // جلوگیری از اتصال مجدد

export const connectToDB = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Reflecta', // اسم دیتابیسی که تو URI دادی
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw error
  }
}
