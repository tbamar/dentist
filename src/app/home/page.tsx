import HeaderSection from './_components/HeaderSection';
import AboutSection from './_components/AboutSection';
import ServiceCard from './_components/ServiceCard';
import WorkProcess from './_components/WorkProcess';
import DoctorDetails from './_components/DoctorDetails';
import DoctorCards from './_components/DoctorDetails';
import TreatmentCards from '../services/_components/Demo';
import ClinicOverview from './_components/ClinicOverview';
export default function HomePage() {
	return (
		<main className="pt-24">
			<section className="pb-24">
				<HeaderSection />
			</section>
			<section className="px-10 ">
				<ClinicOverview />
			</section>
			<section className="px-10 py-24">
				<h1 className="text-5xl font-bold flex justify-center items-center ">
					Meet Our Doctors
				</h1>
				<DoctorCards />
			</section>
			<section className="px-10 pb-24 ">
				<h1 className="text-5xl font-bold flex justify-center items-center ">
					Treatments We Provide:
				</h1>
				<TreatmentCards />
			</section>
		</main>
	);
}
