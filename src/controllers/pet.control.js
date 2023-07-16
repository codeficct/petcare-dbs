import PetModel from '../models/pet.js'
import UserModel from '../models/user.js'

export const craetePet = async (req, res) => {
  try {
    const newPet = new PetModel(req.body)
    await newPet.save()
    await UserModel.findByIdAndUpdate(req.body.owner, {
      $push: { pets: [newPet._id] }
    })
    res.sendStatus(201)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(406)
  }
}

export const getPet = async (req, res) => {
  try {
    let pet
    if (req.params.role === 'vet') {
      pet = await PetModel.findById(req.params.id)
        .populate({
          path: 'owner', select: 'name photo email'
        })
        .populate({
          path: 'vaccines', select: 'nameVaccine dateVaccine'
        })
    } else {
      pet = await PetModel.findById(req.params.id).populate({
        path: 'vaccines', select: 'nameVaccine dateVaccine'
      })
    }
    res.status(200).json(pet)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(406)
  }
}

export const getAllPets = async (req, res) => {
  const pets = await PetModel.find({})
  res.status(200).json(pets)
}

export const deletePet = async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.id)
    await UserModel.findByIdAndUpdate(pet.owner, {
      $pull: { pets: [req.params.id] }
    })
    await PetModel.findByIdAndDelete(req.params.id)
    res.sendStatus(404)
  } catch (error) {
    res.sendStatus(406)
  }
}
