import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { API_STATES, YEAR_OPTIONS } from '../shared/constants';

export default function Form({ formData = {} }) {
	const {
		formState,
		handleCancel,
		handleSubmit,
		handleChangeStartYear,
		handleChangeEndYear,
		handleChangeSelectedYears,
	} = formData;

	const { currentSelectedValue, selectedYears, apiState, error } =
		formState || {};

	return (
		<StyledForm>
			<DatePickerContainer>
				<Label>
					<p>Date Range</p>
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

				<FlexContainer>
					<Label>
						<p>Starting</p>
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
						<p>Ending</p>
						<Input
							type='text'
							name='end year'
							value={selectedYears.endYear}
							onChange={handleChangeEndYear}
							placeholder={2021}
							disabled={apiState === API_STATES.LOADING}
						/>
					</Label>
				</FlexContainer>
			</DatePickerContainer>

			{error && error}

			<Separation />

			<FlexContainer className='docked'>
				<Button
					type='submit'
					value='Cancel'
					disabled={apiState === API_STATES.LOADING}
					onClick={handleCancel}
				/>

				<Button
					className={'primary'}
					type='submit'
					value='Submit'
					disabled={apiState === API_STATES.LOADING}
					onClick={handleSubmit}
				/>
			</FlexContainer>
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
		handleCancel: PropTypes.func,
		handleChangeStartYear: PropTypes.func,
		handleChangeEndYear: PropTypes.func,
		handleChangeSelectedYears: PropTypes.func,
	}),
};

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 300px;
	border-radius: 0.25rem;
	box-shadow: var(--bs);
`;

const DatePickerContainer = styled.div`
	padding: 0.5rem 1rem;
`;

const Label = styled.label`
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	> p {
		padding-right: 1rem;
	}
`;

const Input = styled.input`
	width: 7.5rem;
	height: 2rem;
	padding: 0.5rem;
	border-width: 1px;
	border-radius: 0.25rem;
`;

const Select = styled.select`
	height: 2rem;
	padding: 0.25rem;
	border-radius: 0.25rem;
	width: 100%;
`;

const FlexContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	&.docked {
		padding: 1rem;
	}
`;

const Button = styled.input`
	background-color: var(--white);
	height: 2rem;
	width: 7.5rem;
	border-radius: 0.25rem;
	border: 1px solid var(--grey);

	&.primary {
		background-color: var(--greenLeaf);
		color: var(--white);
	}
`;

const Separation = styled.hr`
	width: 100%;
`;
