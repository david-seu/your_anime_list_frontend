const getCurrentSeason = () => {
  const currentMonth = new Date().getMonth()
  let season = ''
  if (currentMonth < 3) {
    season = 'WINTER'
  } else if (currentMonth >= 3 && currentMonth < 6) {
    season = 'SPRING'
  } else if (currentMonth >= 6 && currentMonth < 9) {
    season = 'SUMMER'
  } else if (currentMonth >= 9) {
    season = 'FALL'
  }
  return season
}

export default getCurrentSeason
