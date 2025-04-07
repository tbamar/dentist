import React from 'react';

interface BannerProps {
	name?: string;
}

const Banner: React.FC<BannerProps> = ({ name }) => {
	return (
		<div>
			<div className="bg-[url(/images/banner.png)] h-[400px] relative">
				<div className="absolute top-[40%] left-[15%]">
					<h1 className="text-4xl font-bold">{name}</h1>
					<div>Home | {name}</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
