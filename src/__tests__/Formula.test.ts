import Formula from "../model/formula/Formula";
import Term from "../model/term/Term";
import FunctionTerm from "../model/term/Term.FunctionTerm";
import Constant from "../model/term/Term.Constant";
import Variable from "../model/term/Term.Variable";
import PredicateAtom from "../model/formula/Formula.PredicateAtom";
import EqualityAtom from "../model/formula/Formula.EqualityAtom";
import Negation from "../model/formula/Formula.Negation";
import Conjunction from "../model/formula/Formula.Conjunction";
import Disjunction from "../model/formula/Formula.Disjunction";
import Implication from "../model/formula/Formula.Implication";
import Equivalence from "../model/formula/Formula.Equivalence";
import ExistentialQuant from "../model/formula/Formula.ExistentialQuant";
import UniversalQuant from "../model/formula/Formula.UniversalQuant";
import Language from "../model/Language";
import Structure from "../model/Structure";

//source: https://fmfi-uk-1-ain-412.github.io/lpi/teoreticke-ain/zbierka.pdf
describe("testing test", () => {
  const domain = new Set(["barca", "janci", "karci"]);
  const constants = new Set(["karol"]);
  const predicates = new Map<string, number>([
    ["profesor", 1],
    ["hlupy", 1],
    ["scitany", 1],
  ]);
  const functions = new Map<string, number>();
  const language = new Language(constants, predicates, functions);

  const iC = new Map<string, string>([["karol", "karci"]]);
  const iPprofesor = new Set<string[]>([["karci"], ["janci"]]);
  const iPhlupy = new Set<string[]>([["janci"]]);
  const iPscitany = new Set<string[]>([["barca"], ["karci"]]);
  const iP = new Map<string, Set<string[]>>([
    ["profesor", iPprofesor],
    ["hlupy", iPhlupy],
    ["scitany", iPscitany],
  ]);
  const iF = new Map<string, Map<string[], string>>();
  const structure = new Structure(language, domain, iC, iP, iF);

  const karol = new Constant("karol");
  const lhs = new PredicateAtom("profesor", [karol]);
  const rlhs = new PredicateAtom("hlupy", [karol]);
  const rrhs = new PredicateAtom("scitany", [karol]);
  const rhs = new Conjunction(new Negation(rlhs), rrhs);

  const formula = new Implication(lhs, rhs);

  test("exercise 2.2.1", () => {
    expect(formula.eval(structure, new Map())).toBe(true);
  });
});
