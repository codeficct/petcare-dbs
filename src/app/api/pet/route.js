import { dbConnect } from '@/db'
import PetModel from '@/db/models/pet'
import UserModel from '@/db/models/user'
import { NextResponse } from 'next/server'


export const GET = async (req) => {
  try {
    await dbConnect()
    const pets = await PetModel.find({}).populate({
      path: 'owner', select: 'name photo email'
    })
    return NextResponse.json(pets, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 406 })
  }
}

export const POST = async (req, res) => {
  try {
    await dbConnect()
    const body = await req.json()
    const existOwner = await UserModel.findById(body.owner)
    if (!existOwner) {
      return NextResponse.json({ message: 'owner not found' }, { status: 404 })
    }
    const newPet = new PetModel(body)
    await newPet.save()
    await UserModel.findByIdAndUpdate(body.owner, {
      $push: { pets: [newPet._id] }
    })
    return NextResponse.json({ message: 'pet created' }, { status: 201 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ message: 'pet not created' }, { status: 406 })
  }
}
