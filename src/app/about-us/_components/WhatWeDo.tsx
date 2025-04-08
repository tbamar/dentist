import Image from 'next/image';
import React from 'react';

const WhatWeDo = () => {
	return (
		<div>
			<div className="grid grid-cols-2">
				<div className="img relative ">
					<Image
						src={'/images/about/wedo.png'}
						alt="what we do"
						width={500}
						height={500}
						className="h-full w-full object-cover"
					/>
					{/* absolute grid patterm */}
					<div className="absolute -top-8 -right-16 ">
						<Image
							src={'/images/about/pattern.png'}
							alt="what we do"
							width={270}
							height={240}
						/>
					</div>
				</div>

				{/* content */}
				<div className="content">
					<label>what we do</label>
					<h1>True Healthcare for your family</h1>
					<p>
						The quick, brown fox jumps over a lazy dog. DJs flock by
						when MTV ax quiz prog. Junk MTV quiz graced by fox
						whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad
						nymph, for quick jigs vex! Fox nymphs grab quick-jived
						waltz. Brick quiz whangs jumpy veldt fox. Bright vixens
						jump; dozy fowl quack. Quick wafting zephyrs vex bold
						Jim. Quick
					</p>
				</div>
			</div>
		</div>
	);
};

export default WhatWeDo;
