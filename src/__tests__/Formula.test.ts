// import Formula from "../model/formula/Formula";
// import Term from "../model/term/Term";
// import FunctionTerm from "../model/term/Term.FunctionTerm";
// import Constant from "../model/term/Term.Constant";
// import Variable from "../model/term/Term.Variable";
// import PredicateAtom from "../model/formula/Formula.PredicateAtom";
// import EqualityAtom from "../model/formula/Formula.EqualityAtom";
// import Negation from "../model/formula/Formula.Negation";
// import Conjunction from "../model/formula/Formula.Conjunction";
// import Disjunction from "../model/formula/Formula.Disjunction";
// import Implication from "../model/formula/Formula.Implication";
// import Equivalence from "../model/formula/Formula.Equivalence";
// import ExistentialQuant from "../model/formula/Formula.ExistentialQuant";
// import UniversalQuant from "../model/formula/Formula.UniversalQuant";
// import Language from "../model/Language";
// import Structure from "../model/Structure";

// //source: https://fmfi-uk-1-ain-412.github.io/lpi/teoreticke-ain/zbierka.pdf
// describe("exercise 2.2.1", () => {
//   const domain = new Set(["barca", "janci", "karci"]);
//   const constants = new Set(["karol"]);
//   const predicates = new Map<string, number>([
//     ["profesor", 1],
//     ["hlupy", 1],
//     ["scitany", 1],
//   ]);
//   const functions = new Map<string, number>();
//   const language = new Language(constants, predicates, functions);

//   const iC = new Map<string, string>([["karol", "karci"]]);
//   const iPprofesor = new Set<string[]>([["karci"], ["janci"]]);
//   const iPhlupy = new Set<string[]>([["janci"]]);
//   const iPscitany = new Set<string[]>([["barca"], ["karci"]]);
//   const iP = new Map<string, Set<string[]>>([
//     ["profesor", iPprofesor],
//     ["hlupy", iPhlupy],
//     ["scitany", iPscitany],
//   ]);
//   const iF = new Map<string, Map<string[], string>>();
//   const structure = new Structure(language, domain, iC, iP, iF);

//   const karol = new Constant("karol");
//   const lhs = new PredicateAtom("profesor", [karol]);
//   const rlhs = new PredicateAtom("hlupy", [karol]);
//   const rrhs = new PredicateAtom("scitany", [karol]);
//   const rhs = new Conjunction(new Negation(rlhs), rrhs);

//   const formula = new Implication(lhs, rhs);

//   test("rlhs", () => {
//     expect(rlhs.eval(structure, new Map())).toBe(false);
//   });

//   test("rrhs", () => {
//     expect(rrhs.eval(structure, new Map())).toBe(true);
//   });

//   test("lhs", () => {
//     expect(lhs.eval(structure, new Map())).toBe(true);
//   });

//   test("rhs", () => {
//     expect(rhs.eval(structure, new Map())).toBe(true);
//   });

//   test("full formula", () => {
//     expect(formula.eval(structure, new Map())).toBe(true);
//   });
// });

// describe("exercise 2.2.2", () => {
//   const domain = new Set(["1", "2", "3", "4", "5", "6"]);
//   const constants = new Set(["alex", "bruno", "hugo", "tereza"]);
//   const predicates = new Map<string, number>([
//     ["zena", 1],
//     ["muz", 1],
//     ["ma_rad", 2],
//     ["brat", 2],
//     ["rodic", 2],
//     ["starsi", 2],
//   ]);
//   const functions = new Map<string, number>();
//   const language = new Language(constants, predicates, functions);

//   const iC = new Map<string, string>([
//     ["alex", "1"],
//     ["bruno", "2"],
//     ["hugo", "5"],
//     ["tereza", "6"],
//   ]);

//   const iPzena = new Set<string[]>([["1"], ["3"], ["4"], ["6"]]);
//   const iPmuz = new Set<string[]>([["2"], ["4"]]);
//   const iPma_rad = new Set<string[]>([
//     ["1", "1"],
//     ["1", "2"],
//     ["1", "5"],
//     ["1", "6"],
//     ["2", "2"],
//     ["3", "3"],
//     ["3", "4"],
//     ["4", "4"],
//     ["5", "5"],
//     ["5", "6"],
//   ]);
//   const iPbrat = new Set<string[]>([
//     ["1", "2"],
//     ["2", "1"],
//     ["3", "1"],
//     ["4", "4"],
//     ["5", "6"],
//     ["6", "1"],
//     ["6", "2"],
//     ["6", "6"],
//   ]);

//   const iProdic = new Set<string[]>([
//     ["1", "1"],
//     ["2", "5"],
//     ["2", "6"],
//     ["1", "5"],
//     ["3", "4"],
//     ["4", "2"],
//     ["1", "6"],
//     ["5", "6"],
//     ["6", "5"],
//   ]);

//   const iPstarsi = new Set<string[]>([
//     ["2", "1"],
//     ["5", "6"],
//     ["6", "5"],
//   ]);

//   const iP = new Map<string, Set<string[]>>([
//     ["zena", iPzena],
//     ["muz", iPmuz],
//     ["ma_rad", iPma_rad],
//     ["brat", iPbrat],
//     ["rodic", iProdic],
//     ["starsi", iPstarsi],
//   ]);
//   const iF = new Map<string, Map<string[], string>>();
//   const structure = new Structure(language, domain, iC, iP, iF);

