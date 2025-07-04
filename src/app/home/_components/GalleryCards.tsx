import Image from 'next/image';
import React from 'react';

const GalleryCards = () => {
	const galleryImages = [
		'/images/gallery/02.jpg',
		'/images/gallery/03.jpg',
		'/images/gallery/04.jpg',
		'/images/gallery/05.jpg',
		'/images/gallery/06.jpg',
		'/images/gallery/07.jpg',
		'/images/gallery/08.jpg',
		'/images/gallery/09.jpg',
		'/images/gallery/10.jpg',
		'/images/gallery/11.jpg',
		'/images/gallery/12.jpg',
	];
	return (
		<div className="grid md:grid-cols-3  pt-4 gap-3">
			{galleryImages.map((image, index) => (
				<div
					key={index}
					className="flex flex-col items-center justify-center h-[400px] bg-blue-custom">
					<Image
						src={image}
						alt="dentist"
						width={150}
						height={150}
						className="w-full h-full object-contain"
					/>
				</div>
			))}
		</div>
	);
};

export default GalleryCards;
