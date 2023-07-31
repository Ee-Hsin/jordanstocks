export function checkSpecialChars(str) {
  // This regex excludes special chars but includes _.,: and space
  const regex = /^[-a-zA-Z0-9_.,:\s]+$/
  return regex.test(str)
}

export const checkForHTML = (str) => {
  const regex = /^[^<>]*$/
  return regex.test(str)
}

export const addCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