//   const alex = new Constant("alex");
//   const bruno = new Constant("bruno");
//   const hugo = new Constant("hugo");
//   const tereza = new Constant("tereza");

//   const a1 = new Implication(
//     new PredicateAtom("starsi", [bruno, alex]),
//     new Negation(new PredicateAtom("starsi", [alex, bruno]))
//   );

//   const a2 = new Equivalence(
//     new Negation(new PredicateAtom("ma_rad", [alex, bruno])),
//     new Negation(new PredicateAtom("ma_rad", [bruno, alex]))
//   );

//   const a3 = new Implication(
//     new Conjunction(
//       new PredicateAtom("rodic", [bruno, hugo]),
//       new PredicateAtom("rodic", [bruno, tereza])
//     ),
//     new Implication(
//       new Conjunction(
//         new Negation(new PredicateAtom("zena", [hugo])),
//         new PredicateAtom("muz", [hugo])
//       ),
//       new PredicateAtom("brat", [hugo, tereza])
//     )
//   );

//   test("a1", () => {
//     expect(a1.eval(structure, new Map())).toBe(true);
//   });

//   test("a2", () => {
//     expect(a2.eval(structure, new Map())).toBe(false);
//   });

//   test("a3", () => {
//     expect(a3.eval(structure, new Map())).toBe(true);
//     expect(a3.subRight.depth()).toBe(4);
//   });
// });

// // describe("winningSubformula", () => {
// //   const domain = new Set(["barca", "janci", "karci"]);
// //   const constants = new Set(["karol"]);
// //   const predicates = new Map<string, number>([
// //     ["profesor", 1],
// //     ["hlupy", 1],
// //     ["scitany", 1],
// //   ]);
// //   const functions = new Map<string, number>();
// //   const language = new Language(constants, predicates, functions);

// //   const iC = new Map<string, string>([["karol", "karci"]]);
// //   const iPprofesor = new Set<string[]>([["karci"], ["janci"]]);
// //   const iPhlupy = new Set<string[]>([["janci"]]);
// //   const iPscitany = new Set<string[]>([["barca"], ["karci"]]);
// //   const iP = new Map<string, Set<string[]>>([
// //     ["profesor", iPprofesor],
// //     ["hlupy", iPhlupy],
// //     ["scitany", iPscitany],
// //   ]);
// //   const iF = new Map<string, Map<string[], string>>();
// //   const structure = new Structure(language, domain, iC, iP, iF);

// //   const karol = new Constant("karol");
// //   const lhs = new PredicateAtom("profesor", [karol]);
// //   const rlhs = new PredicateAtom("hlupy", [karol]);
// //   const rrhs = new PredicateAtom("scitany", [karol]);
// //   const rhs = new Conjunction(new Negation(rlhs), rrhs);

// //   //F profesor(Karol) → (¬hlúpy(Karol) ∧ sčítaný(Karol)))
// //   const formula = new Implication(lhs, rhs);

// //   //T profesor(karol) & F (¬hlúpy(Karol) ∧ sčítaný(Karol))
// //   test("winningSubformula", () => {
// //     expect(
// //       formula.winningSubformula(false, structure, new Map())?.toString()
// //     ).toBe(rhs.toString());
// //   });
// // });

// // describe("winningElement", () => {
// //   const domain = new Set(["barca", "janci", "karci"]);
// //   const constants = new Set(["karol"]);
// //   const predicates = new Map<string, number>([
// //     ["profesor", 1],
// //     ["hlupy", 1],
// //     ["scitany", 1],
// //   ]);
// //   const functions = new Map<string, number>();
// //   const language = new Language(constants, predicates, functions);

// //   const iC = new Map<string, string>([["karol", "karci"]]);
// //   const iPprofesor = new Set<string[]>([["karci"], ["janci"]]);
// //   const iPhlupy = new Set<string[]>([["janci"]]);
// //   const iPscitany = new Set<string[]>([["barca"], ["karci"]]);
// //   const iP = new Map<string, Set<string[]>>([
// //     ["profesor", iPprofesor],
// //     ["hlupy", iPhlupy],
// //     ["scitany", iPscitany],
// //   ]);
// //   const iF = new Map<string, Map<string[], string>>();
// //   const structure = new Structure(language, domain, iC, iP, iF);

// //   const variable = new Variable("x");

// //   const karol = new Constant("karol");
// //   const lhs = new PredicateAtom("profesor", [variable]);
// //   const rlhs = new PredicateAtom("hlupy", [variable]);
// //   const rrhs = new PredicateAtom("scitany", [variable]);
// //   const rhs = new Conjunction(new Negation(rlhs), rrhs);

// //   //\a x profesor(x) → (¬hlúpy(x) ∧ sčítaný(x)))
// //   const formula = new Implication(lhs, rhs);

// //   const qFormula = new UniversalQuant("x", formula);

// //   test("winningElement", () => {
// //     expect(
// //       qFormula.winningElement(true, structure, new Map())?.toString()
// //     ).toBe("janci");
// //   });
// // });
