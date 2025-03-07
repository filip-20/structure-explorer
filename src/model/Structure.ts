/**
 * Represent components_parts
 * @author Milan Cifra
 * @author Jozef Filip
 * @class
 */

import { Symbol, Language } from "./Language";

export type DomainElement = string;

export type Valuation = Map<Symbol, DomainElement>;

export class Structure {
  /**
   *
   * @param {Language} language
   */

  constructor(
    public language: Language,
    public domain: Set<DomainElement>,
    public iC: Map<Symbol, DomainElement>,
    public iP: Map<Symbol, Set<DomainElement[]>>,
    public iF: Map<Symbol, Map<DomainElement[], DomainElement>>
  ) {}
}

export default Structure;
