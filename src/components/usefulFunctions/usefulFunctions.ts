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
  const pad = (num: number): string => num.toString().padStart(2, "0")

  const day = pad(date.getDate())
  const month = pad(date.getMonth() + 1) // getMonth() is zero-indexed, so add 1
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}
