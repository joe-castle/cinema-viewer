export function calculateDimensions (w) {
  const width = w >= 992 ? w * 0.7 : w < 576
    ? w - 20 : w * 0.9

  return {
    width,
    height: (9 / 16) * width
  }
}

export function zeroPad (num) {
  return num < 10 ? `0${num}` : num
}

export function formatTime (date) {
  return `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}`
}

export function formatDate (date) {
  return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`
}

export function checkUserData (film, ...conditions) {
  return film.userData && conditions.every((condition) => {
    if (typeof condition === 'string') {
      return condition.startsWith('!')
        ? !film.userData[condition.slice(1)]
        : film.userData[condition]
    } else {
      return condition(film.userData)
    }
  })
}

export function notCheckUserData (film, ...conditions) {
  return !film.userData || checkUserData(film, ...conditions)
}
