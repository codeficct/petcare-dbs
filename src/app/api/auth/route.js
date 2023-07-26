import { dbConnect } from '@/db'
import UserModel from '@/db/models/user'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  try {
    await dbConnect()
    const body = await req.json()
    const isUser = await UserModel.findOne({ email: body.email })
    if (!isUser) {
      // create new user
      const newUser = new UserModel({
        role: body.role,
        ...body
      })
      await newUser.save()
      return NextResponse.json({ message: 'sign up', data: newUser }, { status: 201 })
    } else {
      // login success
      return NextResponse.json({ message: 'sign in', data: isUser }, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json({ message: 'Eror', error }, { status: 406 })
  }
}
