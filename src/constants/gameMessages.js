import React from "react";
export const FIRST_QUESTION = (params) => `Čo predpokladáš o pravdivosti formuly ${params} v štruktúre ℳ pri ohodnotení e?`;
export const ENTRY_SENTENCE = (formula, truth) => `Predpokladáš, že formula ${formula} je ${truth}.`;
export const EVALUATED_PREDICATE_IN = (formula, formulaName) => `${formula} ∈ i(${formulaName})`;
export const EVALUATED_PREDICATE_NOT_IN = (formula, formulaName) => `${formula} ∉ i(${formulaName})`;
export const EVALUATED_EQUALITY = (term1, term2) => `(${term1}) = (${term2})`;
export const EVALUATED_INEQUALITY = (term1, term2) => `(${term1}) ≠ (${term2})`;

export const WIN_1 = (formula, commitment, result) =>
    [
        <strong>Vyhral/a si!</strong>,
        ` 🎉 Formula ${formula} je naozaj ${commitment}, pretože ${result}.`
    ];
export const WIN_2 = (formula, commitment) =>
    `Tvoj úvodný predpoklad, že formula ${formula} je ${commitment}, bol správny.`

export const LOSS = (formula, commitment, result) =>
    [
        <strong>Prehral/a si!</strong>,
        ` 😞 Formula ${formula} je ${commitment}, pretože ${result}.`
    ];
export const COULD_WON = (formula, commitment) =>
    [
        <strong>Mohol/mohla si však vyhrať.</strong>,
        ` 🤔 Tvoj úvodný predpoklad, že formula ${formula} je ${commitment}, je správny. Nájdi chybnú odpoveď a zmeň ju!`
    ];
export const COULD_NOT_WON = (formula, commitment) =>
    `Tvoj úvodný predpoklad, že formula ${formula} je ${commitment}, je chybný.`;


export const OPERATOR_QUESTION = () => `Ktorý z nasledujúcich prípadov nastáva?`;
export const FIRST_FORMULA_OPTION = (formula, commitment) => `1. Podformula ${formula} je ${commitment}.`;
export const SECOND_FORMULA_OPTION = (formula, commitment) => `2. Podformula ${formula} je ${commitment}.`;

export const OPERATOR_ANSWER = (formula, commitment) => `Potom ${formula} je ${commitment}.`;

export const QUANTIFIER_QUESTION = (varName, formula, commitment) =>
    `Ktorý prvok z domény má premenná ${varName} označovať, aby bola formula ${formula} ${commitment}?`;

export const QUANTIFIER_ANSWER_1 = (commitment, formula) => `Potom je ${commitment} aj formula ${formula},`;
export const QUANTIFIER_ANSWER_2 = (varName, vaValue) => `keď premennou ${varName} označíme prvok ${vaValue}.`;