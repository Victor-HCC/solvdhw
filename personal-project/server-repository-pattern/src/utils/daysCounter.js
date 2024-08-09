const isWeekend = date => {
  const day = date.getDay()

  return day === 0 || day === 6 //sunday(0) or saturday(6)
}

const getWorkingDays = (startDate, endDate) => {
  let count = 0
  let currentDate = new Date(startDate)
  const end = new Date(endDate)
  
  while(currentDate <= end) {
    if(!isWeekend(currentDate)) {
      count++
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return count
}

// console.log(getWorkingDays('2024-07-30', '2024-08-06'));

module.exports = { getWorkingDays }