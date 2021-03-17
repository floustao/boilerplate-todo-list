import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { API_STATES, YEAR_OPTIONS } from '../shared/constants';

export default function Form({ formData = {} }) {
	const {
		formState,
		handleSubmit,
		handleChangeStartYear,
		handleChangeEndYear,
		handleChangeSelectedYears,
	} = formData;

	const { currentSelectedValue, selectedYears, apiState, error } =
		formState || {};

	return (
		<StyledForm onSubmit={handleSubmit}>
			<Label>
				<Input
					type='text'
					name='start year'
					value={selectedYears.startYear}
					onChange={handleChangeStartYear}
					placeholder={2021}
					disabled={apiState === API_STATES.LOADING}
				/>
			</Label>

			<Label>
				<Input
					type='text'
					name='end year'
					value={selectedYears.endYear}
					onChange={handleChangeEndYear}
					placeholder={2021}
					disabled={apiState === API_STATES.LOADING}
				/>
			</Label>

			<Label>
				<p>Range Years:</p>
				<Select
					value={currentSelectedValue}
					onChange={handleChangeSelectedYears}
					disabled={apiState === API_STATES.LOADING}
				>
					{Object.values(YEAR_OPTIONS).map((yearOption, index) => {
						return (
							<option
								key={`${index}-${yearOption.value}`}
								value={yearOption.value}
							>
								{yearOption.value}
							</option>
						);
					})}
				</Select>
			</Label>

			{error && error}
			<Button
				type='submit'
				value='Submit'
				disabled={apiState === API_STATES.LOADING}
			/>
		</StyledForm>
	);
}

Form.propTypes = {
	formData: PropTypes.shape({
		formState: PropTypes.shape({
			currentSelectedValue: PropTypes.string,
			selectedYears: PropTypes.shape({
				startYear: PropTypes.number,
				endYear: PropTypes.number,
			}),
			apiState: PropTypes.string,
			error: PropTypes.string,
		}),
		handleSubmit: PropTypes.func,
		handleChangeStartYear: PropTypes.func,
		handleChangeEndYear: PropTypes.func,
		handleChangeSelectedYears: PropTypes.func,
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
	align-items: center;

	> p {
		padding-right: 1rem;
	}
`;

const Input = styled.input`
	width: 100%;
	height: 2rem;
	padding: 0.5rem;
	border-width: 1px;
	border-radius: 0.25rem;
`;

const Select = styled.select`
	height: 2rem;
	padding: 0.25rem;
`;

const Button = styled.input`
	background-color: var(--white);
	height: 2rem;
	width: 100%;
	border-radius: 0.25rem;
`;
