'use client';

import { use, useEffect, useRef, useState } from 'react';

import { getAvailableSlots, type SlotType } from '@/actions/meet-action';
import { DayPicker } from 'react-day-picker';
import { format, set } from 'date-fns';
import 'react-day-picker/style.css';
import { toast } from 'react-toastify';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChamberTabs from './ChamberTabs';
import { http } from '@/httpClient/httpClient';
import { SearchModal } from './DialogBox';
import { Button } from '@/components/ui/button';

export default function AppointmentForm() {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [selected, setSelectedDate] = useState<Date>();
	const [slots, setAvailableSlots] = useState<string[]>();
	const [timetableError, setTimetableError] = useState<string>('');
	const [isTimeTableLoading, setIsTimeTableLoading] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const [waitingListCount, setWaitingListCount] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedChamber, setSelectedChamber] = useState<{
		chamber: 'chamber1' | 'chamber2';
		timeSlot: SlotType;
	}>({ chamber: 'chamber1', timeSlot: 'morning' });

	const handleDayPickerSelect = async (date: Date | undefined) => {
		// console.log(selectedChamber);
		// console.log('date on 3rd line :' + date);
		// console.log('day of week', date?.getDay());
		const dayOfWeek = date?.getDay();
		// console.log('dayOfWeek', dayOfWeek);
		setTimetableError('');

		const isAfternoon: Boolean =
			dayOfWeek === 1 || dayOfWeek === 3 ? true : false;
		// console.log('isAfternoon', isAfternoon);

		const isEvening: Boolean =
			dayOfWeek === 2 ||
			dayOfWeek === 4 ||
			dayOfWeek === 5 ||
			dayOfWeek === 6
				? true
				: false;
		// console.log('isEvening', isEvening);

		setShowMessage(false);
		if (!date) {
			setSelectedDate(undefined);
			setAvailableSlots([]);
		} else {
			if (date < new Date()) {
				// console.log('day is selected ', selected);
				setSelectedDate(undefined);
				setAvailableSlots([]);
				return;
			} else {
				setSelectedDate(date);
				// console.log('day is weekend', date.getDay());
				setIsTimeTableLoading(true);

				try {
					const availableSlots = await getAvailableSlots(
						format(date, 'yyyyMMdd'),
						selectedChamber.chamber === 'chamber1' ? 1 : 2,
						selectedChamber.timeSlot ?? undefined
					);
					if (selectedChamber.chamber === 'chamber1') {
						setAvailableSlots(availableSlots);
					} else if (
						selectedChamber.chamber === 'chamber2' &&
						isAfternoon &&
						selectedChamber.timeSlot === 'afternoon'
					) {
						setAvailableSlots(availableSlots);
						return;
					} else if (
						selectedChamber.chamber === 'chamber2' &&
						isEvening &&
						selectedChamber.timeSlot === 'evening'
					) {
						setAvailableSlots(availableSlots);
						return;
					} else {
						setAvailableSlots([]);
						return;
					}

					// console.log('all available slots', availableSlots);
					// console.log('timeslot : ' + selectedChamber.timeSlot);
				} catch (error) {
					console.error(error);
					setTimetableError(
						'Failed to fetch available slots. Please try again.'
					);
				} finally {
					setIsTimeTableLoading(false);
				}
			}
		}
	};

	const timeTableCta = async () => {
		//FIXME button handler
		// console.log('🟢 timeTableCta called 🟢 ');

		const timeInput = document.querySelector(
			'input[name="timetable"]:checked'
		) as HTMLInputElement;
		const chamberInput = document.querySelector(
			'input[name="chamber"]'
		) as HTMLInputElement;
		const dateInput = document.querySelector(
			'input[name="selectedCalendarDate"]'
		) as HTMLInputElement;

		const time = timeInput?.value || '';
		const location = parseInt((chamberInput?.value ?? '').toString()) as
			| 1
			| 2;
		const chamber =
			location === 1
				? '29, Shreegopal Mullick Ln, Newland, College Square,'
				: 'LOHARUKA GREEN LEAF, 3, VIP Rd,';
		const date = dateInput?.value || '';

		if (!time || !chamber || !date) {
			toast.error('Please Select Chamber, Date and Time First');
			return;
		}

		const countData = {
			date,
			chamber,
			time,
		};
		// console.log('here is contData', countData);

		try {
			// console.log('🟢 timeTableCta called 🟢 ');
			// console.log('http', http);
			const res = await http.post('/waitinglist/count', countData);
			// console.log('here is res', res.data.count);
			setWaitingListCount(res.data.count);
		} catch (error) {
			console.error('❌ Error calling /waitinglist/count:', error);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();

			const formData = new FormData(event.currentTarget);
			if (
				!formData.get('name') ||
				!formData.get('email') ||
				!formData.get('contactNo') ||
				!formData.get('address') ||
				!formData.get('referredBy') ||
				!formData.get('selectedCalendarDate') ||
				!formData.get('timetable')
			) {
				toast.error('Please fill in all required fields');
				return;
			}

			// form content
			const name = formData.get('name') as string;
			const email = formData.get('email') as string;
			const phone = formData.get('contactNo') as string;
			const address = formData.get('address') as string;
			const referredBy = formData.get('referredBy') as string;
			const date = formData.get('selectedCalendarDate') as string;
			const time = formData.get('timetable') as string;
			const location = parseInt(
				(formData.get('chamber') ?? '').toString()
			) as 1 | 2;
			const chamber =
				location === 1
					? '29, Shreegopal Mullick Ln, Newland, College Square,'
					: 'LOHARUKA GREEN LEAF, 3, VIP Rd,';
			const mailData = {
				name,
				email,
				phone,
				address,
				chamber,
				referredBy,
				date,
				time,
			};
			// console.log('💻 maildata', mailData);

			// TODO: booking endpoint
			const res = await http.post('/bookings', mailData, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			// console.log('💻here is res', res);

			// end form content

			// Show toast notification after form submission

			if (res.data.message === 'Booking confirmed') {
				toast.success(
					'Reservation confirmed and email sent successfully!!'
				);
			}
			if (res.data.message === 'Added to waiting list') {
				toast.success('Added to waiting list ' + res.data.position);
			}

			// Reset form fields after successful submission
			// const form = event.currentTarget;
			formRef.current?.reset();
			setWaitingListCount(0);
			setSelectedDate(undefined);
			setAvailableSlots([]);
			setTimetableError('');
			setShowMessage(true);
			setSelectedChamber({ chamber: 'chamber1', timeSlot: 'morning' });
		} catch (error: any) {
			console.log(error);
			console.log(error.response.data.message);
			toast.error('Something went wrong!');
		}
	};

	const resetForm = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const form = event.currentTarget.form;
		if (form) {
			form.reset();
			setWaitingListCount(0);
			setSelectedDate(undefined);
		}
	};

	return (
		<div className="md:flex items-center justify-center md:p-10">
			<form
				ref={formRef}
				name="meeting-invitation-form"
				className="flex flex-col gap-4"
				onSubmit={handleSubmit}>
				<h2 className="text-xl text-gray-900 dark:text-white font-bold mb-2">
					Let&apos;s Talk
				</h2>
				{/* */}

				<div className="flex flex-col gap-2">
					{/* New fields for name, contact, and address */}
					<input
						type="text"
						id="name"
						name="name"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Full Name"
						required
					/>

					<input
						type="text"
						id="address"
						name="address"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Address"
						required
					/>

					<input
						type="tel"
						id="contactNo"
						name="contactNo"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Contact Number"
						required
					/>

					<input
						type="email"
						id="email"
						name="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Email"
						required
					/>

					<input
						type="text"
						id="referredBy"
						name="referredBy"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Referred By"
					/>
					{/* Chamber dropdown */}
					<ChamberTabs
						chamberHandle={handleDayPickerSelect}
						onChamberSelect={(data) => setSelectedChamber(data)}
					/>
				</div>

				<div className="flex flex-col sm:flex-row gap-4">
					<DayPicker
						mode="single"
						required
						selected={selected}
						onSelect={(date) => handleDayPickerSelect(date)}
					/>
					<input
						id="selectedCalendarDate"
						name="selectedCalendarDate"
						type="hidden"
						value={selected ? format(selected, 'yyyy-MM-dd') : ''}
					/>
					<input
						id="chamber"
						name="chamber"
						type="hidden"
						value={
							selectedChamber.chamber === 'chamber1' ? '1' : '2'
						}
					/>

					<div className="sm:ms-7 sm:ps-5 sm:border-s border-gray-200 dark:border-gray-800 w-full sm:max-w-[15rem] mt-5 sm:mt-0">
						<h3 className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center">
							{selected
								? selected.toLocaleDateString()
								: 'Select a Date First'}
						</h3>
						<button
							type="button"
							data-collapse-toggle="timetable"
							className="inline-flex items-center w-full py-2 px-5 me-2 justify-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
							<svg
								className="w-4 h-4 text-gray-800 dark:text-white me-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								viewBox="0 0 24 24">
								<path
									fillRule="evenodd"
									d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
									clipRule="evenodd"
								/>
							</svg>
							Pick An Available Time
						</button>
						<label className="sr-only">Pick a time</label>
						{isTimeTableLoading ? (
							<div className="flex flex-col justify-center items-center h-32">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
								<p className="ml-2 justify-center items-center">
									Loading...
								</p>
							</div>
						) : (
							<>
								{slots && slots.length > 0 ? (
									<>
										<ul
											id="timetable"
											className="grid w-full grid-cols-2 gap-2 pt-5">
											{slots.map((slot) => (
												<li key={slot}>
													<input
														type="radio"
														id={slot}
														value={slot}
														className="hidden peer"
														name="timetable"
														onChange={() =>
															setTimetableError(
																''
															)
														}
													/>
													<label
														htmlFor={slot}
														className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500">
														{slot}
													</label>
												</li>
											))}
										</ul>
										{timetableError && (
											<p className="text-red-500 items-center text-sm mt-2">
												{timetableError}
											</p>
										)}
									</>
								) : (
									<div className="flex justify-center items-center h-32 w-full">
										<p className="text-lg text-red-500 font-medium dark:text-white">
											No Time Available
										</p>
									</div>
								)}
							</>
						)}
						{/* TODO button */}
						<div className="pt-6 flex-col flex gap-4">
							<button
								type="button"
								className="text-white w-fit bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
								onClick={() => {
									timeTableCta();
								}}>
								Check Status
							</button>
							<h1 className=" font-semibold w-fit  text-white  bg-cyan-600 px-4 py-2 rounded shadow-md inline-block">
								Waiting List: {waitingListCount}
							</h1>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<textarea
						id="message"
						name="message"
						rows={4}
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Please Provide Topics For the Discussion..."></textarea>
				</div>
				<div className="flex justify-between  items-center w-full">
					<Button
						className="bg-red-500 p-3 h-full"
						type="button"
						onClick={() => setModalOpen(true)}>
						Cancel Appointment
					</Button>
					<SearchModal
						open={modalOpen}
						setOpen={setModalOpen}
					/>
					<div className="flex  gap-2 items-center">
						<button
							type="button"
							aria-label="Reset"
							className="w-full  p-3 cursor-pointer font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
							onClick={resetForm}>
							Reset
						</button>
						<button
							type="submit"
							aria-label="Submit"
							className="text-white p-3 bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50">
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
