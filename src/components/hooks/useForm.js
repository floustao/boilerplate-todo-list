import { useReducer } from 'react';
import { UPDATE_NAME, UPDATE_TEAM } from '../../shared/constants';

export default function useForm() {
	const [formState, dispatch] = useReducer(reducer, initialState);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ formState });
	};

	const handleChangeName = (e) => {
		dispatch({ type: UPDATE_NAME, payload: e.target.value });
	};

	const handleChangeSelectedTeam = (e) => {
		dispatch({ type: UPDATE_TEAM, payload: { value: e.target.value } });
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
		case UPDATE_NAME:
			return {
				...state,
				name: payload,
			};

		case UPDATE_TEAM:
			return {
				...state,
				selectedTeam: payload,
			};

		default:
			return state;
	}
};
