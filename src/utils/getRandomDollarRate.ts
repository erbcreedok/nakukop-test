function getRandomDollarRate(): number {
  const max = 80
  const min = 30
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default getRandomDollarRate
