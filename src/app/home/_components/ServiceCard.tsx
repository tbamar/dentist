import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React from 'react';

const ServiceCard = () => {
	return (
		<div className="h-[500px] relative">
			<div className="image bg-muted h-[200px]"></div>
			<div className="px-10 absolute bottom-4">
				<Card className="p-8">
					<h1 className="text-2xl font-semibold">Title</h1>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Saepe aut ipsum cum nesciunt pariatur nostrum
						laboriosam sapiente veniam, fuga sequi.
					</p>
					<Button
						variant={'outline'}
						className="px-8 py-6 w-48  text-black rounded">
						{' '}
						Read More
					</Button>
				</Card>
			</div>
		</div>
	);
};

export default ServiceCard;
