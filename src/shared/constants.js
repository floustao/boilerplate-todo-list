export const API_STATES = {
	LOADING: 'LOADING',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
};

export const FORM_ACTIONS = {
	UPDATE_START_YEAR: 'update-start-year',
	UPDATE_END_YEAR: 'update-end-year',
	UPDATE_RANGE_YEARS: 'update-range-years',
	SUBMITING: 'submitting',
};

export const YEAR_OPTIONS = {
	'this year': {
		value: 'this year',
		range: 0,
		endYear: 2021,
	},
	'last century': {
		value: 'last century',
		range: 100,
		endYear: 2000,
	},
	'last year': {
		value: 'last year',
		range: 0,
		endYear: 2021,
	},
};
