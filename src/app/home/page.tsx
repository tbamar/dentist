import HeaderSection from './_components/HeaderSection';
import AboutSection from './_components/AboutSection';
import ServiceCard from './_components/ServiceCard';
import WorkProcess from './_components/WorkProcess';
export default function HomePage() {
	return (
		<main className="pt-24">
			<section>
				<HeaderSection />
			</section>
			<section className="px-10">
				<AboutSection />
			</section>
			<section className="grid grid-cols-3 gap-10">
				<ServiceCard />
			</section>
			<section className="px-10">
				<WorkProcess />
			</section>
		</main>
	);
}
