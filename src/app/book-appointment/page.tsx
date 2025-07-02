import React from 'react';
import AppointmentForm from './_components/AppointmentForm';
import Banner from '../_components/global/Banner';

const page = () => {
	return (
		<div className="pt-20">
			<Banner name="Book Appointment" />
			<section className="w-full grid grid-cols-2  px-20 pt-14">
				<div
					className="flex flex-col text-start  justify-start
				items-start gap-4  p-4">
					<h1 className="text-7xl font-bold">Book with </h1>
					<h1 className="text-5xl font-semibold">Your Dentist</h1>
					<p className="text-lg">
						Quickly aggregate B2B users and worldwide
						potentialities. Progressively plagiarize
						resource-leveling e-commerce through resource-leveling
						core competencies.
					</p>

					<ul
						style={{ listStyle: 'disc' }}
						className="flex flex-col gap-2">
						<li>
							Book regular check-ups to catch dental issues early.
						</li>
						<li>
							The dentist will examine your mouth and clean your
							teeth.
						</li>
						<li>
							Get personalized advice and a treatment plan if
							needed.
						</li>
						<li>
							Schedule your next appointment or any follow-up
							treatments before leaving.
						</li>
					</ul>
					<div className="">
						<h2 className="text-xl font-bold  py-4">Contact Us</h2>
						<ul className="flex flex-col gap-4 ">
							<li> 66 broklyant, new York India 3269 road.</li>
							<li> 012 345 678 9101</li>
							<li> yourmail.@gmail.com</li>
							<li> 3</li>
						</ul>
					</div>
				</div>
				<AppointmentForm />
			</section>
		</div>
	);
};

export default page;
