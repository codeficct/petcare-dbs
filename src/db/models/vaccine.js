import { Schema, model, models } from 'mongoose'

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
    ref: 'User',
    required: true
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  }
}, { timestamps: true })

export default models.Vaccine || model('Vaccine', vaccineSchema)
