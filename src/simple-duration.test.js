const sd = require('./simple-duration')

test('stringify', () => {
  expect(sd.stringify(1)).toBe('1s')
  expect(sd.stringify(1 * 60)).toBe('1m')
  expect(sd.stringify(1 * 60 * 60)).toBe('1h')
  expect(sd.stringify(1 * 60 * 60 * 24)).toBe('1d')
  expect(sd.stringify(1 * 60 * 60 * 24 * 365.25)).toBe('1y')
  expect(sd.stringify(1 / 1000)).toBe('1ms')
  expect(sd.stringify(1 / 1000 / 1000, 'µs')).toBe('1µs')
  expect(sd.stringify(1 / 1000 / 1000 / 1000, 'ns')).toBe('1ns')

  expect(sd.stringify(-1)).toBe('-1s')
  expect(sd.stringify(-1 * 60)).toBe('-1m')
  expect(sd.stringify(-1 * 60 * 60)).toBe('-1h')
  expect(sd.stringify(-1 * 60 * 60 * 24)).toBe('-1d')
  expect(sd.stringify(-1 * 60 * 60 * 24 * 365.25)).toBe('-1y')
  expect(sd.stringify(-1 / 1000)).toBe('-1ms')
  expect(sd.stringify(-1 / 1000 / 1000, 'µs')).toBe('-1µs')
  expect(sd.stringify(-1 / 1000 / 1000 / 1000, 'ns')).toBe('-1ns')

  expect(sd.stringify(1 * 60 * 60 + 24 * 60 + 5)).toBe('1h 24m 5s')
  expect(sd.stringify(1 * 60 * 60 * 24 * 365.25 + 35 * 60 * 60 * 24 + 5 + 6 / 1000)).toBe('1y 35d 5s 6ms')

  expect(sd.stringify(-(1 * 60 + 5))).toBe('-1m 5s')

  expect(sd.stringify(1 * 60 * 60 * 24 * 365.25 - 1)).toBe('365d 5h 59m 59s')

  expect(() => sd.stringify(null)).toThrow()
  expect(() => sd.stringify(1, null)).toThrow()
  expect(() => sd.stringify(1, 'test')).toThrow()
})

test('rounding', () => {
  expect(sd.stringify(0)).toBe('0ms')
  expect(sd.stringify(1 / 1000 / 1000)).toBe('0ms')
  expect(sd.stringify(1, 'm')).toBe('0m')
  expect(sd.stringify(35, 'm')).toBe('1m')
})

test('parse', () => {
  expect(sd.parse('1s')).toBe(1)
  expect(sd.parse('1m')).toBe(1 * 60)
  expect(sd.parse('1h')).toBe(1 * 60 * 60)
  expect(sd.parse('1d')).toBe(1 * 60 * 60 * 24)
  expect(sd.parse('1y')).toBe(1 * 60 * 60 * 24 * 365.25)
  expect(sd.parse('1ms')).toBe(1 / 1000)
  expect(sd.parse('1µs')).toBe(1 / 1000 / 1000)
  expect(sd.parse('1ns')).toBe(1 / 1000 / 1000 / 1000)

  expect(sd.parse('-1s')).toBe(-1)
  expect(sd.parse('-1m')).toBe(-1 * 60)
  expect(sd.parse('-1h')).toBe(-1 * 60 * 60)
  expect(sd.parse('-1d')).toBe(-1 * 60 * 60 * 24)
  expect(sd.parse('-1y')).toBe(-1 * 60 * 60 * 24 * 365.25)
  expect(sd.parse('-1ms')).toBe(-1 / 1000)
  expect(sd.parse('-1µs')).toBe(-1 / 1000 / 1000)
  expect(sd.parse('-1ns')).toBe(-1 / 1000 / 1000 / 1000)

  expect(sd.parse('5m 2s')).toBe(5 * 60 + 2)
  expect(sd.parse('5m2s')).toBe(5 * 60 + 2)
  expect(sd.parse('   5  m \t  2 s  ')).toBe(5 * 60 + 2)
  expect(sd.parse('  - 5  m 2s ')).toBe(-(5 * 60 + 2))

  expect(sd.parse('3m 2h')).toBe(2 * 60 * 60 + 3 * 60)

  expect(sd.parse('-5s 10s')).toBe(-15)

  expect(() => sd.parse('5 m s')).toThrow()
  expect(() => sd.parse(5)).toThrow()
  expect(() => sd.parse(null)).toThrow()

  expect(sd.parse('0.5m')).toBe(30)
  expect(sd.parse('1.5s')).toBe(1 + 500 / 1000)
  expect(sd.parse('0.5y')).toBe(1 * 60 * 60 * 24 * 365.25 / 2)
})

test('two ways', () => {
  const performTest = (str) => {
    const val = sd.parse(str)
    const normalized = sd.stringify(val)
    expect(sd.parse(normalized)).toBe(val)
  }
  performTest('1s')
  performTest('5m 12s 24ms')
  performTest('1000y 24d 12h 3m 45s 324ms')
  performTest('-1000y 24d 12h 3m 45s 324ms')
})
