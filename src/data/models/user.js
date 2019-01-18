import { Schema, Types, model } from 'mongoose'

const userSchema = new Schema({
  _id: String,
  films: [{ type: Types.ObjectId, ref: 'films', autopopulate: true }]
})

export default model('users', userSchema)
