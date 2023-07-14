import { Scheme, model } from 'mongoose'

const petScheme = new Scheme({
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
    type: Scheme.Types.ObjectId,
    ref: 'Vaccine'
  }],
  owner: {
    type: Scheme.Types.ObjectId,
    ref: 'User'
  },
  died: {
    type: Boolean,
    default: false
  },
  gender: {
    type: String,
    enum: ['macho', 'hembra']
  }
}, { timestamps: true })

export default model('Pet', petScheme)
