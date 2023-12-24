/**
 * @since 3.0.0
 */
import { ap as ap_, Apply, Apply1, Apply2, Apply2C, Apply3, Apply3C } from './Apply'
import type { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C } from './Chain'
import * as E from './Either'
import { flow, Lazy, pipe } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, map as map_ } from './Functor'
import type { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import type { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from './Monad'
import type { Pointed, Pointed1, Pointed2, Pointed2C, Pointed3, Pointed3C } from './Pointed'
import type { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function right<F extends URIS3>(F: Pointed3<F>): <A, R, FE, E = never>(a: A) => Kind3<F, R, FE, E.Either<E, A>>
export function right<F extends URIS3, FE>(
  F: Pointed3C<F, FE>
): <A, R, E = never>(a: A) => Kind3<F, R, FE, E.Either<E, A>>
export function right<F extends URIS2>(F: Pointed2<F>): <A, FE, E = never>(a: A) => Kind2<F, FE, E.Either<E, A>>
export function right<F extends URIS2, FE>(F: Pointed2C<F, FE>): <A, E = never>(a: A) => Kind2<F, FE, E.Either<E, A>>
export function right<F extends URIS>(F: Pointed1<F>): <A, E = never>(a: A) => Kind<F, E.Either<E, A>>
export function right<F>(F: Pointed<F>): <A, E = never>(a: A) => HKT<F, E.Either<E, A>>
export function right<F>(F: Pointed<F>): <A, E = never>(a: A) => HKT<F, E.Either<E, A>> {
  return flow(E.right, F.of)
}

/**
 * @since 3.0.0
 */
export function left<F extends URIS3>(F: Pointed3<F>): <E, R, FE, A = never>(e: E) => Kind3<F, R, FE, E.Either<E, A>>
export function left<F extends URIS3, FE>(F: Pointed3C<F, FE>): <E, R, A = never>(e: E) => Kind3<F, R, FE, E.Either<E, A>>
export function left<F extends URIS2>(F: Pointed2<F>): <E, FE, A = never>(e: E) => Kind2<F, FE, E.Either<E, A>>
export function left<F extends URIS2, FE>(F: Pointed2C<F, FE>): <E, A = never>(e: E) => Kind2<F, FE, E.Either<E, A>>
export function left<F extends URIS>(F: Pointed1<F>): <E, A = never>(e: E) => Kind<F, E.Either<E, A>>
export function left<F>(F: Pointed<F>): <E, A = never>(e: E) => HKT<F, E.Either<E, A>>
export function left<F>(F: Pointed<F>): <E, A = never>(e: E) => HKT<F, E.Either<E, A>> {
  return flow(E.left, F.of)
}

/**
 * @since 3.0.0
 */
export function rightF<F extends URIS3>(
  F: Functor3<F>
): <R, FE, A, E = never>(fa: Kind3<F, R, FE, A>) => Kind3<F, R, FE, E.Either<E, A>>
export function rightF<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <R, A, E = never>(fa: Kind3<F, R, FE, A>) => Kind3<F, R, FE, E.Either<E, A>>
export function rightF<F extends URIS2>(
  F: Functor2<F>
): <FE, A, E = never>(fa: Kind2<F, FE, A>) => Kind2<F, FE, E.Either<E, A>>
export function rightF<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <A, E = never>(fa: Kind2<F, FE, A>) => Kind2<F, FE, E.Either<E, A>>
export function rightF<F extends URIS>(F: Functor1<F>): <A, E = never>(fa: Kind<F, A>) => Kind<F, E.Either<E, A>>
export function rightF<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, E.Either<E, A>>
export function rightF<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, E.Either<E, A>> {
  return F.map(E.right)
}

/**
 * @since 3.0.0
 */
export function leftF<F extends URIS3>(
  F: Functor3<F>
): <R, FE, E, A = never>(fe: Kind3<F, R, FE, E>) => Kind3<F, R, FE, E.Either<E, A>>
export function leftF<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <R, E, A = never>(fe: Kind3<F, R, FE, E>) => Kind3<F, R, FE, E.Either<E, A>>
export function leftF<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A = never>(fe: Kind2<F, FE, E>) => Kind2<F, FE, E.Either<E, A>>
export function leftF<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <E, A = never>(fe: Kind2<F, FE, E>) => Kind2<F, FE, E.Either<E, A>>
export function leftF<F extends URIS>(F: Functor1<F>): <E, A = never>(fe: Kind<F, E>) => Kind<F, E.Either<E, A>>
export function leftF<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, E.Either<E, A>>
export function leftF<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, E.Either<E, A>> {
  return F.map(E.left)
}

/**
 * @since 3.0.0
 */
export function fromNullable<F extends URIS3>(
  F: Pointed3<F>
): <E>(e: E) => <A, S, R>(a: A) => Kind3<F, S, R, E.Either<E, NonNullable<A>>>
export function fromNullable<F extends URIS3, R>(
  F: Pointed3C<F, R>
): <E>(e: E) => <A, S>(a: A) => Kind3<F, S, R, E.Either<E, NonNullable<A>>>
export function fromNullable<F extends URIS2>(
  F: Pointed2<F>
): <E>(e: E) => <A, R>(a: A) => Kind2<F, R, E.Either<E, NonNullable<A>>>
export function fromNullable<F extends URIS2, R>(
  F: Pointed2C<F, R>
): <E>(e: E) => <A>(a: A) => Kind2<F, R, E.Either<E, NonNullable<A>>>
export function fromNullable<F extends URIS>(
  F: Pointed1<F>
): <E>(e: E) => <A>(a: A) => Kind<F, E.Either<E, NonNullable<A>>>
export function fromNullable<F>(F: Pointed<F>): <E>(e: E) => <A>(a: A) => HKT<F, E.Either<E, NonNullable<A>>>
export function fromNullable<F>(F: Pointed<F>): <E>(e: E) => <A>(a: A) => HKT<F, E.Either<E, NonNullable<A>>> {
  return (e) =>
    flow(
      E.fromNullable(() => e),
      F.of
    )
}

/**
 * @since 3.0.0
 */
export function fromNullableK<F extends URIS3>(
  F: Pointed3<F>
): <E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S, R>(...a: A) => Kind3<F, S, R, E.Either<E, NonNullable<B>>>
export function fromNullableK<F extends URIS3, R>(
  F: Pointed3C<F, R>
): <E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S>(...a: A) => Kind3<F, S, R, E.Either<E, NonNullable<B>>>
export function fromNullableK<F extends URIS2>(
  F: Pointed2<F>
): <E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <R>(...a: A) => Kind2<F, R, E.Either<E, NonNullable<B>>>
export function fromNullableK<F extends URIS2, R>(
  F: Pointed2C<F, R>
): <E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Kind2<F, R, E.Either<E, NonNullable<B>>>
export function fromNullableK<F extends URIS>(
  F: Pointed1<F>
): <E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Kind<F, E.Either<E, NonNullable<B>>>
export function fromNullableK<F>(
  F: Pointed<F>
): <E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => HKT<F, E.Either<E, NonNullable<B>>>
export function fromNullableK<F>(
  F: Pointed<F>
): <E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => HKT<F, E.Either<E, NonNullable<B>>> {
  const fromNullableF = fromNullable(F)
  return (e) => {
    const fromNullableFE = fromNullableF(e)
    return (f) => flow(f, fromNullableFE)
  }
}

/**
 * @since 3.0.0
 */
export function chainNullableK<M extends URIS3>(
  M: Monad3<M>
): <E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R>(ma: Kind3<M, S, R, E.Either<E, A>>) => Kind3<M, S, R, E.Either<E, NonNullable<B>>>
export function chainNullableK<M extends URIS3, R>(
  M: Monad3C<M, R>
): <E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <S>(ma: Kind3<M, S, R, E.Either<E, A>>) => Kind3<M, S, R, E.Either<E, NonNullable<B>>>
export function chainNullableK<M extends URIS2>(
  M: Monad2<M>
): <E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <R>(ma: Kind2<M, R, E.Either<E, A>>) => Kind2<M, R, E.Either<E, NonNullable<B>>>
export function chainNullableK<M extends URIS2, T>(
  M: Monad2C<M, T>
): <E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: Kind2<M, T, E.Either<E, A>>) => Kind2<M, T, E.Either<E, NonNullable<B>>>
export function chainNullableK<M extends URIS>(
  M: Monad1<M>
): <E>(
  e: E
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: Kind<M, E.Either<E, A>>) => Kind<M, E.Either<E, NonNullable<B>>>
export function chainNullableK<M>(
  M: Monad<M>
): <E>(
  e: E
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: HKT<M, E.Either<E, A>>) => HKT<M, E.Either<E, NonNullable<B>>>
export function chainNullableK<M>(
  M: Monad<M>
): <E>(
  e: E
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: HKT<M, E.Either<E, A>>) => HKT<M, E.Either<E, NonNullable<B>>> {
  const chainM = chain(M)
  const fromNullableKM = fromNullableK(M)
  return (e) => {
    const fromNullableKMe = fromNullableKM(e)
    return (f) => chainM(fromNullableKMe(f))
  }
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <R, FE, E>(fa: Kind3<F, R, FE, E.Either<E, A>>) => Kind3<F, R, FE, E.Either<E, B>>
export function map<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, FE, E.Either<E, A>>) => Kind3<F, R, FE, E.Either<E, B>>
export function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <FE, E>(fa: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, E.Either<E, B>>
export function map<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, E.Either<E, B>>
export function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind<F, E.Either<E, A>>) => Kind<F, E.Either<E, B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, E.Either<E, A>>) => HKT<F, E.Either<E, B>>
export function map<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, E.Either<E, A>>) => HKT<F, E.Either<E, B>> {
  return map_(F, E.Functor)
}

