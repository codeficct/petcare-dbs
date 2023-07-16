import { Schema, model } from 'mongoose'

const petScheme = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  photo: String,
  pet: {
    type: String,
    required: [true, 'pet is required'],
    trim: true,
    enum: ['dog', 'cat', 'bird', 'turtle', 'hamster', 'other']
  },
  birthdate: String,
  race: String,
  vaccines: [{
    type: Schema.Types.ObjectId,
    ref: 'Vaccine'
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  died: {
    type: Boolean,
    default: false
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  }
}, { timestamps: true })

export default model('Pet', petScheme)
