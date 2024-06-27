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

export const addCommas = (num: number | string): string=> {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
