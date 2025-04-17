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
						width={300}
						height={300}
						className="h-[500px] w-full object-cover"
					/>
				</div>

				{/* content */}
				<div className="content">
					<label>About us</label>

					<p>
						32 SMILE DENTAL & MAXILLOFACIAL CLINIC is located in one
						of the prime locations of college street in central
						kolkata established 10 years back since 2015.In this
						span of time we have already performed all sorts of
						basic dental treatment scaling and polishing;dental
						fillings,complete and partial dentures,root canal
						treatments,simple teeth extractions,gum surgeries as
						well as many complex cases including third molar
						surgeries,implant surgeries and complex maxillofacial
						cases of road traffic accidents ,cleft surgeries etc.At
						our clinic we also provide services to the young and
						elderly patients of any age group with utmost care and
						priority .
					</p>
					<i>
						Our clinic is well equipped with all modern dental
						equipments along with intra oral digital xrays with
						maintaining the basics of all modern sterilization
						protocols .We here ensure to provide the best dental
						treatment to our patients along with the experience and
						expertise of our team of doctors who has a experience of
						more than 15 years in this field. We at 32 smile dental
						and maxillofacial clinic perform all dental and
						maxillofacial treatment with an endevour to give
						services to all at an affordable cost.
					</i>
				</div>
			</div>
		</div>
	);
};

export default WhatWeDo;
