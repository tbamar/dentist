'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@/components/ui/button';

interface Props {
	handleLinkClick: () => void;
}

const MobileNavLinks = ({ handleLinkClick }: Props) => {
	return (
		<div className="flex flex-col space-y-4">
			<Link
				href="/"
				onClick={handleLinkClick}
				className="text-lg hover:text-blue-500">
				Home
			</Link>
			<Link
				href="/about"
				onClick={handleLinkClick}
				className="text-lg hover:text-blue-500">
				About
			</Link>
			<Link
				href="/gallery"
				onClick={handleLinkClick}
				className="text-lg hover:text-blue-500">
				Gallery
			</Link>
			<Link
				href="/contact"
				onClick={handleLinkClick}
				className="text-lg hover:text-blue-500">
				Contact
			</Link>
		</div>
	);
};

const Nav = () => {
	return (
		<div className="flex items-center gap-10">
			<Link
				href="/"
				className="group relative text-lg hover:text-blue-500">
				Home
				<span className="absolute -bottom-1 left-1/2 hidden h-[2px] w-0 -translate-x-1/2 bg-blue-500 transition-all duration-300 group-hover:block group-hover:w-10"></span>
			</Link>
			<Link
				href="/about-us"
				className="group relative text-lg hover:text-blue-500">
				About
				<span className="absolute -bottom-1 left-1/2 hidden h-[2px] w-0 -translate-x-1/2 bg-blue-500 transition-all duration-300 group-hover:block group-hover:w-10"></span>
			</Link>
			<Link
				href="/services"
				className="group relative text-lg hover:text-blue-500">
				Services
				<span className="absolute -bottom-1 left-1/2 hidden h-[2px] w-0 -translate-x-1/2 bg-blue-500 transition-all duration-300 group-hover:block group-hover:w-10"></span>
			</Link>
			<Link
				href="/contact"
				className="group relative text-lg hover:text-blue-500">
				Contact
				<span className="absolute -bottom-1 left-1/2 hidden h-[2px] w-0 -translate-x-1/2 bg-blue-500 transition-all duration-300 group-hover:block group-hover:w-10"></span>
			</Link>
		</div>
	);
};

const Header = () => {
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<header className="fixed top-0 w-full z-50">
			{/* Desktop Header */}
			<div className="hidden md:block bg-white border-b">
				<div className="container mx-auto flex justify-between items-center py-4 px-6">
					<Link href="/">
						<Image
							src="/LogoDark.webp"
							alt="Logo"
							width={100}
							height={100}
						/>
					</Link>
					<Nav />
					<Button className="px-10 py-8 bg-blue-500 text-white rounded">
						Get Appointment
					</Button>
				</div>
			</div>

			{/* Mobile Header */}
			<div className="md:hidden bg-white border-b flex justify-between items-center py-2 px-4">
				<Link href="/">
					<Image
						src="/logo.png"
						alt="Logo"
						width={60}
						height={60}
					/>
				</Link>
				<button
					onClick={() => setMobileNavOpen(true)}
					className="text-gray-700">
					<RxHamburgerMenu className="h-8 w-8" />
					<span className="sr-only">Open navigation menu</span>
				</button>
			</div>

			{/* Mobile Navigation Backdrop */}
			{mobileNavOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 z-40"
					onClick={() => setMobileNavOpen(false)}
				/>
			)}

			{/* Mobile Navigation Panel */}
			<div
				className={`fixed top-0 left-0 h-full w-64 bg-white shadow transform transition-transform duration-300 z-50 ${
					mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
				}`}>
				<div className="p-4">
					<button
						onClick={() => setMobileNavOpen(false)}
						className="mb-4 text-gray-700">
						<IoMdClose className="h-8 w-8" />
						<span className="sr-only">Close navigation menu</span>
					</button>
					<MobileNavLinks
						handleLinkClick={() => setMobileNavOpen(false)}
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
