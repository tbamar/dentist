import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

const AboutSection = () => {
	return (
		<div className="relative bg-white h-screen">
			<Card className="p-20 absolute rounded -top-16 w-full">
				<div className="flex gap-9">
					<div
						className="bg-red-400"
						style={{
							borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
							overflow: 'hidden',
							width: '500px', // adjust width as needed
							height: '600px', // adjust height as needed
							position: 'relative',
						}}>
						<Image
							className="-top-80 absolute"
							src="/images/home/doctor.webp" // update with your image path
							alt="Rounded image"
							layout="fill"
							objectFit="cover"
						/>
					</div>
					{/* rightside */}
					<div>
						<div className="flex flex-col gap-6">
							<label className="tracking-[30%] uppercase">
								What we do
							</label>
							<h1 className="text-5xl font-medium">
								Trust Healthcare For Your Family
							</h1>
							<div>
								<div>content</div>
								<div>content</div>
							</div>
							<Button className="px-10 py-8 bg-blue-500 text-white  w-1/3 rounded-sm">
								Get Appointment
							</Button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default AboutSection;
