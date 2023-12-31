/**
 * @since 3.0.0
 */
import type { Functor, Functor1, Functor2, Functor2C, Functor3, Functor4, Functor3C } from './Functor'
import type { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3, URIS4, Kind4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend<W> extends Functor<W> {
  readonly extend: <A, B>(f: (wa: HKT<W, A>) => B) => (wa: HKT<W, A>) => HKT<W, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend1<W extends URIS> extends Functor1<W> {
  readonly extend: <A, B>(f: (wa: Kind<W, A>) => B) => (wa: Kind<W, A>) => Kind<W, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend2<W extends URIS2> extends Functor2<W> {
  readonly extend: <E, A, B>(f: (wa: Kind2<W, E, A>) => B) => (wa: Kind2<W, E, A>) => Kind2<W, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend2C<W extends URIS2, E> extends Functor2C<W, E> {
  readonly extend: <A, B>(f: (wa: Kind2<W, E, A>) => B) => (wa: Kind2<W, E, A>) => Kind2<W, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend3<W extends URIS3> extends Functor3<W> {
  readonly extend: <R, E, A, B>(f: (wa: Kind3<W, R, E, A>) => B) => (wa: Kind3<W, R, E, A>) => Kind3<W, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend3C<W extends URIS3, E> extends Functor3C<W, E> {
  readonly extend: <R, A, B>(f: (wa: Kind3<W, R, E, A>) => B) => (wa: Kind3<W, R, E, A>) => Kind3<W, R, E, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend4<W extends URIS4> extends Functor4<W> {
  readonly extend: <S, R, E, A, B>(
    f: (wa: Kind4<W, S, R, E, A>) => B
  ) => (wa: Kind4<W, S, R, E, A>) => Kind4<W, S, R, E, B>
}
