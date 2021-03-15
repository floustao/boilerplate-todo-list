import React from 'react';

import Form from './Form';
import useForm from './hooks/useForm';

export default function Homepage() {
	const formData = useForm();
	return (
		<>
			<h1>Homepage</h1>

			<Form formData={formData} />
		</>
	);
}