/**
 * @since 3.0.0
 */
export function ap<F extends URIS3>(
  F: Apply3<F>
): <R, FE, E, A>(
  fa: Kind3<F, R, FE, E.Either<E, A>>
) => <B>(fab: Kind3<F, R, FE, E.Either<E, (a: A) => B>>) => Kind3<F, R, FE, E.Either<E, B>>
export function ap<F extends URIS3, FE>(
  F: Apply3C<F, FE>
): <R, E, A>(
  fa: Kind3<F, R, FE, E.Either<E, A>>
) => <B>(fab: Kind3<F, R, FE, E.Either<E, (a: A) => B>>) => Kind3<F, R, FE, E.Either<E, B>>
export function ap<F extends URIS2>(
  F: Apply2<F>
): <FE, E, A>(
  fa: Kind2<F, FE, E.Either<E, A>>
) => <B>(fab: Kind2<F, FE, E.Either<E, (a: A) => B>>) => Kind2<F, FE, E.Either<E, B>>
export function ap<F extends URIS2, FE>(
  F: Apply2C<F, FE>
): <E, A>(
  fa: Kind2<F, FE, E.Either<E, A>>
) => <B>(fab: Kind2<F, FE, E.Either<E, (a: A) => B>>) => Kind2<F, FE, E.Either<E, B>>
export function ap<F extends URIS>(
  F: Apply1<F>
): <E, A>(fa: Kind<F, E.Either<E, A>>) => <B>(fab: Kind<F, E.Either<E, (a: A) => B>>) => Kind<F, E.Either<E, B>>
export function ap<F>(
  F: Apply<F>
): <E, A>(fa: HKT<F, E.Either<E, A>>) => <B>(fab: HKT<F, E.Either<E, (a: A) => B>>) => HKT<F, E.Either<E, B>>
export function ap<F>(
  F: Apply<F>
): <E, A>(fa: HKT<F, E.Either<E, A>>) => <B>(fab: HKT<F, E.Either<E, (a: A) => B>>) => HKT<F, E.Either<E, B>> {
  return ap_(F, E.Apply)
}

