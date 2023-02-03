export const CONSTANT_IN_LANGUAGE =
    'Language 𝓛 already contains the constant';
export const FUNCTION_IN_LANGUAGE =
    'Language 𝓛 already contains the function symbol';
export const PREDICATE_IN_LANGUAGE =
    'Language 𝓛 already contains the predicate symbol';

export const ITEM_IN_LANGUAGE = (item) => `Language 𝓛 already contains the symbol ${item}`;

export const EMPTY_CONSTANT_VALUE =
    'An interpretation of this constant must be defined';
export const EMPTY_DOMAIN =
    'Domain cannot be empty';
export const ITEM_NOT_IN_DOMAIN = (item) =>
    `${item} is not an element of the domain`;

export const FUNCTION_NOT_FULL_DEFINED =
    'Function is not total (i.e., defined for all domain elements or tuples)';
export const FUNCTION_ALREADY_DEFINED = (params) =>
    `Multiple function values are assigned to ${params}`;

export const addTypeDescription = (symbolType) => symbolType.toLowerCase()
