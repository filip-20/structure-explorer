import Expression from "../Expression";
import { Symbol } from "../Language";
import Structure, { DomainElement } from "../Structure";

/**
 * Represent simple term.
 * @author Milan Cifra
 * @author Jozef Filip
 * @class
 * @abstract
 *
 */
abstract class Term extends Expression {
  abstract eval(
    structure: Structure,
    e: Map<Symbol, DomainElement>
  ): DomainElement;
}

export default Term;
