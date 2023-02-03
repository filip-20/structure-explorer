import React from "react";
export const FIRST_QUESTION = (formula) =>
    `What is your initial assumption about the truth/satisfaction
    of the formula ${formula} by the valuation 𝑒 in the structure ℳ?`;
export const ENTRY_SENTENCE = (formula, truth) =>
    `You assume that the formula ${formula} is ${truth}.`;
export const EVALUATED_PREDICATE_IN = (tuple, formulaName) =>
    `${tuple} ∈ i(${formulaName})`;
export const EVALUATED_PREDICATE_NOT_IN = (tuple, formulaName) =>
    `${tuple} ∉ i(${formulaName})`;
export const EVALUATED_EQUALITY = (term1, term2) =>
    `${term1} = ${term2}`;
export const EVALUATED_INEQUALITY = (term1, term2) =>
    `${term1} ≠ ${term2}`;

export const WIN_1 = (formula, commitment, result) =>
    [
        <strong key={0}>You win!</strong>,
        ` 🎉 The formula ${formula} is indeed ${commitment}, since ${result}.`
    ];
export const WIN_2 = (formula, commitment) =>
    `Your initial assumption that the formula ${formula} is ${commitment}
    was correct.`

export const LOSS = (formula, commitment, result) =>
    [
        <strong key={0}>You loose!</strong>,
        ` 😞 The formula ${formula} is ${commitment}, since ${result}.`
    ];
export const COULD_WON = (formula, commitment) =>
    [
        <strong key={0}>You could have won, though.</strong>,
        ` 🤔 Your initial assumption
        that the formula ${formula} is ${commitment} was correct.
        Find incorrect intermediate answers and correct them!`
    ];
export const COULD_NOT_WON = (formula, commitment) =>
    `Your initial assumption that the formula ${formula} is ${commitment}
    was incorrect.`;


export const OPERATOR_QUESTION = () =>
    `Which of the following is the case?`;
export const FIRST_FORMULA_OPTION = (formula, commitment) =>
    `1. The subformula ${formula} is ${commitment}.`;
export const SECOND_FORMULA_OPTION = (formula, commitment) =>
    `2. The subformula ${formula} is ${commitment}.`;

export const OPERATOR_ANSWER = (formula, commitment) =>
    `Then ${formula} is ${commitment}.`;

export const QUANTIFIER_QUESTION = (varName, formula, commitment) =>
    `Which domain element should be assigned to the variable ${varName}
    in order to make formula ${formula} ${commitment}?`;

export const QUANTIFIER_ANSWER = (commitment, formula, varName, varValue) =>
    `Then the formula ${formula} is also ${commitment},
    when we assign the element ${varValue} to the variable ${varName}.`;

export const BTN_CHANGE = "Change";

export const BTN_SHOW = "Show";
export const BTN_HIDE = "Hide";
export const BTN_CONT_CURRENT_ASGNMT = " current assignment";

export const BTN_TRUE = 'True';
export const BTN_FALSE = 'False';

export const MID_IS = ' is ';
export const COMMITMENT_TRUE = 'true';
export const COMMITMENT_FALSE = 'false';

export const SELECT_DOMAIN_ELEM = 'Select a domain element';
export const VAR_IS_ASSIGNED = (varName, value) =>
    `Assign the domain element ${value} to the variable ${varName}`;

export const BTN_CONTINUE = 'Continue';
export const BTN_FINISH_GAME = 'Finish game';
