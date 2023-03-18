export const STUDENT_MODE = 'STUDENT';

export const CONSTANT = 'CONSTANT';
export const FUNCTION = 'FUNCTION';
export const PREDICATE = 'PREDICATE';
export const DOMAIN = 'DOMAIN';
export const VARIABLE = 'VARIABLE';



export const FORMULA = 'FORMULA';
export const CONTEXT_FORMULA = 'CONTEXT_FORMULA';
export const TERM = 'TERM';

export const EXPRESSION_LABEL = {
  FORMULA: '𝝋',
  TERM: '𝝉'
};

export const defaultInputData = () => ({value: '', locked: false, errorMessage: '', parsed: []});
export const defaultExpressionData = () => ({
  value: '',
  expressionValue: null,
  answerValue: '',
  errorMessage: '',
  inputLocked: false,
  answerLocked: false,
  parsed: null
});

export const DEFAULT_FILE_NAME = 'structure';