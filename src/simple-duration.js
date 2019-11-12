
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
  return str.length > 0 ? str.trim() : `0${rounding}`
}

module.exports.stringify = stringify

const wsRegex = '[ \\t]'
const positiveNumberRegex = '(?:0|[1-9]\\d*)(?:\\.\\d+)?'
const unitRegex = '(?:ns|µs|ms|s|m|h|d|y)'
const elementRegex = `(?:(${positiveNumberRegex})${wsRegex}*(${unitRegex}))`
const wholeRegex = `^${wsRegex}*(-)?((?:${wsRegex}*${elementRegex}${wsRegex}*)+)$`

const element = new RegExp(elementRegex)
const whole = new RegExp(wholeRegex)

/**
 * Parses a string using the Simple Duration Format and returns the number of seconds
 * corresponding to it.
 * @param {string} str The string to parse
 * @return {number} The number of seconds
 */
function parse (str) {
  if (!_.isString(str)) {
    throw new Error('Must pass a string')
  }
  const match = str.match(whole)
  if (!match) {
    throw new Error(`${str} is not valid Simple Duration Format`)
  }
  const negative = match[1] === '-'
  const elements = match[2]

  const re = new RegExp(element.source, 'g')
  let nmatch
  let counter = 0
  while ((nmatch = re.exec(elements)) !== null) {
    const nbr = parseFloat(nmatch[1])
    const unit = nmatch[2]
    counter += nbr * timeUnits[unit].amount
  }
  return (negative ? -1 : 1) * counter
}

module.exports.parse = parse
