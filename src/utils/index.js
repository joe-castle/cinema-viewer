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
