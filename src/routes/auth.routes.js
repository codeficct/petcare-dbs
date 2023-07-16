import { Router } from 'express'
import UserModel from '../models/user.js'

const router = Router()

const login = async (req, res) => {
  const isUser = await UserModel.findOne({ email: req.body.email })
  if (!isUser) {
    try {
      // create new user
      const newUser = new UserModel({
        role: req.body.role,
        ...req.body
      })
      await newUser.save()
      res.status(201).json({ message: 'User created' })
    } catch (error) {
      console.error(error)
      res.sendStatus(406)
    }
  } else {
    // login success
    res.status(200).json(isUser)
  }
}

router.post('/', login) // auth login

export default router
