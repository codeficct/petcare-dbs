import { dbConnect } from '@/db'
import VaccineModel from '@/db/models/vaccine'
import PetModel from '@/db/models/pet'
import UserModel from '@/db/models/user'
import { NextResponse } from 'next/server'

dbConnect()

export const GET = async (req, res) => {
  const vaccines = await VaccineModel.find({})
  return NextResponse.json(vaccines, { status: 200 })
}

export const POST = async (req, res) => {
  try {
    const body = await req.json()
    const existPet = await PetModel.findById(body.pet)
    const existVet = await UserModel.findById(body.veterinary)
    if (!existPet) {
      return NextResponse.json({ message: 'pet not found' }, { status: 404 })
    }
    if (!existVet) {
      return NextResponse.json({ message: 'veterinary not found' }, { status: 404 })
    }
    const newVaccine = new VaccineModel(body)
    await newVaccine.save()
    await PetModel.findByIdAndUpdate(body.pet, {
      $push: { vaccines: [newVaccine._id] }
    })
    await UserModel.findByIdAndUpdate(body.veterinary, {
      $push: { pets: [body.pet] }
    })
    return NextResponse.json({ message: 'vaccine created' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 406 })
  }
}
