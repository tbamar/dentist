import React from 'react';

const Demo = () => {
	return <div className="bg-muted h-[15rem]"></div>;
};

const GalleryCards = () => {
	return (
		<div className="grid grid-cols-3 grid-rows-2 pt-4 gap-3">
			<Demo />
			<Demo />
			<Demo />
			<Demo />
			<Demo />
			<Demo />
		</div>
	);
};

export default GalleryCards;
