import { Card } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

const Testimonial = () => {
	return (
		<div>
			<Card className="p-10">
				<div className="flex gap-2 justify-between">
					<div className="bg-muted h-20 w-20 rounded-full"></div>
					<div>
						Lorem ipsum
						<p>label</p>
					</div>
					<div>quote</div>
				</div>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Molestiae voluptatibus nisi, totam magni reprehenderit sunt
					perspiciatis provident commodi
				</p>
			</Card>
		</div>
	);
};

export default Testimonial;