/**
 * @since 3.0.0
 */
export function chain<M extends URIS3>(
  M: Monad3<M>
): <A, R, ME, E, B>(
  f: (a: A) => Kind3<M, R, ME, E.Either<E, B>>
) => (ma: Kind3<M, R, ME, E.Either<E, A>>) => Kind3<M, R, ME, E.Either<E, B>>
export function chain<M extends URIS3, ME>(
  M: Monad3C<M, ME>
): <A, R, E, B>(
  f: (a: A) => Kind3<M, R, ME, E.Either<E, B>>
) => (ma: Kind3<M, R, ME, E.Either<E, A>>) => Kind3<M, R, ME, E.Either<E, B>>
export function chain<M extends URIS2>(
  M: Monad2<M>
): <A, ME, E, B>(
  f: (a: A) => Kind2<M, ME, E.Either<E, B>>
) => (ma: Kind2<M, ME, E.Either<E, A>>) => Kind2<M, ME, E.Either<E, B>>
export function chain<M extends URIS2, ME>(
  M: Monad2C<M, ME>
): <A, E, B>(f: (a: A) => Kind2<M, ME, E.Either<E, B>>) => (ma: Kind2<M, ME, E.Either<E, A>>) => Kind2<M, ME, E.Either<E, B>>
export function chain<M extends URIS>(
  M: Monad1<M>
): <A, E, B>(f: (a: A) => Kind<M, E.Either<E, B>>) => (ma: Kind<M, E.Either<E, A>>) => Kind<M, E.Either<E, B>>
export function chain<M>(
  M: Monad<M>
): <A, E, B>(f: (a: A) => HKT<M, E.Either<E, B>>) => (ma: HKT<M, E.Either<E, A>>) => HKT<M, E.Either<E, B>>
export function chain<M>(
  M: Monad<M>
): <A, E, B>(f: (a: A) => HKT<M, E.Either<E, B>>) => (ma: HKT<M, E.Either<E, A>>) => HKT<M, E.Either<E, B>> {
  return (f) => M.chain((e) => (E.isLeft(e) ? M.of(e) : f(e.right)))
}

/**
 * @since 3.0.0
 */
