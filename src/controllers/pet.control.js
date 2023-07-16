import PetModel from '../models/pet.js'

export const craetePet = async (req, res) => {
  try {
    console.log(req.body)
    const newPet = new PetModel(req.body)
    await newPet.save()
    res.sendStatus(201)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(406)
  }
}

export const getPet = async (req, res) => {
  try {
    let pet = null
    if (req.params.role === 'vet') {
      pet = await PetModel.findById(req.params.id).populate({
        path: 'owner', select: 'name photo email'
      })
    } else {
      const haveVaccination = await PetModel.findById(req.params.id)
      if (haveVaccination.vaccines.length > 0) {
        pet = await PetModel.findById(req.params.id).populate({
          path: 'vaccines', select: 'nameVaccine dateVaccine'
        })
      } else {
        pet = await PetModel.findById(req.params.id)
      }
    }
    res.status(200).json(pet)
  } catch (error) {
    console.log(error)
    res.sendStatus(406)
  }
}

export const getAllPets = async (req, res) => {
  const pets = await PetModel.find({})
  res.status(200).json(pets)
}

export const deletePet = async (req, res) => {
  try {
    await PetModel.findByIdAndDelete(req.params.id)
    res.sendStatus(404)
  } catch (error) {
    res.sendStatus(406)
  }
}
