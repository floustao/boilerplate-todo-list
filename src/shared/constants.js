export const API_STATES = {
	LOADING: 'LOADING',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
};

export const FORM_ACTIONS = {
	UPDATE_START_YEAR: 'update-start-year',
	UPDATE_END_YEAR: 'update-end-year',
	UPDATE_RANGE_YEARS: 'update-range-years',
	SUBMITTING: 'submitting',
	CANCEL: 'cancel',
};

export const YEAR_OPTIONS = {
	'this year': {
		value: 'this year',
		range: 0,
		endYear: 2021,
	},
	'next year': {
		value: 'next year',
		range: 1,
		endYear: 2022,
	},
	'last year': {
		value: 'last year',
		range: 1,
		endYear: 2021,
	},
	'last 5 years': {
		value: 'last 5 years',
		range: 5,
		endYear: 2021,
	},
	'next 5 years': {
		value: 'next 5 years',
		range: 5,
		endYear: 2026,
	},
	'from last 5 years to next 5 years': {
		value: 'from last 5 years to next 5 years',
		range: 10,
		endYear: 2027,
	},
	'last century': {
		value: 'last century',
		range: 100,
		endYear: 2000,
	},
};

export const DEFAULT_RANGE = {
	startYear: 0,
	endYear: 0,
};
