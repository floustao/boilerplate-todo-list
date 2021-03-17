import { useReducer, useCallback } from 'react';
import { FORM_ACTIONS, API_STATES, YEAR_OPTIONS } from '../../shared/constants';
// import axios from 'axios';

export default function useForm() {
	const [formState, dispatch] = useReducer(reducer, initialState);

	const handleSubmit = useCallback(
		async (e) => {
			try {
				e.preventDefault();
				dispatch({ type: FORM_ACTIONS.SUBMITTING });
				// const response = await axios.post(
				// 	'https://jsonplaceholder.typicode.com/posts',
				// 	{}
				// );
				// dispatch({ type: API_STATES.SUCCESS, payload: response.data });
				console.log({ formState });
				dispatch({ type: API_STATES.SUCCESS });
			} catch (error) {
				dispatch({ type: API_STATES.ERROR, payload: error });
			}
		},
		[formState]
	);

	const handleChangeStartYear = (e) => {
		dispatch({ type: FORM_ACTIONS.UPDATE_START_YEAR, payload: e.target.value });
	};

	const handleChangeEndYear = (e) => {
		dispatch({ type: FORM_ACTIONS.UPDATE_END_YEAR, payload: e.target.value });
	};

	const handleChangeSelectedYears = (e) => {
		dispatch({
			type: FORM_ACTIONS.UPDATE_RANGE_YEARS,
			payload: { value: e.target.value },
		});
	};

	return {
		formState,
		handleSubmit,
		handleChangeStartYear,
		handleChangeEndYear,
		handleChangeSelectedYears,
	};
}

const initialState = {
	selectedYears: {
		startYear: 2021,
		endYear: 2021,
	},
	apiState: API_STATES.SUCCESS,
	error: '',
};

function getStartAndEndYears(optionKey) {
	const { endYear, range } = YEAR_OPTIONS[optionKey];
	return {
		startYear: endYear - range,
		endYear: endYear,
	};
}

// function getCurrentYear() {
// 	let today = new Date();
// 	let currentYear = today.getFullYear();
// 	return currentYear;
// }

// function getLastYear() {
// 	let today = new Date();
// 	let lastYear = today.getFullYear() - 1;
// 	return lastYear;
// }

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case FORM_ACTIONS.UPDATE_RANGE_YEARS:
		case FORM_ACTIONS.UPDATE_START_YEAR:
		case FORM_ACTIONS.UPDATE_END_YEAR:
			return {
				...state,
				selectedYears: getStartAndEndYears(payload.value),
			};

		case FORM_ACTIONS.SUBMITTING:
			return {
				...state,
				apiState: API_STATES.LOADING,
			};

		case API_STATES.SUCCESS:
			return {
				...state,
				name: '',
				error: '',
				apiState: API_STATES.SUCCESS,
			};

		case API_STATES.ERROR:
			return {
				...state,
				error: 'Something went wrong',
				apiState: API_STATES.ERROR,
			};

		default:
			return state;
	}
};
