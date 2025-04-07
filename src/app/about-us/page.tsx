import React from 'react';
import Banner from '../_components/global/Banner';
import Testimonial from './_components/Testimonial';

const page = () => {
	return (
		<div className="pt-24">
			<Banner name="About Us" />
			<div className="grid grid-cols-3">
				{' '}
				<Testimonial />
			</div>
		</div>
	);
};

export default page;
