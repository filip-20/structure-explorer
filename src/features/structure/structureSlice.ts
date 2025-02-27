import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  parseDomain,
  SyntaxError,
  parseTuples,
} from "@fmfi-uk-1-ain-412/js-fol-parser";
import {
  selectParsedFunctions,
  selectParsedPredicates,
} from "../language/languageSlice";

export interface InterpretationState {
  text: string;
}

export interface StructureState {
  domain: string;
  iC: Record<string, InterpretationState>;
  iP: Record<string, InterpretationState>;
  iF: Record<string, InterpretationState>;
}

const initialState: StructureState = {
  domain: "",
  iC: {},
  iP: {},
  iF: {},
};

export const structureSlice = createSlice({
  name: "structure",
  initialState,
  reducers: {
    updateDomain: (state, action: PayloadAction<string>) => {
      state.domain = action.payload;
    },
    updateInterpretationConstants: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.iC[key] = { text: value };
    },
    updateInterpretationPredicates: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.iP[key] = { text: value };
    },
    updateFunctionSymbols: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.iF[key] = { text: value };
    },
  },
});

export const {
  updateDomain,
  updateInterpretationConstants,
  updateInterpretationPredicates,
  updateFunctionSymbols,
} = structureSlice.actions;

export const selectDomain = (state: RootState) => state.structure.domain;

export const selectIc = (state: RootState) => state.structure.iC;
export const selectIndividualConstant = (state: RootState, name: string) =>
  state.structure.iC[name];

export const selectIp = (state: RootState) => state.structure.iP;
export const selectPredicateSymbol = (state: RootState, name: string) => {
  return { interpretation: state.structure.iP[name], name: name };
};

export const selectIf = (state: RootState) => state.structure.iF;
export const selectFunctionSymbol = (state: RootState, name: string) => {
  return { interpretation: state.structure.iF[name], name: name };
};

export const selectParsedDomain = createSelector([selectDomain], (domain) => {
  try {
    let parsedDomain = parseDomain(domain);
    if (parsedDomain.length === 0)
      return {
        error: new Error("Domain cannot be empty"),
      };

    return { parsed: parsedDomain };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { error: error };
    }

    throw error;
  }
});

//vyzera ze to funguje, ale je to spravne?
export const selectIndividualConstantsErrors = createSelector(
  [selectIc, selectParsedDomain],
  (constants, domain) => {
    let err: Record<string, Error | SyntaxError | undefined> = {};

    //new SyntaxError("Domain cannot be empty",x,"",l)

    Object.entries(constants).forEach(
      ([i, j]) =>
        (err[i] =
          domain.parsed?.filter((value) => value == j.text).length == 0
            ? (err[i] = new Error("Domain does not contain this"))
            : undefined)
    );

    return err;
  }
);

// selectParsedConstant: { parsed?: string, error?: Error }
export const selectParsedConstant = createSelector(
  [selectIndividualConstant, selectParsedDomain],
  (constant, domain) => {
    if (constant === undefined || constant.text === "") {
      const err = new Error("Interpretation must be defined");
      return { error: err };
    }

    if (
      domain.parsed === undefined ||
      domain.parsed.includes(constant.text) === false
    ) {
      const err = new Error("Domain does not contain this symbol");
      return { error: err };
    }

    return { parsed: constant.text };
  }
);

export const selectParsedPredicate = createSelector(
  [selectPredicateSymbol, selectParsedDomain, selectParsedPredicates],
  (predicate, domain, preds) => {
    if (!preds.parsed) return {};
    if (!domain.parsed) return {};
    if (!predicate.interpretation) return {};

    try {
      const interpretation = predicate.interpretation.text;
      const arity = preds.parsed.get(predicate.name);
      const parsed = parseTuples(interpretation);

      let err = undefined;

      parsed.forEach((tuple) => {
        if (tuple.length !== arity) {
          err = new Error(`${arity}-tuple ${tuple} has incorrect size.`);
          return;
        }

        tuple.forEach((element) => {
          if (domain.parsed.includes(element) === false) {
            err = new Error(`Element ${element} is not in domain.`);
            return;
          }
        });

        parsed.forEach((tuple2) => {
          if (
            JSON.stringify(tuple) === JSON.stringify(tuple2) &&
            tuple != tuple2
          ) {
            err = new Error(`${arity}-tuple ${tuple} is already in predicate.`);
            return;
          }
        });
      });
      return { error: err, parsed: parsed };
    } catch (error) {
      if (error instanceof Error || error instanceof SyntaxError) {
        return { error: error };
      }

      throw error;
    }
  }
);

