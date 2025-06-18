import { NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import User from '@/models/User' // مدلتو جدا بساز

function generateUsername() {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

export async function POST(req) {
  await connectToDB()
  const { age, gender } = await req.json()

  let username
  let exists = true

  while (exists) {
    username = generateUsername()
    const user = await User.findOne({ username })
    if (!user) exists = false
  }

  const newUser = await User.create({ age, gender, username })

  return NextResponse.json({ username })
}
