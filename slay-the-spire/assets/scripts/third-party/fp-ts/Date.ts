/**
 * @since 3.0.0
 */
import type { IO } from './IO'
import * as E from './Eq'
import { pipe } from './function'
import * as O from './Ord'
import * as N from './number'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: E.Eq<Date> = {
  equals: (second) => (first) => first.valueOf() === second.valueOf()
}

/**
 * @category instances
 * @since 3.0.0
 */
export const EqDate: E.Eq<Date> = {
  equals: (second) => (first) => first.getDate() === second.getDate()
}

/**
 * @category instances
 * @since 3.0.0
 */
export const EqMonth: E.Eq<Date> = {
  equals: (second) => (first) => first.getMonth() === second.getMonth()
}

/**
 * @category instances
 * @since 3.0.0
 */
export const EqYear: E.Eq<Date> = {
  equals: (second) => (first) => first.getFullYear() === second.getFullYear()
}

/**
 * @example
 * import { Ord } from 'fp-ts/Date'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(new Date(1, 1, 2020), Ord.compare(new Date(1, 1, 2021))), -1)
 *
 * @category instances
 * @since 3.0.0
 */
export const Ord: O.Ord<Date> =
  /*#__PURE__*/
  pipe(
    N.Ord,
    /*#__PURE__*/
    O.contramap((date) => date.valueOf())
  )

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Returns the current `Date`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const create: IO<Date> = () => new Date()

/**
 * Returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC.
 *
 * @since 3.0.0
 */
export const now: IO<number> = () => new Date().getTime()