function getAllPossibleCombinations(arr: string[], size: number): string[][] {
  const result: string[][] = [];

  const generateCombinations = (current: string[]) => {
    if (current.length === size) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      current.push(arr[i]);
      generateCombinations(current);
      current.pop();
    }
  };

  generateCombinations([]);
  return result;
}

export const selectParsedFunction = createSelector(
  [selectFunctionSymbol, selectParsedDomain, selectParsedFunctions],
  (fun, domain, functions) => {
    if (!functions.parsed) return {};
    if (!domain.parsed)
      return { error: new Error("Function is not fully defined") };
    if (!fun.interpretation) return {};

    try {
      const interpretation = fun.interpretation.text;
      const arity = functions.parsed.get(fun.name);
      const parsed = parseTuples(interpretation);

      let err = undefined;

      if (parsed.length !== Math.pow(domain.parsed.length, arity! - 1)) {
        err = new Error("Function is not fully defined");
      }

      let all = getAllPossibleCombinations(domain.parsed, arity!);

      parsed.forEach((tuple) => {
        if (arity !== undefined && tuple.length != arity + 1) {
          err = new Error(
            `Tuple ${tuple} has incorrect size (${tuple.length} , should be ${
              arity + 1
            }).`
          );
          return;
        }

        tuple.forEach((element) => {
          if (domain.parsed.includes(element) === false) {
            err = new Error(`Element ${element} is not in domain.`);
            return;
          }
        });

        parsed.forEach((tuple2) => {
          if (
            JSON.stringify(tuple.slice(0, -1)) ===
              JSON.stringify(tuple2.slice(0, -1)) &&
            tuple != tuple2
          ) {
            err = new Error(
              `Tuple ${tuple.slice(0, -1)} is already in function.`
            );
          }
        });

        if (
          all.filter(
            (i) => JSON.stringify(i) === JSON.stringify(tuple.slice(0, -1))
          ).length === 1
        ) {
          all = all.filter(
            (i) => JSON.stringify(i) !== JSON.stringify(tuple.slice(0, -1))
          );
        }
      });

      if (err === undefined && all.length !== 0) {
        err = new Error("Function is not fully defined");
      } else if (err !== undefined && all.length == 0) {
        err = undefined;
      }

      return { error: err, parsed: parsed };
    } catch (error) {
      if (error instanceof Error || error instanceof SyntaxError) {
        return { error: error };
      }

      throw error;
    }
  }
);

// export const selectPredicateSymbolsErrors = createSelector([selectPredicateSymbols, selectErrorDomain, selectErrorPredicates], (predicates, domain, preds) => {
//   let err: Record<string, SyntaxError | undefined> = {}

//   let l = {
//     start: {
//       offset: 0,
//       line: 0,
//       column: 0
//     },
//     end: {
//       offset: 0,
//       line: 0,
//       column: 0
//     },
//   }
//   let x = Object
//   //new SyntaxError("Domain cannot be empty",x,"",l)

//   if (!preds.parsed) return {};

//   preds.parsed.forEach((symbol, arity) => {
//     try {
//       const interpretation = predicates[symbol] ?? { text: '' };
//       const parsed = parseTuples(interpretation.text);

//       for (let index = 0; index < parsed.length; index++) {
//         const element = parsed[index];

//         if (element.length !== arity) {
//           err[symbol] = new SyntaxError("Tuple " + element + " is of invalid size",x,"",l)
//           break
//         }

//         for (let index = 0; index < element.length; index++) {
//           const el = element[index];
//           if (el.every(domain.parsed.includes(el)) {
//             err[symbol] = new SyntaxError("Element " + el + " is not in domain",x,"",l)
//             break
//           }
//         }

//         for (let index2 = index; index2 < parsed.length; index2++) {
//           const element2 = parsed[index2];

//           if (JSON.stringify(element) == JSON.stringify(element2) && element != element2) {
//             err[symbol] = new SyntaxError("Tuple " + element + " is already in predicate",x,"",l)
//           }

//         }

//       }

//     } catch (error) {
//       if (error instanceof SyntaxError) {
//         err[symbol] = error
//       }
//     }

//   })

//   return err

// })

export default structureSlice.reducer;
