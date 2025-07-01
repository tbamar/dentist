// components/ClinicOverview.tsx
import Image from 'next/image';
import React from 'react';

const basicServices = [
	'Scaling & Polishing',
	'Dental Fillings',
	'Complete & Partial Dentures',
	'Root Canal Treatments',
	'Simple Extractions',
	'Gum Surgeries',
];

const complexServices = [
	'Third Molar (Wisdom Tooth) Surgeries',
	'Implant Surgeries',
	'Complex Maxillofacial Trauma (RTA) Cases',
	'Cleft Lip & Palate Surgeries',
];

const ClinicOverview: React.FC = () => (
	<section className="pt-6 mx-auto bg-white  rounded-lg overflow-hidden">
		<div className="grid grid-cols-1  md:grid-cols-2 gap-10 px-4">
			<div className="  relative   bg-gray-200 flex items-center justify-center">
				<Image
					src={'/images/about/overview.jpg'}
					alt="what we do"
					width={300}
					height={300}
					className="h-[400px] w-full  object-cover rounded-2xl"
				/>
			</div>
			{/* Intro text */}
			<div className="flex flex-col justify-center">
				<h2 className="text-2xl font-bold mb-2">
					32 Smile Dental & Maxillofacial Clinic
				</h2>
				<p className="text-gray-600 mb-4">
					Prime location on College Street, Central Kolkata.
					Established in 2015 and proudly serving our community for 10
					years.
				</p>
				<p className="text-gray-600">
					Our clinic offers comprehensive dental and maxillofacial
					care for all ages, backed by a team with 15+ years of
					expertise—and all at affordable costs.
				</p>
				{/* Services Grid */}
				<div className=" grid grid-cols-1 sm:grid-cols-2 gap-6 ">
					<div>
						<h3 className="text-lg font-semibold mb-2">
							Basic Treatments
						</h3>
						<ul className="list-disc list-inside space-y-1 text-gray-700">
							{basicServices.map((svc) => (
								<li key={svc}>{svc}</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-2">
							Complex Procedures
						</h3>
						<ul className="list-disc list-inside space-y-1 text-gray-700">
							{complexServices.map((svc) => (
								<li key={svc}>{svc}</li>
							))}
						</ul>
					</div>
				</div>
				{/* Equipment & Protocols */}
				<div className="">
					<h3 className="text-lg font-semibold mb-2">
						Equipment & Protocols
					</h3>
					<p className="text-gray-700">
						Our clinic is fully equipped with modern dental
						instruments, including intra‑oral digital X‑rays, and
						adheres to stringent sterilization standards to ensure
						patient safety.
					</p>
				</div>
			</div>
		</div>
	</section>
);

export default ClinicOverview;
