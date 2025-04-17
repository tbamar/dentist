import React from 'react';
import AppointmentForm from './_components/AppointmentForm';
import Banner from '../_components/global/Banner';

const page = () => {
	return (
		<div className="pt-24">
			<Banner name="Book Appointment" />
			<AppointmentForm />
		</div>
	);
};

export default page;
