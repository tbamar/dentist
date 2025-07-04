import HeaderSection from './_components/HeaderSection';
import AboutSection from './_components/AboutSection';
import ServiceCard from './_components/ServiceCard';
import WorkProcess from './_components/WorkProcess';
import DoctorDetails from './_components/DoctorDetails';
import DoctorCards from './_components/DoctorDetails';
import TreatmentCards from '../services/_components/Demo';
import ClinicOverview from './_components/ClinicOverview';
import GalleryCards from './_components/GalleryCards';
export default function HomePage() {
	return (
		<main className="">
			<section className="md:pb-24 pb-14 pt-20">
				<HeaderSection />
			</section>
			<section
				id="clinic-overview"
				className="md:px-10 ">
				<h1 className="md:text-5xl font-bold flex justify-center items-center ">
					Clinic Overview
				</h1>
				<ClinicOverview />
			</section>
			<section className="md:px-10 md:pt-24">
				<h1 className="md:text-5xl font-bold flex justify-center items-center ">
					Meet Our Doctors
				</h1>
				<DoctorCards />
			</section>
			<section
				id="services"
				className="px-10 pt-24 ">
				<h1 className="md:text-5xl font-bold flex justify-center items-center ">
					Treatments We Provide:
				</h1>
				<TreatmentCards />
			</section>

			<section
				id="gallery"
				className="px-10 pt-24 ">
				<h1 className="md:text-5xl font-bold flex justify-center items-center ">
					Our Gallery
				</h1>
				<GalleryCards />
			</section>
			<section
				id="contact"
				className="px-10 py-24 ">
				<h1 className="text-5xl font-bold flex justify-center items-center ">
					Contact Us
				</h1>
				{/* Contact Form */}
			</section>
		</main>
	);
}
