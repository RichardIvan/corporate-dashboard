'use strict'

export function getRandomDate(fromDate) {
  const date = new Date()
  const now = new Date()
  const past = fromDate ? new Date(fromDate) : new Date(now.setFullYear((date.getFullYear() - 1)))

  const diff = date.getTime() - past.getTime()
  const newDiff = diff * Math.random()
  const newDate = new Date(past.getTime() + newDiff)

  return newDate
}
