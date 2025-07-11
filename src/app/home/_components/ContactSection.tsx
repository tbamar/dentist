// "use client";
import React from 'react';
// import "../../styles/map.css";
import {
	IoCallOutline,
	IoMailOutline,
	IoLocationOutline,
} from 'react-icons/io5';
import { LuClock9 } from 'react-icons/lu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react'; // Using lucide-react for icons

const ContactSection = () => {
	return (
		<div className="min-h-screen  flex items-center justify-center ">
			<div className=" w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
				{/* Chamber 1 Card */}
				<Card className="rounded-xl shadow-lg overflow-hidden">
					<CardHeader className="p-6 pb-4">
						<h3 className="text-lg uppercase text-teal-600 font-bold text-center md:text-left">
							Chamber I
						</h3>
						<CardTitle className="text-3xl font-extrabold text-gray-900 uppercase text-center md:text-left mt-1">
							Visit 32 Smile
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6 pt-0 flex flex-col gap-6">
						{/* Contact Info 1 */}
						<div className="flex items-center gap-4">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-200 text-gray-800 shadow-md">
								<Phone size={32} />
							</div>
							<div className="flex flex-col justify-center">
								<div className="text-sm text-gray-600">
									Phone Number
								</div>
								<div className="text-lg font-semibold text-gray-900">
									+917338436393
								</div>
							</div>
						</div>

						{/* Email Info 1 */}
						<div className="flex items-center gap-4">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-200 text-gray-800 shadow-md">
								<Mail size={32} />
							</div>
							<div className="flex flex-col justify-center">
								<div className="text-sm text-gray-600">
									Email
								</div>
								<div className="text-lg font-semibold text-gray-900">
									32smiledental2019@gmail.com
								</div>
							</div>
						</div>

						{/* Location Info 1 */}
						<div className="flex items-start gap-4">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-200 text-gray-800 shadow-md flex-shrink-0">
								<MapPin size={32} />
							</div>
							<div className="flex flex-col justify-center flex-grow">
								<div className="text-sm text-gray-600">
									Map Street
								</div>
								<Link
									href="https://maps.app.goo.gl/9rTaa7i9Ki5p2JSC8"
									target="_blank"
									className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
									29 Sri gopal Mallick lane,
									<br />
									Kolkata 700012 <br /> Near- College Square
								</Link>
							</div>
						</div>

						{/* Google Map 1 */}
						<div className="w-full rounded-lg overflow-hidden shadow-inner mt-4">
							<iframe
								className="w-full h-[300px] md:h-[400px] rounded-lg"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.110522393927!2d88.36475469999999!3d22.5749693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276528fa76b5f%3A0x1e404fe0d05cff89!2s29%2C%20Shreegopal%20Mullick%20Ln%2C%20Newland%2C%20College%20Square%2C%20Kolkata%2C%20West%20Bengal%20711110!5e0!3m2!1sen!2sin!4v1751629145604!5m2!1sen!2sin"
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"></iframe>
						</div>
					</CardContent>
				</Card>

				{/* Chamber 2 Card */}
				<Card className="rounded-xl shadow-lg overflow-hidden">
					<CardHeader className="p-6 pb-4">
						<h3 className="text-lg uppercase text-teal-600 font-bold text-center md:text-left">
							Chamber II
						</h3>
						<CardTitle className="text-3xl font-extrabold text-gray-900 uppercase text-center md:text-left mt-1">
							Visit 32 Smile
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6 pt-0 flex flex-col gap-6">
						{/* Contact Info 2 */}
						<div className="flex items-center gap-4">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-200 text-gray-800 shadow-md">
								<Phone size={32} />
							</div>
							<div className="flex flex-col justify-center">
								<div className="text-sm text-gray-600">
									Phone Number
								</div>
								<div className="text-lg font-semibold text-gray-900">
									+917338436393
								</div>
							</div>
						</div>

						{/* Email Info 2 */}
						<div className="flex items-center gap-4">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-200 text-gray-800 shadow-md">
								<Mail size={32} />
							</div>
							<div className="flex flex-col justify-center">
								<div className="text-sm text-gray-600">
									Email
								</div>
								<div className="text-lg font-semibold text-gray-900">
									32smiledental2019@gmail.com
								</div>
							</div>
						</div>

						{/* Location Info 2 */}
						<div className="flex items-start gap-4">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-200 text-gray-800 shadow-md flex-shrink-0">
								<MapPin size={32} />
							</div>
							<div className="flex flex-col justify-center flex-grow">
								<div className="text-sm text-gray-600">
									Map Street
								</div>
								<Link
									href="https://maps.app.goo.gl/Y9SA8WUGJUt9ZwqZ6?g_st=awb"
									target="_blank"
									className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
									Vip Enclave,phase -2
									<br /> Ground floor,Shop -A12 <br /> Post .
									Raghunathpur.Kol 700059
								</Link>
							</div>
						</div>

						{/* Google Map 2 */}
						<div className="w-full rounded-lg overflow-hidden shadow-inner mt-4">
							<iframe
								className="w-full h-[300px] md:h-[400px] rounded-lg"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.9617846461456!2d88.4299329!3d22.6179022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89e2609203db5%3A0x47990801ec68dea8!2sVIP%20Enclave%2C%20LOHARUKA%20GREEN%20LEAF%2C%203%2C%20VIP%20Rd%2C%20opp.%20Baguiati%2C%20Raghunathpur%2C%20Baguiati%2C%20Kolkata%2C%20West%20Bengal%20700059!5e0!3m2!1sen!2sin!4v1752125408378!5m2!1sen!2sin"
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"></iframe>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ContactSection;
