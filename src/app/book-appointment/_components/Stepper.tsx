'use client';

import React, { useState, useMemo } from 'react';
import {
	Calendar,
	MapPin,
	Clock,
	Search,
	ChevronDown,
	Check,
	ChevronLeft,
	ChevronRight,
	User,
	ArrowLeft,
	ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { http } from '@/httpClient/httpClient';
import { FaSpinner } from 'react-icons/fa';
import { toWords } from 'number-to-words';

interface Location {
	id: string;
	name: string;
	address: string;
}

interface CalendarDay {
	date: Date;
	day: number;
	isCurrentMonth: boolean;
	isPast: boolean;
	isToday: boolean;
	value: string;
	display: string;
	dayName: string;
}

interface FormData {
	name: string;
	address: string;
	email: string;
	phone: string;
	referredBy: string;
	message: string;
}

const DentalBookingSystem: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [selectedLocation, setSelectedLocation] = useState<string>('');
	const [selectedTime, setSelectedTime] = useState<string>('');
	const [locationSearch, setLocationSearch] = useState<string>('');
	const [showLocationDropdown, setShowLocationDropdown] =
		useState<boolean>(false);
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState<FormData>({
		name: '',
		address: '',
		email: '',
		phone: '',
		referredBy: '',
		message: '',
	});
	const [waitingListCount, setWaitingListCount] = useState<number>(0);
	// Calendar state - Set to August 2025
	const [currentMonth, setCurrentMonth] = useState<Date>(
		new Date(2025, 7, 1)
	);

	// extracting day from selected date
	const dayOfWeek = selectedDate ? new Date(selectedDate).getDay() : null;

	// Chamber 1 slots
	const SunToFriMorning = ['11:00', '11:30', '12:00', '12:30', '13:00'];
	const MonToFriEvening = ['19:00', '19:30', '20:00', '20:30', '21:00'];
	// Saturday closed

	// Chamber 2 slots
	const monAndWedAfternoon = [
		'12:00',
		'12:30',
		'13:00',
		'13:30',
		'14:00',
		'14:30',
	];
	const tueThufriSatEvening = ['17:30', '18:00', '18:30', '19:00', '19:30'];
	// Sunday appointment only (no slots)

	// CHAMBER 1
	const chamber1Slots =
		dayOfWeek === null
			? []
			: dayOfWeek === 6 // Saturday
			? [] // closed
			: dayOfWeek === 0 // Sunday
			? SunToFriMorning // 11:00-13:00
			: [...SunToFriMorning, ...MonToFriEvening]; // Mon-Fri (1-5)

	// CHAMBER 2
	const chamber2Slots =
		dayOfWeek === null
			? []
			: dayOfWeek === 0 // Sunday
			? [] // appointment only
			: dayOfWeek === 1 || dayOfWeek === 3 // Monday / Wednesday
			? monAndWedAfternoon
			: dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 5 // Tue, Thu, Fri
			? tueThufriSatEvening
			: dayOfWeek === 6 // Saturday
			? tueThufriSatEvening // same evening slots
			: [];

	// Mock data for locations
	const locations: Location[] = [
		{
			id: '1',
			name: 'College Square Branch',
			address: '29, Shreegopal Mullick Ln, Newland, College Square',
		},
		{
			id: '2',
			name: 'VIP Road Branch',
			address: 'LOHARUKA GREEN LEAF, 3, VIP Rd',
		},
	];

	// Mock available times
	const availableTimes =
		selectedLocation === '1' ? chamber1Slots : chamber2Slots;

	const referralOptions: string[] = [
		'Google Search',
		'Friend/Family',
		'Doctor Referral',
		'Insurance Directory',
		'Social Media',
		'Advertisement',
		'Other',
	];

	// Generate calendar data
	const generateCalendar = (date: Date): CalendarDay[] => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const firstDay = new Date(year, month, 1);
		const startDate = new Date(firstDay);
		startDate.setDate(firstDay.getDate() - firstDay.getDay());

		const days: CalendarDay[] = [];
		const currentDate = new Date(startDate);

		for (let i = 0; i < 42; i++) {
			const isCurrentMonth = currentDate.getMonth() === month;
			const isPast = currentDate < today;
			const isToday = currentDate.getTime() === today.getTime();

			const dateValue = `${currentDate.getFullYear()}-${String(
				currentDate.getMonth() + 1
			).padStart(2, '0')}-${String(currentDate.getDate()).padStart(
				2,
				'0'
			)}`;

			days.push({
				date: new Date(currentDate),
				day: currentDate.getDate(),
				isCurrentMonth,
				isPast,
				isToday,
				value: dateValue,
				display: currentDate.toLocaleDateString('en-US', {
					weekday: 'short',
					month: 'short',
					day: 'numeric',
				}),
				dayName: currentDate.toLocaleDateString('en-US', {
					weekday: 'long',
				}),
			});

			currentDate.setDate(currentDate.getDate() + 1);
		}

		return days;
	};

	const calendarDays = generateCalendar(currentMonth);
	const monthName = currentMonth.toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	});

	const goToPreviousMonth = (): void => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
		);
	};

	const goToNextMonth = (): void => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
		);
	};

	// Filter locations based on search
	const filteredLocations = useMemo(() => {
		if (!locationSearch) return locations;
		return locations.filter(
			(location) =>
				location.name
					.toLowerCase()
					.includes(locationSearch.toLowerCase()) ||
				location.address
					.toLowerCase()
					.includes(locationSearch.toLowerCase())
		);
	}, [locationSearch]);

	const handleLocationSelect = (location: Location): void => {
		setSelectedLocation(location.id);
		setLocationSearch(location.name);
		setShowLocationDropdown(false);
	};

	const handleDateSelect = (date: string): void => {
		setSelectedDate(date);
	};

	const handleTimeSelect = async (time: string): Promise<void> => {
		// TODO: fetch available times from server

		// console.log('here is contData', countData);

		try {
			setSelectedTime(time);

			const countData = {
				date: selectedDate,
				chamber: selectedLocation,
				time: time,
			};
			console.log('countData', countData);
			setIsLoading(true);
			const res = await http.post('/waitinglist/count', countData);

			const waitingListCount = res.data.count;
			console.log('💻waitingListCount', waitingListCount);
			setWaitingListCount(waitingListCount);
			setIsLoading(false);
		} catch (error) {
			console.error('❌ Error calling /waitinglist/count:', error);
		}
	};

	const handleFormChange = (field: keyof FormData, value: string): void => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleNext = (): void => {
		if (currentStep < 5) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = (): void => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleBooking = (): void => {
		const selectedLocationData = locations.find(
			(loc) => loc.id === selectedLocation
		);
		const selectedDateData = calendarDays.find(
			(d) => d.value === selectedDate
		);

		alert(
			`Booking confirmed!\nName: ${formData.name}\nLocation: ${selectedLocationData?.name}\nDate: ${selectedDateData?.display}\nTime: ${selectedTime}\nEmail: ${formData.email}`
		);
	};

	const isStepValid = (step: number): boolean => {
		switch (step) {
			case 1:
				return !!selectedDate;
			case 2:
				return !!selectedLocation;
			case 3:
				return !!selectedTime;
			case 4:
				return !!(
					formData.name &&
					formData.email &&
					formData.phone &&
					formData.address
				);
			case 5:
				return true;
			default:
				return false;
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6 flex flex-col gap-4 bg-background ">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-foreground mb-2">
					Book Your Dental Appointment
				</h1>
				<p className="text-muted-foreground">
					Quick and easy scheduling in just a few steps
				</p>
			</div>

			{/* Progress Indicator */}
			<div className="flex justify-center mb-8">
				<div className="flex items-center gap-4">
					{[1, 2, 3, 4, 5].map((step) => (
						<div
							key={step}
							className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
								currentStep >= step
									? 'bg-primary text-primary-foreground'
									: 'bg-muted text-muted-foreground'
							}`}>
							{currentStep > step ? <Check size={20} /> : step}
						</div>
					))}
				</div>
			</div>

			<div className="space-y-8">
				<div className="h-[32rem]">
					{/* Step 1: Date Selection */}
					{currentStep === 1 && (
						<Card className="h-full">
							<CardHeader>
								<CardTitle className="flex items-center">
									<Calendar className="w-6 h-6 text-primary mr-3" />
									Select Date
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="bg-card border rounded-lg p-4">
									{/* Calendar Header */}
									<div className="flex justify-between items-center mb-4">
										<Button
											variant="ghost"
											size="icon"
											onClick={goToPreviousMonth}>
											<ChevronLeft className="w-5 h-5" />
										</Button>
										<h3 className="text-lg font-semibold">
											{monthName}
										</h3>
										<Button
											variant="ghost"
											size="icon"
											onClick={goToNextMonth}>
											<ChevronRight className="w-5 h-5" />
										</Button>
									</div>

									{/* Day Labels */}
									<div className="grid grid-cols-7 gap-1 mb-2">
										{[
											'Sun',
											'Mon',
											'Tue',
											'Wed',
											'Thu',
											'Fri',
											'Sat',
										].map((day) => (
											<div
												key={day}
												className="text-center text-sm h-12 w-12 font-medium text-muted-foreground p-2">
												{day}
											</div>
										))}
									</div>

									{/* Calendar Grid */}
									<div className="grid grid-cols-7 gap-1 ">
										{calendarDays.map((day, index) => (
											<Button
												key={index}
												variant={
													selectedDate === day.value
														? 'default'
														: 'ghost'
												}
												size="sm"
												onClick={() => {
													if (
														!day.isPast &&
														day.isCurrentMonth
													) {
														handleDateSelect(
															day.value
														);
													}
												}}
												disabled={
													day.isPast ||
													!day.isCurrentMonth
												}
												className={`
                        h-12 w-12 text-sm font-medium
                        ${
							!day.isCurrentMonth
								? 'text-muted-foreground/30'
								: day.isPast
								? 'text-muted-foreground/50'
								: day.isToday && selectedDate !== day.value
								? 'ring-2 ring-primary '
								: ''
						}
                      `}>
												{day.day}
											</Button>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Step 2: Location Selection */}
					{currentStep === 2 && (
						<Card className="h-full">
							<CardHeader>
								<CardTitle className="flex items-center">
									<MapPin className="w-6 h-6 text-primary mr-3" />
									Select Location
								</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col gap-4">
								<div className="relative mb-4 ">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
									<Input
										type="text"
										placeholder="Search locations by name or area..."
										value={locationSearch}
										onChange={(e) => {
											setLocationSearch(e.target.value);
											setShowLocationDropdown(true);
										}}
										onFocus={() =>
											setShowLocationDropdown(true)
										}
										className="pl-10 pr-4"
									/>
									<ChevronDown
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 cursor-pointer"
										onClick={() =>
											setShowLocationDropdown(
												!showLocationDropdown
											)
										}
									/>
								</div>

								<div className="grid gap-3 max-h-80 overflow-y-auto">
									{filteredLocations.map((location) => (
										<Button
											key={location.id}
											variant={
												selectedLocation === location.id
													? 'default'
													: 'outline'
											}
											className="p-4 h-auto justify-start"
											onClick={() =>
												handleLocationSelect(location)
											}>
											<div className="flex justify-between items-start w-full">
												<div className="text-left">
													<div className="font-semibold">
														{location.name}
													</div>
													<div className="text-sm opacity-70">
														{location.address}
													</div>
												</div>
												{/* <div className="text-sm font-medium ml-4">
													{location.distance}
												</div> */}
											</div>
										</Button>
									))}
								</div>
							</CardContent>
						</Card>
					)}

					{/* Step 3: Time Selection */}
					{currentStep === 3 && (
						<Card className="h-full">
							<CardHeader>
								<CardTitle className="flex items-center">
									<Clock className="w-6 h-6 text-primary mr-3" />
									Select Time
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-3 md:grid-cols-5  gap-4">
									{availableTimes.length > 0 ? (
										availableTimes.map((time) => (
											<Button
												key={time}
												variant={
													selectedTime === time
														? 'default'
														: 'outline'
												}
												onClick={() =>
													handleTimeSelect(time)
												}
												className="p-3">
												{time}
											</Button>
										))
									) : (
										<div className="flex text-center justify-center items-center h-full w-full">
											This Chamber is Closed on this day!
										</div>
									)}
								</div>
							</CardContent>
							<CardFooter className="items-center justify-center h-full ">
								<div
									className={` ${
										selectedTime == '' ? 'hidden' : 'block'
									} p-2 rounded-lg `}>
									{isLoading ? (
										<div className="flex items-center justify-center">
											<FaSpinner className="w-5 h-5 mr-2 animate-spin" />
											Loading...
										</div>
									) : (
										<div>
											{waitingListCount == 0 ? (
												<div className="bg-[#57cc99] text-gray-700 p-3 rounded-lg">
													This slot is available
												</div>
											) : (
												<div className="bg-[#b21e35] text-white p-3 rounded-lg capitalize">
													This slot has{' '}
													<b>
														{toWords(
															waitingListCount
														)}{' '}
														Booking
													</b>{' '}
													already
												</div>
											)}
										</div>
									)}
								</div>
							</CardFooter>
						</Card>
					)}

					{/* Step 4: Personal Information */}
					{currentStep === 4 && (
						<Card className="h-full">
							<CardHeader>
								<CardTitle className="flex items-center">
									<User className="w-6 h-6 text-primary mr-3" />
									Personal Information
								</CardTitle>
								<CardDescription>
									Please provide your contact details for the
									appointment
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col gap-4">
								<div className="grid grid-cols-1  gap-4">
									<div className="flex flex-col gap-1">
										<Label htmlFor="name">
											Full Name *
										</Label>
										<Input
											id="name"
											type="text"
											placeholder="Enter your full name"
											value={formData.name}
											onChange={(e) =>
												handleFormChange(
													'name',
													e.target.value
												)
											}
											required
										/>
									</div>
									<div className="flex flex-col gap-1">
										<Label htmlFor="email">
											Email Address *
										</Label>
										<Input
											id="email"
											type="email"
											placeholder="Enter your email"
											value={formData.email}
											onChange={(e) =>
												handleFormChange(
													'email',
													e.target.value
												)
											}
											required
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="flex flex-col gap-1">
										<Label htmlFor="phone">
											Phone Number *
										</Label>
										<Input
											id="phone"
											type="tel"
											placeholder="Enter your phone number"
											value={formData.phone}
											onChange={(e) =>
												handleFormChange(
													'phone',
													e.target.value
												)
											}
											required
										/>
									</div>
									<div className="flex flex-col gap-1">
										<Label htmlFor="referredBy">
											Referred By:
										</Label>
										<Input
											id="referredBy"
											type="text"
											placeholder="Referred By"
											value={formData.referredBy}
											onChange={(e) =>
												handleFormChange(
													'referredBy',
													e.target.value
												)
											}
										/>
									</div>
								</div>

								<div className="flex flex-col gap-1">
									<Label htmlFor="address">Address *</Label>
									<Input
										id="address"
										type="text"
										placeholder="Enter your full address"
										value={formData.address}
										onChange={(e) =>
											handleFormChange(
												'address',
												e.target.value
											)
										}
										required
									/>
								</div>
								<div className="flex flex-col gap-1">
									<label htmlFor="message">Message:</label>
									<textarea
										id="message"
										className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
										placeholder="Enter your message"
										value={formData.message}
										onChange={(e) =>
											handleFormChange(
												'message',
												e.target.value
											)
										}
									/>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Step 5: Review and Confirm */}
					{currentStep === 5 && (
						<Card className="h-full">
							<CardHeader>
								<CardTitle>Review Your Appointment</CardTitle>
								<CardDescription>
									Please review all details before confirming
									your booking
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col gap-6">
									{/* Appointment Details */}
									<div>
										<h3 className="font-semibold mb-3">
											Appointment Details
										</h3>
										<div className="bg-muted rounded-lg p-4 flex flex-col gap-1">
											<div className="flex justify-between">
												<span className="font-medium">
													Location:
												</span>
												<span>
													{
														locations.find(
															(loc) =>
																loc.id ===
																selectedLocation
														)?.name
													}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">
													Address:
												</span>
												<span className="text-right">
													{
														locations.find(
															(loc) =>
																loc.id ===
																selectedLocation
														)?.address
													}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">
													Date:
												</span>
												<span>
													{
														calendarDays.find(
															(d) =>
																d.value ===
																selectedDate
														)?.dayName
													}
													,{' '}
													{
														calendarDays.find(
															(d) =>
																d.value ===
																selectedDate
														)?.display
													}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">
													Time:
												</span>
												<span>{selectedTime}</span>
											</div>
										</div>
									</div>

									{/* Personal Information */}
									<div>
										<h3 className="font-semibold mb-3">
											Personal Information
										</h3>
										<div className="bg-muted rounded-lg p-4 flex flex-col gap-1">
											<div className="flex justify-between">
												<span className="font-medium">
													Name:
												</span>
												<span>{formData.name}</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">
													Email:
												</span>
												<span>{formData.email}</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">
													Phone:
												</span>
												<span>{formData.phone}</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">
													Address:
												</span>
												<span className="text-right">
													{formData.address}
												</span>
											</div>
											{formData.referredBy && (
												<div className="flex justify-between">
													<span className="font-medium">
														Referred by:
													</span>
													<span>
														{formData.referredBy}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Navigation Buttons */}
				<div className="flex justify-between pt-6">
					<Button
						variant="outline"
						onClick={handleBack}
						disabled={currentStep === 1}
						className="flex items-center">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back
					</Button>

					{currentStep < 5 ? (
						<Button
							onClick={handleNext}
							disabled={!isStepValid(currentStep)}
							className="flex items-center">
							Next
							<ArrowRight className="w-4 h-4 ml-2" />
						</Button>
					) : (
						<Button
							onClick={handleBooking}
							className="flex items-center bg-primary hover:bg-primary/80">
							<Check className="w-4 h-4 mr-2" />
							Confirm Booking
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default DentalBookingSystem;
