import React from 'react';
import AppointmentForm from './_components/AppointmentForm';
import Banner from '../_components/global/Banner';

const page = () => {
	return (
		<div className="pt-24">
			<Banner name="Book Appointment" />
			<section className="w-full grid grid-cols-2  px-20 ">
				<div
					className="flex flex-col text-start  h-1/2 justify-center
				items-start   p-4">
					<h1 className="text-7xl font-bold">Book with </h1>
					<h1 className="text-5xl font-semibold">Your Dentist</h1>
					<p className="text-lg">
						Quickly aggregate B2B users and worldwide
						potentialities. Progressively plagiarize
						resource-leveling e-commerce through resource-leveling
						core competencies.
					</p>

					<ul className="flex gap-2">
						<li>Emergency</li>
						<li>Fill this form</li>
						<li>Working time</li>
					</ul>
				</div>
				<AppointmentForm />
			</section>
		</div>
	);
};

export default page;
