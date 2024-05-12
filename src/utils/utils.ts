export const convertToEuropeanFormat = (date: string) => {
  return date.split('-').reverse().join('-')
};