import { useReducer, useCallback } from 'react';
import { FORM_ACTIONS, API_STATES } from '../../shared/constants';
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

	const handleChangeName = (e) => {
		dispatch({ type: FORM_ACTIONS.UPDATE_NAME, payload: e.target.value });
	};

	const handleChangeSelectedTeam = (e) => {
		dispatch({
			type: FORM_ACTIONS.UPDATE_TEAM,
			payload: { value: e.target.value },
		});
	};

	return {
		formState,
		handleSubmit,
		handleChangeName,
		handleChangeSelectedTeam,
	};
}

const initialState = {
	name: '',
	selectedTeam: { value: 'red' },
	apiState: API_STATES.SUCCESS,
	error: '',
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case FORM_ACTIONS.UPDATE_NAME:
			return {
				...state,
				name: payload,
			};

		case FORM_ACTIONS.UPDATE_TEAM:
			return {
				...state,
				selectedTeam: payload,
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
