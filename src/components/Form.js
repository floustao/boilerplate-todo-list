import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Form({ formData = {} }) {
	const {
		formState,
		handleSubmit,
		handleChangeName,
		handleChangeSelectedTeam,
	} = formData;

	const { name, selectedTeam } = formState || {};

	return (
		<StyledForm onSubmit={handleSubmit}>
			<Label>
				<Input
					type='text'
					name='name'
					value={name}
					onChange={handleChangeName}
					placeholder='name'
				/>
			</Label>

			<Label>
				<p>Team:</p>
				<select value={selectedTeam.value} onChange={handleChangeSelectedTeam}>
					<option value='blue'>Blue</option>
					<option value='green'>Green</option>
					<option value='red'>Red</option>
					<option value='yellow'>Yellow</option>
				</select>
			</Label>

			<Button type='submit' value='Submit' />
		</StyledForm>
	);
}

Form.propTypes = {
	formData: PropTypes.shape({
		formState: PropTypes.shape({
			name: PropTypes.string,
			selectedTeam: PropTypes.object,
		}),
		handleSubmit: PropTypes.func,
		handleChangeName: PropTypes.func,
		handleChangeSelectedTeam: PropTypes.func,
	}),
};

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 300px;
`;

const Label = styled.label`
	margin: 1rem 0;
	display: flex;

	> p {
		padding-right: 1rem;
	}
`;

const Input = styled.input`
	width: 100%;
`;

const Button = styled.input`
	background-color: var(--white);
	height: 2rem;
	width: 100%;
`;
