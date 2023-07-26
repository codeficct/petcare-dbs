import { dbConnect } from '@/db'
import UserModel from '@/db/models/user'
import { NextResponse } from 'next/server'

dbConnect()

export const GET = async (req, res) => {
  try {
    const email = req.url.split('user/')[1]
    const user = await UserModel.findOne({ email: email })
      .populate({
        path: 'pets', select: 'name photo pet birthdate race died'
      })
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 406 })
  }
}
