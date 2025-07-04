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
			href: '#',
		},
		{
			name: 'Contact Us',
			href: '#',
		},
		{
			name: 'Book an Appointment',
			href: '/book-appointment',
		},
	];
	return (
		<div className="bg-blue-custom ">
			<footer className="grid md:grid-cols-3 md:p-10 text-white">
				<div className="bg-blue-950 p-10">
					<h2 className="text-xl font-bold  py-4">Contact Us</h2>
					<ul className="flex flex-col gap-4 ">
						<li> 66 broklyant, new York India 3269 road.</li>
						<li> 012 345 678 9101</li>
						<li> yourmail.@gmail.com</li>
						<li> 3</li>
					</ul>
				</div>
				{/* Useful Links */}
				<div className="bg-blue-900 p-10">
					<h2 className="text-xl font-bold py-4">Useful Links</h2>
					<ul
						style={{ listStyleType: 'square' }}
						className="flex flex-col gap-4 ">
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
				<div className="bg-blue-950 md:p-10">
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
				{/* Services */}
				{/* <div className="bg-blue-900 p-10">
					<h2 className="text-xl font-bold ">Services</h2>
					<ul
						style={{ listStyleType: 'square' }}
						className="flex flex-col gap-4  relative">
						<li> Service 1</li>
						<li> Service 2</li>
						<li> Service 3</li>
						<li>Service 4</li>
					</ul>
				</div> */}
			</footer>
		</div>
	);
};

export default Footer;
