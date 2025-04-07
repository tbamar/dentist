import React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
const FaqAccordian = () => {
	return (
		<div>
			<Accordion
				type="single"
				collapsible
				className="w-full border border-gray-500 bg-gray-700">
				<AccordionItem
					className=""
					value="item-1">
					<AccordionTrigger className="hover:bg-blue-800">
						Is it accessible?
					</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Is it styled?</AccordionTrigger>
					<AccordionContent>
						Yes. It comes with default styles that matches the other
						components&apos; aesthetic.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Is it animated?</AccordionTrigger>
					<AccordionContent>
						Yes. It's animated by default, but you can disable it if
						you prefer.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default FaqAccordian;
