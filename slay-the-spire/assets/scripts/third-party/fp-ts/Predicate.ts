/**
 * @since 3.0.0
 */
import type { Contravariant1 } from './Contravariant'
import { constFalse, constTrue, flow } from './function'
import type { Monoid } from './Monoid'
import type { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export interface Predicate<A> {
  (a: A): boolean
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Contravariant
 * @since 3.0.0
 */
export const contramap: Contravariant1<URI>['contramap'] = (f) => (predicate) => flow(f, predicate)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'Predicate'

declare module './HKT' {
  interface URItoKind<A> {
    readonly Predicate: Predicate<A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroupAny = <A = never>(): Semigroup<Predicate<A>> => ({
  concat: or
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoidAny = <A = never>(): Monoid<Predicate<A>> => ({
  concat: getSemigroupAny<A>().concat,
  empty: constFalse
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroupAll = <A = never>(): Semigroup<Predicate<A>> => ({
  concat: and
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoidAll = <A = never>(): Monoid<Predicate<A>> => ({
  concat: getSemigroupAll<A>().concat,
  empty: constTrue
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: Contravariant1<URI> = {
  contramap
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const not = <A>(predicate: Predicate<A>): Predicate<A> => (a) => !predicate(a)

/**
 * @since 3.0.0
 */
export const or = <A>(second: Predicate<A>) => (first: Predicate<A>): Predicate<A> => (a) => first(a) || second(a)

/**
 * @since 3.0.0
 */
export const and = <A>(second: Predicate<A>) => (first: Predicate<A>): Predicate<A> => (a) => first(a) && second(a)
