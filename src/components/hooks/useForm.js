import { useReducer, useCallback } from 'react';
import { FORM_ACTIONS, API_STATES } from '../../shared/constants';

export default function useForm() {
	const [formState, dispatch] = useReducer(reducer, initialState);

	const sleep = useCallback(
		(time = 3000) => {
			setTimeout(() => {
				console.log(formState);
				dispatch({ type: FORM_ACTIONS.SUBMITTING, payload: false });
			}, time);
		},
		[formState]
	);

	const handleSubmit = useCallback(
		async (e) => {
			try {
				e.preventDefault();
				dispatch({ type: FORM_ACTIONS.SUBMITTING, payload: true });
				await sleep(3000);
			} catch (error) {
				dispatch({ type: API_STATES.ERROR, payload: error });
			}
		},
		[sleep]
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
	submitting: false,
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
				submitting: payload,
			};

		default:
			return state;
	}
};
