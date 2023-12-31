/**
 * A join-semilattice (or upper semilattice) is a semilattice whose operation is called `join`, and which can be thought
 * of as a least upper bound.
 *
 * A `JoinSemilattice` must satisfy the following laws:
 *
 * - Associativity: `a ∨ (b ∨ c) <-> (a ∨ b) ∨ c`
 * - Commutativity: `a ∨ b <-> b ∨ a`
 * - Idempotency:   `a ∨ a <-> a`
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
export interface JoinSemilattice<A> {
  readonly join: (second: A) => (first: A) => A
}