export function alt<M extends URIS3>(
  M: Monad3<M>
): <R, ME, E, A>(
  second: Lazy<Kind3<M, R, ME, E.Either<E, A>>>
) => (first: Kind3<M, R, ME, E.Either<E, A>>) => Kind3<M, R, ME, E.Either<E, A>>
export function alt<M extends URIS3, ME>(
  M: Monad3C<M, ME>
): <R, E, A>(
  second: Lazy<Kind3<M, R, ME, E.Either<E, A>>>
) => (first: Kind3<M, R, ME, E.Either<E, A>>) => Kind3<M, R, ME, E.Either<E, A>>
export function alt<M extends URIS2>(
  M: Monad2<M>
): <ME, E, A>(
  second: Lazy<Kind2<M, ME, E.Either<E, A>>>
) => (first: Kind2<M, ME, E.Either<E, A>>) => Kind2<M, ME, E.Either<E, A>>
export function alt<M extends URIS2, ME>(
  M: Monad2C<M, ME>
): <E, A>(second: Lazy<Kind2<M, ME, E.Either<E, A>>>) => (first: Kind2<M, ME, E.Either<E, A>>) => Kind2<M, ME, E.Either<E, A>>
export function alt<M extends URIS>(
  M: Monad1<M>
): <E, A>(second: Lazy<Kind<M, E.Either<E, A>>>) => (first: Kind<M, E.Either<E, A>>) => Kind<M, E.Either<E, A>>
export function alt<M>(
  M: Monad<M>
): <E, A>(second: Lazy<HKT<M, E.Either<E, A>>>) => (first: HKT<M, E.Either<E, A>>) => HKT<M, E.Either<E, A>>
export function alt<M>(
  M: Monad<M>
): <E, A>(second: Lazy<HKT<M, E.Either<E, A>>>) => (first: HKT<M, E.Either<E, A>>) => HKT<M, E.Either<E, A>> {
  return (second) => M.chain((e) => (E.isLeft(e) ? second() : M.of(e)))
}

/**
 * @since 3.0.0
 */
export function bimap<F extends URIS3>(
  F: Functor3<F>
): <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R, FE>(fea: Kind3<F, R, FE, E.Either<E, A>>) => Kind3<F, R, FE, E.Either<G, B>>
export function bimap<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fea: Kind3<F, R, FE, E.Either<E, A>>) => Kind3<F, R, FE, E.Either<G, B>>
export function bimap<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <FE>(fea: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, E.Either<G, B>>
export function bimap<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, E.Either<G, B>>
export function bimap<F extends URIS>(
  F: Functor1<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind<F, E.Either<E, A>>) => Kind<F, E.Either<G, B>>
export function bimap<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, E.Either<E, A>>) => HKT<F, E.Either<G, B>>
export function bimap<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, E.Either<E, A>>) => HKT<F, E.Either<G, B>> {
  return flow(E.bimap, F.map)
}

/**
 * @since 3.0.0
 */
export function mapLeft<F extends URIS3>(
  F: Functor3<F>
): <E, G>(f: (e: E) => G) => <R, FE, A>(fea: Kind3<F, R, FE, E.Either<E, A>>) => Kind3<F, R, FE, E.Either<G, A>>
export function mapLeft<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <E, G>(f: (e: E) => G) => <R, A>(fea: Kind3<F, R, FE, E.Either<E, A>>) => Kind3<F, R, FE, E.Either<G, A>>
export function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <FE, A>(fea: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, E.Either<G, A>>
export function mapLeft<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, E.Either<G, A>>
export function mapLeft<F extends URIS>(
  F: Functor1<F>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind<F, E.Either<E, A>>) => Kind<F, E.Either<G, A>>
export function mapLeft<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, E.Either<E, A>>) => HKT<F, E.Either<G, A>>
export function mapLeft<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, E.Either<E, A>>) => HKT<F, E.Either<G, A>> {
  return (f) => F.map(E.mapLeft(f))
}

/**
 * @since 3.0.0
 */
