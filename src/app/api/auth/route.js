import { dbConnect } from '@/db'
import UserModel from '@/db/models/user'
import { NextResponse } from 'next/server'
dbConnect()

export const POST = async (req) => {
  const body = await req.json()
  const isUser = await UserModel.findOne({ email: body.email })
  if (!isUser) {
    try {
      // create new user
      const newUser = new UserModel({
        role: body.role,
        ...body
      })
      await newUser.save()
      return NextResponse.json({ message: 'sign up', data: newUser }, { status: 201 })
    } catch (error) {
      console.error(error)
      return NextResponse.json({ message: 'Eror', error }, { status: 406 })
    }
  } else {
    // login success
    return NextResponse.json({ message: 'sign in', data: isUser }, { status: 200 })
  }
}
