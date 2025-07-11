import Link from 'next/link';
import React from 'react';

const Footer = () => {
	const usefulLinks = [
		{
			name: 'Home',
			href: '#',
		},
		{
			name: 'Gallery',
			href: '#gallery',
		},

		{
			name: 'Book an Appointment',
			href: '/book-appointment',
		},
	];
	return (
		<div className="bg-blue-custom ">
			<footer className="grid md:grid-cols-3 md:p-10 text-white">
				<div className="bg-blue-950 p-10 order-2 md:order-1">
					<h2 className="text-xl font-bold  py-4">Contact Us</h2>
					<ul className="flex flex-col gap-4 ">
						<li>
							29, Shreegopal Mullick Ln, Newland College Square,
							Kolkata, West Bengal 700012
						</li>
						<li> +917338436393</li>
						<li> 32smiledental2019@gmail.com</li>
					</ul>
				</div>
				{/* Useful Links */}
				<div className="bg-blue-900 p-10 order-1 md:order-2">
					<h2 className="text-xl font-bold py-4">Quick Links</h2>
					<ul
						style={{ listStyleType: 'square' }}
						className="flex flex-col gap-4 pl-2 md:pl-0">
						{usefulLinks.map((link) => (
							<li key={link.name}>
								<Link
									href={link.href}
									className="text-white hover:text-blue-500 active:text-blue-900">
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
				{/* Social Links */}
				<div className="bg-blue-950 p-10 order-3 ">
					<h2 className="text-xl font-bold  py-4">Social Links</h2>
					Visit 32 Smile on these social links and connect with us.
					Make sure to follow our accounts for regular updates.
					<ul className="flex gap-4 ">
						<li> Facebook</li>
						<li> Twitter</li>
						<li> Instagram</li>
						<li> Linkedin</li>
					</ul>
				</div>
			</footer>
			<div className="w-full flex justify-center  text-white pb-6 pt-6 md:pt-0">
				<p>
					&copy; {new Date().getFullYear()} 32 Smile Dental Clinic.
					All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default Footer;
