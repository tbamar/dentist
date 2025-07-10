// "use client";
import React from 'react';
// import "../../styles/map.css";
import {
	IoCallOutline,
	IoMailOutline,
	IoLocationOutline,
} from 'react-icons/io5';
import { LuClock9 } from 'react-icons/lu';

import Link from 'next/link';

const ContactSection = () => {
	return (
		<div>
			<div className="mx-4 flex flex-col gap-8 md:mx-20 md:flex-row md:gap-20">
				{/* chamber 1 */}
				<div className="flex gap-4">
					<div className="flex flex-col gap-4 ">
						<div className="text-center md:block hidden md:mb-12 md:text-start">
							{' '}
							<h3 className="text-lg  uppercase text-picoTeal md:font-bold">
								chamber I
							</h3>
							<h1 className="text-xl uppercase md:text-4xl">
								Visit 32 Smile
							</h1>
						</div>

						<div className="space-y-4">
							<div className="flex gap-4">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-picoJuteBrown">
									<IoCallOutline size={32} />
								</div>
								<div className="flex flex-col justify-center">
									{' '}
									<div className="text-sm text-black">
										{' '}
										Phone Number
									</div>
									<div>+917338436393</div>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-picoJuteBrown">
									<IoMailOutline size={32} />
								</div>
								<div className="flex flex-col justify-center">
									{' '}
									<div className="text-sm"> Email</div>
									<div>32smiledental2019@gmail.com</div>
								</div>
							</div>
							{/* <div className="flex gap-4">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-picoJuteBrown">
									<LuClock9 size={32} />
								</div>
								<div className="flex flex-col justify-center">
									{' '}
									<div className="text-sm">
										{' '}
										Opening Hours
									</div>
									<div>Everyday from 11 AM - 11 PM</div>
								</div>
							</div> */}
							<div className="flex gap-4">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-picoJuteBrown">
									<IoLocationOutline size={32} />
								</div>
								<div className="flex flex-col justify-center">
									{' '}
									<div className="text-sm"> Map Street</div>
									<Link
										href={
											'https://maps.app.goo.gl/9rTaa7i9Ki5p2JSC8'
										}
										target="_blank"
										className="w-[1/2] underline hover:cursor-pointer hover:underline">
										29 Sri gopal Mallick lane,
										<br />
										Kolkata 700012 <br /> Near- College
										Square
									</Link>
								</div>
							</div>
						</div>
					</div>
					{/* chamber 1 Google Map */}
					<div className="w-full ">
						<div className="h-[400px] w-full overflow-hidden bg-none md:h-[400px]">
							<iframe
								className="h-[400px] w-full md:h-[500px]"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.110522393927!2d88.36475469999999!3d22.5749693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276528fa76b5f%3A0x1e404fe0d05cff89!2s29%2C%20Shreegopal%20Mullick%20Ln%2C%20Newland%2C%20College%20Square%2C%20Kolkata%2C%20West%20Bengal%20711110!5e0!3m2!1sen!2sin!4v1751629145604!5m2!1sen!2sin"></iframe>
							<a
								href="https://embed-googlemap.com"
								className="absolute bottom-0 right-0 text-xs" //
							></a>
						</div>
					</div>
				</div>
				{/* chamber 2 */}
				<div className="flex gap-4">
					<div className="flex flex-col gap-4 ">
						<div className="text-center md:block hidden md:mb-12 md:text-start">
							{' '}
							<h3 className="text-lg  uppercase text-picoTeal md:font-bold">
								chamber II
							</h3>
							<h1 className="text-xl uppercase md:text-4xl">
								Visit 32 Smile
							</h1>
						</div>

						<div className="space-y-4">
							<div className="flex gap-4">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-picoJuteBrown">
									<IoCallOutline size={32} />
								</div>
								<div className="flex flex-col justify-center">
									{' '}
									<div className="text-sm text-black">
										{' '}
										Phone Number
									</div>
									<div>+917338436393</div>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-picoJuteBrown">
									<IoMailOutline size={32} />
								</div>
								<div className="flex flex-col justify-center">
									{' '}
									<div className="text-sm"> Email</div>
									<div>32smiledental2019@gmail.com</div>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-picoJuteBrown">
									<IoLocationOutline size={32} />
								</div>
								<div className="flex flex-col justify-center">
									{' '}
									<div className="text-sm"> Map Street</div>
									<Link
										href={
											'https://maps.app.goo.gl/Y9SA8WUGJUt9ZwqZ6?g_st=awb'
										}
										target="_blank"
										className="w-[1/2] underline hover:cursor-pointer hover:underline">
										Vip Enclave,phase -2
										<br /> Ground floor,Shop -A12 <br />{' '}
										Post . Raghunathpur.Kol 700059
									</Link>
								</div>
							</div>
						</div>
					</div>
					{/* chamber 2 Google Map */}
					<div className="w-full ">
						<div className="h-[400px] w-full overflow-hidden bg-none md:h-[400px]">
							<iframe
								className="h-[400px] w-full md:h-[500px]"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.9617846461456!2d88.4299329!3d22.6179022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89e2609203db5%3A0x47990801ec68dea8!2sVIP%20Enclave%2C%20LOHARUKA%20GREEN%20LEAF%2C%203%2C%20VIP%20Rd%2C%20opp.%20Baguiati%2C%20Raghunathpur%2C%20Baguiati%2C%20Kolkata%2C%20West%20Bengal%20700059!5e0!3m2!1sen!2sin!4v1752125408378!5m2!1sen!2sin"></iframe>
							<a
								href="https://embed-googlemap.com"
								className="absolute bottom-0 right-0 text-xs" //
							></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactSection;
