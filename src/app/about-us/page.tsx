import React from 'react';
import Banner from '../_components/global/Banner';
import Testimonial from './_components/Testimonial';
import WhatWeDo from './_components/WhatWeDo';

const page = () => {
	return (
		<div className="pt-24">
			<Banner name="About Us" />
			<section className="px-20 py-24">
				<WhatWeDo />
			</section>
			<div className="grid grid-cols-3">
				{' '}
				<Testimonial />
			</div>
		</div>
	);
};

export default page;
