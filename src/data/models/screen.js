import { Schema, model } from 'mongoose'

const screenSchema = new Schema({
  screen: Number,
  seats: [{ number: String, rating: Number, notes: String }]
})

export default model('screen', screenSchema)
