import { dbConnect } from '@/db'
import UserModel from '@/db/models/user'
import { NextResponse } from 'next/server'

dbConnect()

export const GET = async (req, res) => {
  const users = await UserModel.find({})
  return NextResponse.json(users, { status: 200 })
}
