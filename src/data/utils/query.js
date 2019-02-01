import db from '../client'

export default function query (collection) {
  return (fn) => new Promise((resolve, reject) => {
    fn(db._db.collection(collection)).toArray((err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}
