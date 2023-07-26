import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  role: {
    type: String,
    enum: ['user', 'vet'],
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email is required']
  },
  photo: {
    type: String,
    required: true
  },
  pets: [{
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }]
}, { timestamps: true })

export default models.User || model('User', userSchema)
