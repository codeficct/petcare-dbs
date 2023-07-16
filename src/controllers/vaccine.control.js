import VaccineModel from '../models/vaccine.js'

export const getVaccine = async (req, res) => {
  try {
    const vaccine = await VaccineModel.findById(req.params.id)
      .populate({
        path: 'veterinary', select: 'name photo email'
      })
    res.status(200).json(vaccine)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(406)
  }
}

export const getAllVaccines = async (req, res) => {
  const vaccines = await VaccineModel.find({})
  res.status(200).json(vaccines)
}

export const createVaccine = async (req, res) => {
  try {
    const newVaccine = new VaccineModel(req.body)
    await newVaccine.save()
    res.sendStatus(201)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(406)
  }
}

export const updateVaccine = async (req, res) => {
  try {
    const vaccine = await VaccineModel.findById(req.params.id)
    if (vaccine !== null) {
      await VaccineModel.findByIdAndUpdate(req.params.id, {
        nameVaccine: req.body.nameVaccine, dateVaccine: req.body.dateVaccine
      }, { new: true })
      res.status(201).json({ message: 'update vaccine' })
    } else {
      res.status(204).json({ message: 'vaccine not found' })
    }
  } catch (error) {
    res.sendStatus(406)
  }
}

export const deleteVaccine = async (req, res) => {
  try {
    await VaccineModel.findByIdAndDelete(req.params.id)
    res.sendStatus(404)
  } catch (error) {
    res.sendStatus(400)
  }
}
