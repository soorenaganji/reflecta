import mongoose from 'mongoose';

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "Reflecta" });
    return Response.json({ status: 'ok', message: 'MongoDB connection successful!' });
  } catch (error) {
    return Response.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
