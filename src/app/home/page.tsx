import HeaderSection from './_components/HeaderSection';
import AboutSection from './_components/AboutSection';
import ServiceCard from './_components/ServiceCard';
import WorkProcess from './_components/WorkProcess';
import DoctorDetails from './_components/DoctorDetails';
import DoctorCards from './_components/DoctorDetails';
import TreatmentCards from '../services/_components/ServiceCards';
import ClinicOverview from './_components/ClinicOverview';
import GalleryCards from './_components/GalleryCards';
import ContactSection from './_components/ContactSection';
import FaqAccordian from '../services/_components/FaqAccordian';
export default function HomePage() {
	return (
		<main className="">
			<section className="md:pb-24 pb-14 pt-20">
				<HeaderSection />
			</section>
			<section
				id="clinic-overview"
				className="md:px-10 ">
				<h1 className="md:text-5xl text-3xl font-bold flex justify-center items-center ">
					Clinic Overview
				</h1>
				<ClinicOverview />
			</section>
			<section className="md:px-10 md:pt-24 pt-14">
				<h1 className="md:text-5xl text-3xl font-bold flex justify-center items-center ">
					Meet Our Doctors
				</h1>
				<DoctorCards />
			</section>
			<section
				id="services"
				className="md:px-10 md:pt-24 px-4 pt-12">
				<h1 className="md:text-5xl text-3xl font-bold flex justify-center items-center ">
					Treatments We Provide:
				</h1>
				<TreatmentCards />
			</section>

			<section
				id="gallery"
				className="md:px-10 md:pt-24 px-4 pt-14">
				<h1 className="md:text-5xl text-3xl font-bold flex justify-center items-center ">
					Our Gallery
				</h1>
				<GalleryCards />
			</section>
			<section
				id="gallery"
				className="md:px-10 md:pt-24 px-4 pt-14">
				<h1 className="md:text-5xl text-3xl font-bold flex justify-center items-center ">
					Frequently Asked Questions
				</h1>
				<FaqAccordian />
			</section>
			<section
				id="contact"
				className="md:px-10 md:py-24 px-4 py-12">
				<h1 className="md:text-5xl text-3xl pb-4 font-bold flex justify-center items-center ">
					Contact Us
				</h1>
				<ContactSection />
			</section>
		</main>
	);
}
