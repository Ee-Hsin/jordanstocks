// This regex excludes special chars but includes _.,: and space
export function checkSpecialChars(str: string): boolean {
  const regex = /^[-a-zA-Z0-9_.,:\s]+$/
  return regex.test(str)
}

// This function returns false if there are HTML tags
export const checkForNoHTML = (str: string): boolean => {
  const regex = /^[^<>]*$/
  return regex.test(str)
}

export const addCommas = (num: number | string): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const formatDate = (date: Date): string => {
  const monthNames = [
    "Jan.",
    "Feb.",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ]
  const nth = (day: number): string => {
    if (day > 3 && day < 21) return "th" // handles teens
    switch (day % 10) {
      case 1:
        return "st"
      case 2:
        return "nd"
      case 3:
        return "rd"
      default:
        return "th"
    }
  }

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  return `${monthNames[monthIndex]} ${day}${nth(day)}  ${year}`
}
