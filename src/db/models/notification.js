import { Schema, model, models } from 'mongoose'

const notificationSchema = new Schema({
  title: String,
  description: String
}, {
  timestamps: true
})

export default models.Notification || model('Notification', notificationSchema)
