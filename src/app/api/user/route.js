import { dbConnect } from '@/db'
import UserModel from '@/db/models/user'
import { NextResponse } from 'next/server'

export const GET = async (req, res) => {
  await dbConnect()
  const users = await UserModel.find({})
  return NextResponse.json(users, { status: 200 })
}
