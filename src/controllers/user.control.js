import UserModel from '../models/user.js'

export const login = async (req, res) => {
  const isUser = await UserModel.findOne({ email: req.body.email })
  console.log(isUser)
  if (!isUser) {
    try {
      // create new user
      const newUser = new UserModel(req.body)
      await newUser.save()
      res.status(201).json({ message: 'User created' })
    } catch (error) {
      console.error(error)
      res.sendStatus(406)
    }
  } else {
    // login success
    res.status(200).json({ message: 'user authenticated' })
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
      .populate({
        path: 'pets', select: 'name photo pet birthdate race died'
      })
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
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
    console.log(user)
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
