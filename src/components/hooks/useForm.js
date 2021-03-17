import { useReducer, useCallback } from 'react';
import get from 'lodash/get';
import {
	FORM_ACTIONS,
	API_STATES,
	YEAR_OPTIONS,
	DEFAULT_RANGE,
} from '../../shared/constants';

export default function useForm() {
	const [formState, dispatch] = useReducer(reducer, initialState);

	const handleSubmit = useCallback(
		(e) => {
			try {
				e.preventDefault();
				console.log({ formState });
				dispatch({ type: API_STATES.SUCCESS });
			} catch (error) {
				dispatch({ type: API_STATES.ERROR, payload: error });
			}
		},
		[formState]
	);

	const handleCancel = useCallback((e) => {
		try {
			e.preventDefault();
			dispatch({ type: FORM_ACTIONS.CANCEL });
		} catch (error) {
			dispatch({ type: API_STATES.ERROR, payload: error });
		}
	}, []);

	const handleChangeStartYear = (e) => {
		const startYearValue = Number(get(e, 'target.value')) || 0;
		dispatch({ type: FORM_ACTIONS.UPDATE_START_YEAR, payload: startYearValue });
	};

	const handleChangeEndYear = (e) => {
		const endYearValue = Number(get(e, 'target.value')) || 0;
		dispatch({ type: FORM_ACTIONS.UPDATE_END_YEAR, payload: endYearValue });
	};

	const handleChangeSelectedYears = (e) => {
		dispatch({
			type: FORM_ACTIONS.UPDATE_RANGE_YEARS,
			payload: { value: e.target.value },
		});
	};

	return {
		formState,
		handleCancel,
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
	currentSelectedValue: '',
	apiState: API_STATES.SUCCESS,
	error: '',
};

function isKeyValid({ key }) {
	return !!Object.values(YEAR_OPTIONS).find(
		(yearOption) => yearOption.key === key
	);
}

function getStartAndEndYears(payload) {
	const optionKey = payload && payload.value;
	if (!isKeyValid(optionKey)) {
		return DEFAULT_RANGE;
	}

	const { endYear, range } = YEAR_OPTIONS[optionKey];

	return {
		startYear: endYear - range,
		endYear: endYear,
	};
}

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case FORM_ACTIONS.UPDATE_RANGE_YEARS:
			return {
				...state,
				selectedYears: getStartAndEndYears(payload),
				currentSelectedValue: get(payload, 'value', ''),
			};

		case FORM_ACTIONS.UPDATE_END_YEAR:
			return {
				...state,
				selectedYears: {
					startYear: get(state, 'selectedYears.startYear', 'default'),
					endYear: payload,
				},
			};

		case FORM_ACTIONS.UPDATE_START_YEAR:
			return {
				...state,
				selectedYears: {
					startYear: payload,
					endYear: get(state, 'selectedYears.endYear', 'default'),
				},
			};

		case FORM_ACTIONS.SUBMITTING:
			return {
				...state,
				apiState: API_STATES.LOADING,
			};

		case FORM_ACTIONS.CANCEL:
			return {
				...state,
				selectedYears: DEFAULT_RANGE,
				apiState: API_STATES.SUCCESS,
			};

		case API_STATES.SUCCESS:
			return {
				...state,
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
