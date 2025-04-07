import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const WorkProcess = () => {
	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<label className="tracking-[25%] uppercase">work process</label>
			<h1 className="text-5xl font-medium w-3xl text-center">
				We Complete Every Step Carefully
			</h1>
			<div className="grid grid-cols-3 gap-10">
				<div>
					<Image
						src="/images/home/process01.webp"
						alt="process"
						width={300}
						height={300}
						className="w-full"
					/>
					<div className="flex flex-col gap-4 items-center justify-center">
						<h1 className="text-2xl font-bold">
							Cosmetic Dentistry
						</h1>
						<p className="text-center w-2/3">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Quidem, voluptatem.
						</p>
						<Button
							variant={'outline'}
							className="px-8 py-6 border border-blue-500 text-blue-custom rounded font-bold ">
							Read More
						</Button>
					</div>
				</div>
				<div>
					<Image
						src="/images/home/process01.webp"
						alt="process"
						width={300}
						height={300}
						className="w-full"
					/>
					<div className="flex flex-col gap-4 items-center justify-center">
						<h1 className="text-2xl font-bold">
							Cosmetic Dentistry
						</h1>
						<p className="text-center w-2/3">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Quidem, voluptatem.
						</p>
						<Button
							variant={'outline'}
							className="px-8 py-6 border border-blue-500 text-blue-custom rounded font-bold ">
							Read More
						</Button>
					</div>
				</div>
				<div>
					<Image
						src="/images/home/process01.webp"
						alt="process"
						width={300}
						height={300}
						className="w-full"
					/>
					<div className="flex flex-col gap-4 items-center justify-center">
						<h1 className="text-2xl font-bold">
							Cosmetic Dentistry
						</h1>
						<p className="text-center w-2/3">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Quidem, voluptatem.
						</p>
						<Button
							variant={'outline'}
							className="px-8 py-6 border border-blue-500 text-blue-custom rounded font-bold ">
							Read More
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorkProcess;
