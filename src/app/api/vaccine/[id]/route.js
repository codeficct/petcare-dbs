import { dbConnect } from '@/db'
import VaccineModel from '@/db/models/vaccine'
import PetModel from '@/db/models/pet'
import { NextResponse } from 'next/server'


export const GET = async (req, res) => {
  try {
    await dbConnect()
    const id = req.url.split('vaccine/')[1]
    const vaccine = await VaccineModel.findById(id)
      .populate({
        path: 'veterinary', select: 'name photo email'
      }).populate({
        path: 'pet', select: 'name photo pet race gender birthdate'
      })
    return NextResponse.json(vaccine, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 406 })
  }
}

export const PUT = async (req, res) => {
  try {
    await dbConnect()
    const body = await req.json()
    const id = req.url.split('vaccine/')[1]
    const vaccine = await VaccineModel.findById(id)
    if (vaccine !== null) {
      await VaccineModel.findByIdAndUpdate(id, {
        nameVaccine: body.nameVaccine, dateVaccine: body.dateVaccine
      }, { new: true })
      return NextResponse.json({ message: 'update vaccine' }, { status: 201 })
    } else {
      return NextResponse.json({ message: 'vaccine not found' }, { status: 204 })
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 406 })
  }
}

export const DELETE = async (req, res) => {
  try {
    await dbConnect()
    const id = req.url.split('vaccine/')[1]
    const vaccine = await VaccineModel.findById(id)
    const pet = await PetModel.findById(vaccine.pet)
    await PetModel.findByIdAndUpdate(vaccine.pet, {
      $pull: { vaccines: [id] }
    })
    await PetModel.findByIdAndUpdate(vaccine.veterinary, {
      $pull: { vaccines: [pet._id] }
    })
    await VaccineModel.findByIdAndDelete(id)
    return NextResponse.json({ message: 'deleted' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 })
  }
}
