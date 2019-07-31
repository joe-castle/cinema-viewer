const fs = require('fs')
const path = require('path')

fs.stat(path.join('.git', 'hooks', 'commit-msg'), (err, stats) => {
  if (err) {
    if (err.message.includes('no such file')) {
      fs.copyFile(
        path.join('build-script', 'git-hooks', 'commit-msg'),
        path.join('.git', 'hooks', 'commit-msg'),
        (err) => {
          if (err) console.error(err)
          console.log('commit-msg setup successfully')
        })
    } else {
      throw err
    }
  }
})
