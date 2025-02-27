/**
 * Represent components_parts
 * @author Milan Cifra
 * @class
 */
class Structure {
  language: any;
  domain: Set<unknown>;
  iC: Map<any, any>;
  iP: Map<any, any>;
  iF: Map<any, any>;
  /**
   *
   * @param {Language} language
   */

  constructor(
    language: any,
    parsedDomain: any[],
    constants: { [x: string]: { value: any } },
    predicates: { [x: string]: { parsed: any[] } },
    functions: { [x: string]: { parsed: any[] } }
  ) {
    this.language = language;
    this.domain = new Set();
    this.iC = new Map();
    this.iP = new Map();
    this.iF = new Map();
    parsedDomain.forEach((i: any) => {
      this.domain.add(i);
    });
    this.language.constants.forEach((c: string | number) => {
      this.iC.set(c, constants[c].value);
    });

    this.language.functions.forEach((arity: string, name: string) => {
      let functionName = name + "/" + arity;
      this.iF.set(functionName, {});
      if (functions[functionName] === undefined) {
        return;
      }
      functions[functionName].parsed.forEach((tuple: string | any[]) => {
        let params = tuple.slice(0, tuple.length - 1);
        let value = tuple[tuple.length - 1];
        this.iF.get(functionName)[JSON.stringify(params)] = value;
      });
    });

    this.language.predicates.forEach((arity: string, name: string) => {
      let predicateName = name + "/" + arity;
      this.iP.set(predicateName, []);
      if (predicates[predicateName] === undefined) {
        return;
      }
      predicates[predicateName].parsed.forEach((tuple: any) => {
        this.iP.get(predicateName).push(tuple);
      });
    });
  }
}

export default Structure;
