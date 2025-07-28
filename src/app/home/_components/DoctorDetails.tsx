// components/DoctorCards.tsx
import Image from 'next/image';
import React from 'react';

interface Doctor {
	name: string;
	qualifications: string;
	training: string[];
	currentRoles: string[];
	imageUrl: string;
}

const doctors: Doctor[] = [
	{
		name: 'Dr. Torsha Ray Bhattacharyya',
		imageUrl: '/images/profile/torsha.png',
		qualifications:
			'BDS, KLE Institute of Dental Science, Bangalore; MDS (Gold Medalist) in Oral Medicine & Radiodiagnosis, AECS Maaruti Institute of Dental Sciences',
		training: [
			'Diagnosis & management of oral and maxillofacial diseases at St. Johns Medical College',
			'Training at Kidwai Institute of Oncology',
			'Fellowship in pediatric dentistry, restorative dentistry & endodontics',
		],
		currentRoles: [
			'Private practice & consultations',
			'Oral Radiologist, Pioneer Scans',
			'Oral Radiologist, Scandent Bengal',
		],
	},

	{
		name: 'Dr. Saibal Bhattacharyya',
		imageUrl: '/images/profile/saibal.jpg',
		qualifications:
			'BDS, MS Ramaiah Dental College, Bangalore; MDS in Oral & Maxillofacial Surgery, Awadh Dental College & Hospital, Jamshedpur',
		training: [
			'Extensive maxillofacial surgical training',
			'Oral oncology training at Kidwai Institute of Oncology',
		],
		currentRoles: [
			'Private practice: trauma management, wisdom teeth extraction & implant placement',
			'Rana Dental Clinic',
			'Dent‑O‑Care Dental Clinic',
		],
	},
];

const DoctorCards: React.FC = () => (
	<div className="grid md:grid-cols-2 gap-6 md:p-6 p-4">
		{doctors.map((doc, idx) => (
			<div
				key={idx}
				className="bg-white rounded-lg shadow flex flex-col overflow-hidden">
				{/* Profile image placeholder */}
				<div className="bg-muted flex items-center justify-center ">
					<Image
						src={doc.imageUrl}
						alt={doc.name}
						width={100}
						height={100}
						className="h-72 w-72 rounded-full object-cover"
					/>
				</div>
				<div className="p-4 flex-1 flex flex-col">
					<h3 className="text-xl font-semibold mb-2">{doc.name}</h3>
					<p className="text-sm text-gray-600 mb-4">
						{doc.qualifications}
					</p>

					<div className="mb-4">
						<h4 className="font-semibold text-gray-800 mb-1">
							Training
						</h4>
						<ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
							{doc.training.map((item, i) => (
								<li key={i}>{item}</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="font-semibold text-gray-800 mb-1">
							Current Associations
						</h4>
						<ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
							{doc.currentRoles.map((role, i) => (
								<li key={i}>{role}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		))}
	</div>
);

export default DoctorCards;
