import { Schema, model } from 'mongoose'

const vetSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  photo: String,
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email is required']
  },
  phone: String,
  address: String,
  pets: [{
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }]
}, { timestamps: true })

export default model('Veterinary', vetSchema)
