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
