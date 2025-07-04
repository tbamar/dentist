import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const HeaderSection = () => {
	return (
		<div className="pt-10  bg-[url(/images/home/header.webp)] h-[400px] md:h-screen bg-cover relative bg-center">
			<div className="absolute bottom-32  md:top-[25%] left-10 flex flex-col gap-4 md:gap-8 md:w-1/2 ">
				<h1 className="uppercase md:tracking-[25%] font-semibold ">
					we use latest medical technology
				</h1>
				<div className="text-blue-900 text-3xl md:text-6xl font-extrabold md:leading-[5rem]">
					Let Us Brighten Your Smile
				</div>
				<Button className="md:px-10 w-1/3 p-6 md:py-8 bg-blue-custom text-white rounded">
					<Link href="#clinic-overview">Who We Are</Link>
				</Button>
			</div>
		</div>
	);
};

export default HeaderSection;
