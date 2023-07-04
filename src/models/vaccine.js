import { Schema, model } from 'mongoose'

const vaccineSchema = new Schema({
  nameVaccine: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  dateVaccine: {
    type: String,
    required: [true, 'Date is required'],
    trim: true
  },
  veterinary: {
    type: Schema.Types.ObjectId,
    ref: 'Veterinary'
  }
}, { timestamps: true })

export default model('Vaccine', vaccineSchema)
