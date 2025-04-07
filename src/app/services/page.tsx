import React from 'react';
import FaqAccordian from './_components/FaqAccordian';
import Banner from '../_components/global/Banner';

const page = () => {
	return (
		<>
			<Banner name="Services" />
			<div className="grid grid-cols-2 px-40 pt-30">
				<FaqAccordian />
			</div>
		</>
	);
};

export default page;