export function altValidation<M extends URIS3, E>(
  M: Monad3<M>,
  S: Semigroup<E>
): <R, ME, A>(
  second: Lazy<Kind3<M, R, ME, E.Either<E, A>>>
) => (first: Kind3<M, R, ME, E.Either<E, A>>) => Kind3<M, R, ME, E.Either<E, A>>
export function altValidation<M extends URIS3, ME, E>(
  M: Monad3C<M, ME>,
  S: Semigroup<E>
): <R, A>(
  second: Lazy<Kind3<M, R, ME, E.Either<E, A>>>
) => (first: Kind3<M, R, ME, E.Either<E, A>>) => Kind3<M, R, ME, E.Either<E, A>>
export function altValidation<M extends URIS2, E>(
  M: Monad2<M>,
  S: Semigroup<E>
): <ME, A>(
  second: Lazy<Kind2<M, ME, E.Either<E, A>>>
) => (first: Kind2<M, ME, E.Either<E, A>>) => Kind2<M, ME, E.Either<E, A>>
export function altValidation<M extends URIS2, ME, E>(
  M: Monad2C<M, ME>,
  S: Semigroup<E>
): <A>(second: Lazy<Kind2<M, ME, E.Either<E, A>>>) => (first: Kind2<M, ME, E.Either<E, A>>) => Kind2<M, ME, E.Either<E, A>>
export function altValidation<M extends URIS, E>(
  M: Monad1<M>,
  S: Semigroup<E>
): <A>(second: Lazy<Kind<M, E.Either<E, A>>>) => (first: Kind<M, E.Either<E, A>>) => Kind<M, E.Either<E, A>>
export function altValidation<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A>(second: Lazy<HKT<M, E.Either<E, A>>>) => (first: HKT<M, E.Either<E, A>>) => HKT<M, E.Either<E, A>>
export function altValidation<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A>(second: Lazy<HKT<M, E.Either<E, A>>>) => (first: HKT<M, E.Either<E, A>>) => HKT<M, E.Either<E, A>> {
  const rightM = right(M)
  return (second) => (first) =>
    pipe(first, M.chain(E.match((e1) => pipe(second(), M.map(E.mapLeft((e2) => S.concat(e2)(e1)))), rightM)))
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function match<F extends URIS3>(
  F: Functor3<F>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => <R, ME>(ma: Kind3<F, R, ME, E.Either<E, A>>) => Kind3<F, R, ME, B>
export function match<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <E, B, A>(onLeft: (e: E) => B, onRight: (a: A) => B) => <R>(ma: Kind3<F, R, FE, E.Either<E, A>>) => Kind3<F, R, FE, B>
export function match<F extends URIS2>(
  F: Functor2<F>
): <E, B, A>(onLeft: (e: E) => B, onRight: (a: A) => B) => <FE>(ma: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, B>
export function match<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <E, B, A>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, B>
export function match<F extends URIS>(
  F: Functor1<F>
): <E, B, A>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: Kind<F, E.Either<E, A>>) => Kind<F, B>
export function match<F>(
  F: Functor<F>
): <E, B, A>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: HKT<F, E.Either<E, A>>) => HKT<F, B>
export function match<F>(
  F: Functor<F>
): <E, B, A>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: HKT<F, E.Either<E, A>>) => HKT<F, B> {
  return flow(E.match, F.map)
}

/**
 * @since 3.0.0
 */
export function matchE<M extends URIS3>(
  M: Chain3<M>
): <E, R, ME, B, A>(
  onLeft: (e: E) => Kind3<M, R, ME, B>,
  onRight: (a: A) => Kind3<M, R, ME, B>
) => (ma: Kind3<M, R, ME, E.Either<E, A>>) => Kind3<M, R, ME, B>
export function matchE<M extends URIS3, ME>(
  M: Chain3C<M, ME>
): <E, R, B, A>(
  onLeft: (e: E) => Kind3<M, R, ME, B>,
  onRight: (a: A) => Kind3<M, R, ME, B>
) => (ma: Kind3<M, R, ME, E.Either<E, A>>) => Kind3<M, R, ME, B>
export function matchE<M extends URIS2>(
  M: Chain2<M>
): <E, ME, B, A>(
  onLeft: (e: E) => Kind2<M, ME, B>,
  onRight: (a: A) => Kind2<M, ME, B>
) => (ma: Kind2<M, ME, E.Either<E, A>>) => Kind2<M, ME, B>
export function matchE<M extends URIS2, ME>(
  M: Chain2C<M, ME>
): <E, B, A>(
  onLeft: (e: E) => Kind2<M, ME, B>,
  onRight: (a: A) => Kind2<M, ME, B>
) => (ma: Kind2<M, ME, E.Either<E, A>>) => Kind2<M, ME, B>
export function matchE<M extends URIS>(
  M: Chain1<M>
): <E, B, A>(onLeft: (e: E) => Kind<M, B>, onRight: (a: A) => Kind<M, B>) => (ma: Kind<M, E.Either<E, A>>) => Kind<M, B>
export function matchE<M>(
  M: Chain<M>
): <E, B, A>(onLeft: (e: E) => HKT<M, B>, onRight: (a: A) => HKT<M, B>) => (ma: HKT<M, E.Either<E, A>>) => HKT<M, B>
export function matchE<M>(
  M: Chain<M>
): <E, B, A>(onLeft: (e: E) => HKT<M, B>, onRight: (a: A) => HKT<M, B>) => (ma: HKT<M, E.Either<E, A>>) => HKT<M, B> {
  return flow(E.match, M.chain)
}

/**
 * @since 3.0.0
 */
