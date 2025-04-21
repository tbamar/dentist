import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const HeaderSection = () => {
	return (
		<div className="pt-10  bg-[url(/images/home/header.webp)] h-screen bg-cover relative bg-center">
			<div className="absolute  top-[25%] left-10 flex flex-col gap-8 w-1/2 ">
				<h1 className="uppercase tracking-[25%] font-semibold ">
					we use latest medical technology
				</h1>
				<div className="text-blue-900 text-6xl font-extrabold leading-[5rem]">
					Let Us Brighten Your Smile
				</div>
				<Button className="px-10 w-1/3 py-8 bg-blue-500 text-white rounded">
					Who We Are
				</Button>
			</div>
		</div>
	);
};

export default HeaderSection;
