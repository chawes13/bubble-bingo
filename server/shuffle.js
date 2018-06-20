// Fisher-Yates In-Place Shuffle Algorithm
const shuffle = (arr) => {
  let m = arr.length
  let t
  let i

  while (m) {
    i = Math.floor(Math.random() * m--)
    t = arr[m]
    arr[m] = arr[i]
    arr[i] = t
  }

  return arr
}

module.exports = shuffle
