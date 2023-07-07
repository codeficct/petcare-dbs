import UserModel from '../models/user.js'

export const login = async (req, res) => {
  console.log('Hello from login')
  const isUser = await UserModel.findOne({ email: req.body.email })
  if (!isUser === null) {
    try {
      // create new user
      const newUser = new UserModel(req.body)
      await newUser.save()
      res.status(201).json(newUser)
    } catch (error) {
      console.error(error)
      res.sendStatus(406)
    }
  } else {
    // login success
    res.status(200).json(isUser)
  }
}

// TODO: get user by id, get all users to test

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
