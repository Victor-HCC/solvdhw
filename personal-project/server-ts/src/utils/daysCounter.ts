const isWeekend = (date: Date): boolean => {
  const day = date.getDay()

  return day === 0 || day === 6 //sunday(0) or saturday(6)
}

const getWorkingDays = (startDate: Date, endDate: Date): number => {
  let count: number = 0
  let currentDate: Date = new Date(startDate)
  const end: Date = new Date(endDate)

  while(currentDate <= end) {
    if(!isWeekend(currentDate)) {
      count++
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return count
}

export default getWorkingDays