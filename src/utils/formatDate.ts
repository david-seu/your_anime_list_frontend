const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Months are 0-based in JavaScript
  const day = date.getDate()

  // Pad the month and day with leading zeros if they are less than 10
  const monthString = month < 10 ? `0${month}` : month
  const dayString = day < 10 ? `0${day}` : day

  const formattedDate = `${year}-${monthString}-${dayString}`

  return formattedDate
}

export default formatDate
