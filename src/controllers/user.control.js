import UserModel from '../models/user.js'

export const getUser = async (req, res) => {
  try {
    const isEmail = req.params.id.includes('@')
    const user = await UserModel.findOne({ [isEmail ? 'email' : '_id']: req.params.id })
      .populate({
        path: 'pets', select: 'name photo pet birthdate race died'
      })
    res.status(200).json(user)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(406)
  }
}

export const getUsers = async (req, res) => {
  const users = await UserModel.find({})
  res.json(users)
}

export const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (user !== null) {
      await UserModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name, photo: req.body.photo
      }, { new: true })
      res.status(201).json({ message: 'update user' })
    } else {
      res.status(204).json({ message: 'user not found' })
    }
  } catch (error) {
    res.sendStatus(406)
  }
}

export const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id)
    res.sendStatus(404)
  } catch (error) {
    res.sendStatus(400)
  }
}
