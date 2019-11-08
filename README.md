
# simple-duration

[![](https://github.com/nicolas-van/simple-duration/workflows/Node%20CI/badge.svg)](https://github.com/nicolas-van/simple-duration/actions) [![npm version](https://img.shields.io/npm/v/simple-duration.svg)](https://www.npmjs.com/package/simple-duration)

A JavaScript library to convert seconds to strings and back using a human readable format.

simple-duration is an implementation of the [Simple Duration Format](https://github.com/nicolas-van/simple-duration-format-specification#readme) 1.0.

Examples:

```javascript
import * as sd from 'simple-duration'

const i = sd.parse('3h 10m 52s') // i = 11452

console.log(sd.stringify(i + 10)) // prints 3h 11m 2s
```

## Installation

```
npm install simple-duration
```

## Usage

### `parse(str)`

Parse a string using the Simple Duration Format and returns the number of seconds corresponding to it.

### `stringify(seconds, rounding='ms')`

Formats a number of seconds. The rounding is using the milliseconds as default value but you can pass any
other unit as defined bellow.

## Format

Here are the possible units:

* year - **y** - A Julian year, which means 365.25 days.
* day - **d** - 24 hours.
* hour - **h** - 60 minutes.
* minutes - **m** - 60 seconds.
* seconds - **s** - A second according to the SI.
* milliseconds - **ms** - 10e-3 seconds.
* microseconds - **µs** - 10e-6 seconds.
* nanoseconds - **ns** - 10e-9 seconds.

You can specify any number of units in any order. As example `24s 3h` is perfectly valid. You can also specify
negative amounts of time like `-3m`.

When formatting the `stringify` function will always use a normalizing process.