export function getOrElse<F extends URIS3>(
  F: Functor3<F>
): <E, A>(onLeft: (e: E) => A) => <R, ME>(ma: Kind3<F, R, ME, E.Either<E, A>>) => Kind3<F, R, ME, A>
export function getOrElse<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <E, A>(onLeft: (e: E) => A) => <R>(ma: Kind3<F, R, FE, E.Either<E, A>>) => Kind3<F, R, FE, A>
export function getOrElse<F extends URIS2>(
  F: Functor2<F>
): <E, A>(onLeft: (e: E) => A) => <FE>(ma: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, A>
export function getOrElse<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <E, A>(onLeft: (e: E) => A) => (ma: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, A>
export function getOrElse<F extends URIS>(
  F: Functor1<F>
): <E, A>(onLeft: (e: E) => A) => (ma: Kind<F, E.Either<E, A>>) => Kind<F, A>
export function getOrElse<F>(F: Functor<F>): <E, A>(onLeft: (e: E) => A) => (ma: HKT<F, E.Either<E, A>>) => HKT<F, A>
export function getOrElse<F>(F: Functor<F>): <E, A>(onLeft: (e: E) => A) => (ma: HKT<F, E.Either<E, A>>) => HKT<F, A> {
  return flow(E.getOrElse, F.map)
}

/**
 * @since 3.0.0
 */
export function getOrElseE<M extends URIS3>(
  M: Monad3<M>
): <E, R, ME, A>(onLeft: (e: E) => Kind3<M, R, ME, A>) => (ma: Kind3<M, R, ME, E.Either<E, A>>) => Kind3<M, R, ME, A>
export function getOrElseE<M extends URIS3, ME>(
  M: Monad3C<M, ME>
): <E, R, A>(onLeft: (e: E) => Kind3<M, R, ME, A>) => (ma: Kind3<M, R, ME, E.Either<E, A>>) => Kind3<M, R, ME, A>
export function getOrElseE<M extends URIS2>(
  M: Monad2<M>
): <E, ME, A>(onLeft: (e: E) => Kind2<M, ME, A>) => (ma: Kind2<M, ME, E.Either<E, A>>) => Kind2<M, ME, A>
export function getOrElseE<M extends URIS2, ME>(
  M: Monad2C<M, ME>
): <E, A>(onLeft: (e: E) => Kind2<M, ME, A>) => (ma: Kind2<M, ME, E.Either<E, A>>) => Kind2<M, ME, A>
export function getOrElseE<M extends URIS>(
  M: Monad1<M>
): <E, A>(onLeft: (e: E) => Kind<M, A>) => (ma: Kind<M, E.Either<E, A>>) => Kind<M, A>
export function getOrElseE<M>(
  M: Monad<M>
): <E, A>(onLeft: (e: E) => HKT<M, A>) => (ma: HKT<M, E.Either<E, A>>) => HKT<M, A>
export function getOrElseE<M>(
  M: Monad<M>
): <E, A>(onLeft: (e: E) => HKT<M, A>) => (ma: HKT<M, E.Either<E, A>>) => HKT<M, A> {
  return (onLeft) => M.chain(E.match(onLeft, M.of))
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function orElse<M extends URIS3>(
  M: Monad3<M>
): <E1, R, ME, E2, A>(
  onLeft: (e: E1) => Kind3<M, R, ME, E.Either<E2, A>>
) => (ma: Kind3<M, R, ME, E.Either<E1, A>>) => Kind3<M, R, ME, E.Either<E2, A>>
export function orElse<M extends URIS3, ME>(
  M: Monad3C<M, ME>
): <E1, R, E2, A>(
  onLeft: (e: E1) => Kind3<M, R, ME, E.Either<E2, A>>
) => (ma: Kind3<M, R, ME, E.Either<E1, A>>) => Kind3<M, R, ME, E.Either<E2, A>>
export function orElse<M extends URIS2>(
  M: Monad2<M>
): <E1, ME, E2, A>(
  onLeft: (e: E1) => Kind2<M, ME, E.Either<E2, A>>
) => (ma: Kind2<M, ME, E.Either<E1, A>>) => Kind2<M, ME, E.Either<E2, A>>
export function orElse<M extends URIS2, ME>(
  M: Monad2C<M, ME>
): <E1, E2, A>(
  onLeft: (e: E1) => Kind2<M, ME, E.Either<E2, A>>
) => (ma: Kind2<M, ME, E.Either<E1, A>>) => Kind2<M, ME, E.Either<E2, A>>
export function orElse<M extends URIS>(
  M: Monad1<M>
): <E1, E2, A>(onLeft: (e: E1) => Kind<M, E.Either<E2, A>>) => (ma: Kind<M, E.Either<E1, A>>) => Kind<M, E.Either<E2, A>>
export function orElse<M>(
  M: Monad<M>
): <E1, E2, A>(onLeft: (e: E1) => HKT<M, E.Either<E2, A>>) => (ma: HKT<M, E.Either<E1, A>>) => HKT<M, E.Either<E2, A>>
export function orElse<M>(
  M: Monad<M>
): <E1, E2, A>(onLeft: (e: E1) => HKT<M, E.Either<E2, A>>) => (ma: HKT<M, E.Either<E1, A>>) => HKT<M, E.Either<E2, A>> {
  return (onLeft) => M.chain((e) => (E.isLeft(e) ? onLeft(e.left) : M.of(e)))
}

/**
 * @since 3.0.0
 */
export function orLeft<M extends URIS3>(
  M: Monad3<M>
): <E1, R, ME, E2>(
  onLeft: (e: E1) => Kind3<M, R, ME, E2>
) => <A>(fa: Kind3<M, R, ME, E.Either<E1, A>>) => Kind3<M, R, ME, E.Either<E2, A>>
export function orLeft<M extends URIS3, ME>(
  M: Monad3C<M, ME>
): <E1, R, E2>(
  onLeft: (e: E1) => Kind3<M, R, ME, E2>
) => <A>(fa: Kind3<M, R, ME, E.Either<E1, A>>) => Kind3<M, R, ME, E.Either<E2, A>>
export function orLeft<M extends URIS2>(
  M: Monad2<M>
): <E1, ME, E2>(
  onLeft: (e: E1) => Kind2<M, ME, E2>
) => <A>(fa: Kind2<M, ME, E.Either<E1, A>>) => Kind2<M, ME, E.Either<E2, A>>
export function orLeft<M extends URIS2, ME>(
  M: Monad2C<M, ME>
): <E1, E2>(onLeft: (e: E1) => Kind2<M, ME, E2>) => <A>(fa: Kind2<M, ME, E.Either<E1, A>>) => Kind2<M, ME, E.Either<E2, A>>
export function orLeft<M extends URIS>(
  M: Monad1<M>
): <E1, E2>(onLeft: (e: E1) => Kind<M, E2>) => <A>(fa: Kind<M, E.Either<E1, A>>) => Kind<M, E.Either<E2, A>>
export function orLeft<M>(
  M: Monad<M>
): <E1, E2>(onLeft: (e: E1) => HKT<M, E2>) => <A>(fa: HKT<M, E.Either<E1, A>>) => HKT<M, E.Either<E2, A>>
export function orLeft<M>(
  M: Monad<M>
): <E1, E2>(onLeft: (e: E1) => HKT<M, E2>) => <A>(fa: HKT<M, E.Either<E1, A>>) => HKT<M, E.Either<E2, A>> {
  return (onLeft) =>
    M.chain(
      E.match(
        (e) => pipe(onLeft(e), M.map(E.left)),
        (a) => M.of(E.right(a))
      )
    )
}

/**
 * @since 3.0.0
 */
export function orElseFirst<M extends URIS3>(
  M: Monad3<M>
): <E, R, ME, B>(
  onLeft: (e: E) => Kind3<M, R, ME, E.Either<E, B>>
) => <A>(ma: Kind3<M, R, ME, E.Either<E, A>>) => Kind3<M, R, ME, E.Either<E, A>>
export function orElseFirst<M extends URIS3, ME>(
  M: Monad3C<M, ME>
): <E, R, B>(
  onLeft: (e: E) => Kind3<M, R, ME, E.Either<E, B>>
) => <A>(ma: Kind3<M, R, ME, E.Either<E, A>>) => Kind3<M, R, ME, E.Either<E, A>>
export function orElseFirst<M extends URIS2>(
  M: Monad2<M>
): <E, ME, B>(
  onLeft: (e: E) => Kind2<M, ME, E.Either<E, B>>
) => <A>(ma: Kind2<M, ME, E.Either<E, A>>) => Kind2<M, ME, E.Either<E, A>>
export function orElseFirst<M extends URIS2, ME>(
  M: Monad2C<M, ME>
): <E, B>(
  onLeft: (e: E) => Kind2<M, ME, E.Either<E, B>>
) => <A>(ma: Kind2<M, ME, E.Either<E, A>>) => Kind2<M, ME, E.Either<E, A>>
export function orElseFirst<M extends URIS>(
  M: Monad1<M>
): <E, B>(onLeft: (e: E) => Kind<M, E.Either<E, B>>) => <A>(ma: Kind<M, E.Either<E, A>>) => Kind<M, E.Either<E, A>>
export function orElseFirst<M>(
  M: Monad<M>
): <E, B>(onLeft: (e: E) => HKT<M, E.Either<E, B>>) => <A>(ma: HKT<M, E.Either<E, A>>) => HKT<M, E.Either<E, A>>
export function orElseFirst<M>(
  M: Monad<M>
): <E, B>(onLeft: (e: E) => HKT<M, E.Either<E, B>>) => <A>(ma: HKT<M, E.Either<E, A>>) => HKT<M, E.Either<E, A>> {
  const orElseM = orElse(M)
  return (onLeft) =>
    orElseM((e) =>
      pipe(
        onLeft(e),
        M.map((eb) => (E.isLeft(eb) ? eb : E.left(e)))
      )
    )
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export function swap<F extends URIS3>(
  F: Functor3<F>
): <R, FE, E, A>(ma: Kind3<F, R, FE, E.Either<E, A>>) => Kind3<F, R, FE, E.Either<A, E>>
export function swap<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <R, E, A>(ma: Kind3<F, R, FE, E.Either<E, A>>) => Kind3<F, R, FE, E.Either<A, E>>
export function swap<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A>(ma: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, E.Either<A, E>>
export function swap<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <E, A>(ma: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, E.Either<A, E>>
export function swap<F extends URIS>(F: Functor1<F>): <E, A>(ma: Kind<F, E.Either<E, A>>) => Kind<F, E.Either<A, E>>
export function swap<F>(F: Functor<F>): <E, A>(ma: HKT<F, E.Either<E, A>>) => HKT<F, E.Either<A, E>>
export function swap<F>(F: Functor<F>): <E, A>(ma: HKT<F, E.Either<E, A>>) => HKT<F, E.Either<A, E>> {
  return F.map(E.swap)
}

/**
 * @since 3.0.0
 */
export function toUnion<F extends URIS3>(
  F: Functor3<F>
): <R, FE, E, A>(fa: Kind3<F, R, FE, E.Either<E, A>>) => Kind3<F, R, FE, E | A>
export function toUnion<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <R, E, A>(fa: Kind3<F, R, FE, E.Either<E, A>>) => Kind3<F, R, FE, E | A>
export function toUnion<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A>(fa: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, E | A>
export function toUnion<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <E, A>(fa: Kind2<F, FE, E.Either<E, A>>) => Kind2<F, FE, E | A>
export function toUnion<F extends URIS>(F: Functor1<F>): <E, A>(fa: Kind<F, E.Either<E, A>>) => Kind<F, E | A>
export function toUnion<F>(F: Functor<F>): <E, A>(fa: HKT<F, E.Either<E, A>>) => HKT<F, E | A>
export function toUnion<F>(F: Functor<F>): <E, A>(fa: HKT<F, E.Either<E, A>>) => HKT<F, E | A> {
  return F.map(E.toUnion)
}

/**
 * @since 3.0.0
 */
export function bracket<M extends URIS2>(
  M: Monad2<M>
): <ME, E, A, B>(
  acquire: Kind2<M, ME, E.Either<E, A>>,
  use: (a: A) => Kind2<M, ME, E.Either<E, B>>,
  release: (a: A, e: E.Either<E, B>) => Kind2<M, ME, E.Either<E, void>>
) => Kind2<M, ME, E.Either<E, B>>
export function bracket<M extends URIS2, ME>(
  M: Monad2C<M, ME>
): <E, A, B>(
  acquire: Kind2<M, ME, E.Either<E, A>>,
  use: (a: A) => Kind2<M, ME, E.Either<E, B>>,
  release: (a: A, e: E.Either<E, B>) => Kind2<M, ME, E.Either<E, void>>
) => Kind2<M, ME, E.Either<E, B>>
export function bracket<M extends URIS>(
  M: Monad1<M>
): <E, A, B>(
  acquire: Kind<M, E.Either<E, A>>,
  use: (a: A) => Kind<M, E.Either<E, B>>,
  release: (a: A, e: E.Either<E, B>) => Kind<M, E.Either<E, void>>
) => Kind<M, E.Either<E, B>>
export function bracket<M>(
  M: Monad<M>
): <E, A, B>(
  acquire: HKT<M, E.Either<E, A>>,
  use: (a: A) => HKT<M, E.Either<E, B>>,
  release: (a: A, e: E.Either<E, B>) => HKT<M, E.Either<E, void>>
) => HKT<M, E.Either<E, B>>
export function bracket<M>(
  M: Monad<M>
): <E, A, B>(
  acquire: HKT<M, E.Either<E, A>>,
  use: (a: A) => HKT<M, E.Either<E, B>>,
  release: (a: A, e: E.Either<E, B>) => HKT<M, E.Either<E, void>>
) => HKT<M, E.Either<E, B>> {
  const leftM = left(M)
  return (acquire, use, release) =>
    pipe(
      acquire,
      M.chain(
        E.match(leftM, (a) =>
          pipe(
            use(a),
            M.chain((e) => pipe(release(a, e), M.chain(E.match(leftM, () => M.of(e)))))
          )
        )
      )
    )
}
