import UserModel from '@/db/models/user'
import PetModel from '@/db/models/pet'
import { dbConnect } from '@/db'
import { NextResponse } from 'next/server'

dbConnect()

export const GET = async (req, res) => {
  try {
    const id = req.url.split('pet/')[1]
    const pet = await PetModel.findById(id)
      .populate({
        path: 'owner', select: 'name photo email'
      })
      .populate({
        path: 'vaccines', select: 'nameVaccine dateVaccine'
      })
    return NextResponse.json(pet, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 406 })
  }
}

export const DELETE = async (req, res) => {
  try {
    const id = req.url.split('pet/')[1]
    const pet = await PetModel.findById(id)
    await UserModel.findByIdAndUpdate(pet.owner, {
      $pull: { pets: [id] }
    })
    await PetModel.findByIdAndDelete(id)
    return NextResponse.json({ message: 'deleted' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 406 })
  }
}
