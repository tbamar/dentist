import React from 'react';

const Footer = () => {
	return (
		<div className="bg-blue-custom ">
			<footer className="grid grid-cols-4 p-40 text-white">
				<div className="bg-blue-950 p-10">
					<h2 className="text-xl font-bold">Contact Us</h2>
					<ul className="flex flex-col gap-4 ">
						<li> 66 broklyant, new York India 3269 road.</li>
						<li> 012 345 678 9101</li>
						<li> yourmail.@gmail.com</li>
						<li> 3</li>
					</ul>
				</div>
				{/* Useful Links */}
				<div className="bg-blue-900 p-10">
					<h2 className="text-xl font-bold">Useful Links</h2>
					<ul
						style={{ listStyleType: 'square' }}
						className="flex flex-col gap-4 ">
						<li> About Us</li>
						<li> Team</li>
						<li>Testimonial</li>
						<li> Services</li>
					</ul>
				</div>
				{/* Social Links */}
				<div className="bg-blue-950 p-10">
					<h2 className="text-xl font-bold">Social Links</h2>
					<ul
						style={{ listStyleType: 'square' }}
						className="flex flex-col gap-4 ">
						<li> Facebook</li>
						<li> Twitter</li>
						<li> Instagram</li>
						<li> Linkedin</li>
					</ul>
				</div>
				{/* Services */}
				<div className="bg-blue-900 p-10">
					<h2 className="text-xl font-bold ">Services</h2>
					<ul
						style={{ listStyleType: 'square' }}
						className="flex flex-col gap-4  relative">
						<li> Service 1</li>
						<li> Service 2</li>
						<li> Service 3</li>
						<li>Service 4</li>
					</ul>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
