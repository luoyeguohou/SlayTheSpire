/**
 * The `Semiring` class is for types that support an addition and multiplication operation.
 *
 * Instances must satisfy the following laws:
 *
 * - Commutative monoid under addition:
 *   - Associativity: `(a + b) + c <-> a + (b + c)`
 *   - Identity: `zero + a = a + zero <-> a`
 *   - Commutative: `a + b <-> b + a`
 * - Monoid under multiplication:
 *   - Associativity: `(a * b) * c <-> a * (b * c)`
 *   - Identity: `one * a <-> a * one <-> a`
 * - Multiplication distributes over addition:
 *   - Left distributivity: `a * (b + c) <-> (a * b) + (a * c)`
 *   - Right distributivity: `(a + b) * c <-> (a * c) + (b * c)`
 * - Annihilation: `zero * a <-> a * zero <-> zero`
 *
 * **Note:** The `number` type is not fully law abiding members of this class hierarchy due to the potential
 * for arithmetic overflows, and the presence of `NaN` and `Infinity` values. The behaviour is
 * unspecified in these cases.
 *
 * @since 3.0.0
 */

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Semiring<A> {
  readonly add: (second: A) => (first: A) => A
  readonly zero: A
  readonly mul: (second: A) => (first: A) => A
  readonly one: A
}
