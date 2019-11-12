
const _ = require('lodash')

const s = 1
const m = s * 60
const h = m * 60
const d = h * 24
const y = d * 365.25
const ms = s / 1000
const us = ms / 1000
const ns = us / 1000

const timeUnitsList = [
  { unit: 'y', amount: y },
  { unit: 'd', amount: d },
  { unit: 'h', amount: h },
  { unit: 'm', amount: m },
  { unit: 's', amount: s },
  { unit: 'ms', amount: ms },
  { unit: 'µs', amount: us },
  { unit: 'ns', amount: ns }
]

const timeUnits = _.fromPairs(_.map(timeUnitsList, (el) => {
  return [el.unit, el]
}))

module.exports.timeUnits = timeUnits

/**
 * Formats a number of seconds.
 * @param {number} seconds The number to stringify.
 * @param {string} rounding The unit used for rounding. Defaults to 'ms'.
 * @return {string} The formatted and normalized string.
 */
function stringify (seconds, rounding = 'ms') {
  if (!(rounding in timeUnits)) {
    throw new Error(`Undefined unit: ${rounding}`)
  }
  if (!_.isNumber(seconds)) {
    throw new Error(`Must provide a number, instead provided ${seconds}`)
  }
  let str = seconds < 0 ? '-' : ''
  let nbr = Math.abs(seconds)
  let shouldStop = false
  _.forEach(timeUnitsList, (el) => {
    if (shouldStop) {
      return
    }
    if (el.unit === rounding) {
      shouldStop = true
    }
    const tmp = el.unit === rounding ? Math.round(nbr / el.amount) : Math.floor(nbr / el.amount)
    nbr -= tmp * el.amount
    if (tmp !== 0) {
      str += `${tmp}${el.unit} `
    }
  })
  return str.length > 0 ? str.trim() : '0s'
}

module.exports.stringify = stringify
