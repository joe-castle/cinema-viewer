import { Schema, Types, model } from 'mongoose'

const filmSchema = new Schema({
  title: String,
  formats: [String],
  post: String,
  url: String,
  hidden: Boolean,
  favourite: Boolean,
  unlimited: Boolean,
  watched: {
    rating: Number,
    format: String,
    screen: { type: Types.ObjectID, ref: 'screen', autopopulate: true }
  }
})

export default model('films', filmSchema)
