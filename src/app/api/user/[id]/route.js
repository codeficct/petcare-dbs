import { dbConnect } from '@/db'
import UserModel from '@/db/models/user'
import { NextResponse } from 'next/server'

dbConnect()

export const GET = async (req, res) => {
  try {
    const id = req.url.split('user/')[1]
    console.log(id)
    const user = await UserModel.findById(id)
      .populate({
        path: 'pets', select: 'name photo pet birthdate race died'
      })
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 406 })
  }
}

export const PUT = async (req, res) => {
  try {
    const id = req.url.split('user/')[1]
    const body = await req.json()
    const user = await UserModel.findById(id)
    if (user !== null) {
      await UserModel.findByIdAndUpdate(id, {
        name: body.name, photo: body.photo
      }, { new: true })
      return NextResponse.json({ message: 'update user' }, { status: 201 })
    } else {
      return NextResponse.json({ message: 'user not found' }, { status: 204 })
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 406 })
  }
}
