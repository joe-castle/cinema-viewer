import db from '../client'

export function multiQ (collection) {
  return (fn) => new Promise((resolve, reject) => {
    fn(db._db.collection(collection)).toArray((err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

export function singleQ (collection) {
  return (fn) => fn(db._db.collection(collection))
}
