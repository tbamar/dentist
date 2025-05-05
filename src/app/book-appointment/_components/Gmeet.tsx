'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { createMeeting, getAvailableSlots } from '@/actions/meet-action';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/style.css';

export default function Gmeet() {
	const [state, formMeetAction] = useFormState(createMeeting, {
		message: '',
	});
	const [selected, setSelectedDate] = useState<Date>();
	const [slots, setAvailableSlots] = useState<string[]>();
	const [timetableError, setTimetableError] = useState<string>('');
	const [isTimeTableLoading, setIsTimeTableLoading] = useState(false);
	const [showMessage, setShowMessage] = useState(false);

	const handleDayPickerSelect = async (date: Date | undefined) => {
		setTimetableError('');
		setShowMessage(false);

		if (
			!date ||
			date.getDay() === 0 ||
			date.getDay() === 6 ||
			date < new Date()
		) {
			setSelectedDate(undefined);
			setAvailableSlots([]);
			return;
		}

		setSelectedDate(date);
		setIsTimeTableLoading(true);

		try {
			const availableSlots = await getAvailableSlots(
				format(date, 'yyyyMMdd')
			);
			setAvailableSlots(availableSlots);
		} catch (error) {
			console.error(error);
			setTimetableError(
				'Failed to fetch available slots. Please try again.'
			);
		} finally {
			setIsTimeTableLoading(false);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		if (
			!formData.get('timetable') ||
			!formData.get('selectedCalendarDate')
		) {
			setTimetableError('Please select a date and time slot');
			return;
		}

		formMeetAction(formData);
		setShowMessage(true);
		setTimetableError('');
		setSelectedDate(undefined);
		setAvailableSlots([]);
		event.currentTarget.reset();
	};

	const resetForm = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const form = event.currentTarget.form;
		if (form) {
			form.reset();
			setSelectedDate(undefined);
			setAvailableSlots([]);
			setTimetableError('');
		}
	};

	return (
		<div className="flex items-center justify-center p-10">
			<form
				name="meeting-invitation-form"
				className="flex flex-col gap-6 w-full max-w-2xl"
				onSubmit={handleSubmit}>
				{showMessage && state.message && (
					<p className="text-green-600 font-medium">
						{state.message}
					</p>
				)}

				<div className="flex flex-col sm:flex-row gap-8">
					<DayPicker
						mode="single"
						selected={selected}
						onSelect={handleDayPickerSelect}
						className="border rounded-lg"
					/>
					<input
						id="selectedCalendarDate"
						name="selectedCalendarDate"
						type="hidden"
						value={selected ? format(selected, 'yyyy-MM-dd') : ''}
					/>

					<div className="sm:ps-6 sm:border-s border-gray-300 w-full sm:max-w-xs">
						<h3 className="text-center mb-3 font-medium">
							{selected
								? format(selected, 'PPP')
								: 'Select a date first'}
						</h3>

						{isTimeTableLoading ? (
							<div className="flex flex-col items-center py-8">
								<div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full"></div>
								<p className="mt-2">Loading slots…</p>
							</div>
						) : slots && slots.length > 0 ? (
							<ul className="grid grid-cols-2 gap-2">
								{slots.map((slot) => (
									<li key={slot}>
										<input
											type="radio"
											id={slot}
											name="timetable"
											value={slot}
											className="hidden peer"
											onChange={() =>
												setTimetableError('')
											}
										/>
										<label
											htmlFor={slot}
											className="block text-center p-2 border rounded-lg cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white">
											{slot} PM IST
										</label>
									</li>
								))}
							</ul>
						) : (
							<div className="flex items-center justify-center py-8">
								<p className="text-gray-500">
									No time available
								</p>
							</div>
						)}

						{timetableError && (
							<p className="text-red-600 mt-2 text-sm">
								{timetableError}
							</p>
						)}
					</div>
				</div>

				<div className="flex justify-end gap-4 pt-4">
					<button
						type="submit"
						className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
						Submit
					</button>
					<button
						type="button"
						onClick={resetForm}
						className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">
						Reset
					</button>
				</div>
			</form>
		</div>
	);
}
