'use server';

import { revalidatePath } from 'next/cache';
import { google } from 'googleapis';
import { calendar_v3 as googleCalendar } from '@googleapis/calendar';
import { add, format, parse, formatISO, isBefore, isAfter } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

const SCOPES = [
	'https://www.googleapis.com/auth/calendar',
	'https://www.googleapis.com/auth/calendar.events',
];

const calendarId = process.env.CALENDAR_ID;

// Updated time slots to IST (8:00 CET = 12:30 IST)
const availableSlots = [
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
	'15:00',
	'15:30',
	'16:00',
	'16:30',
	'17:00',
	'17:30',
	'18:00',
	'18:30',
	'19:00',
	'19:30',
];

const initGoogleCalendar = async () => {
	try {
		const credentials = {
			client_id: process.env.GOOGLE_CLIENT_ID,
			client_email: process.env.GOOGLE_CLIENT_EMAIL,
			project_id: process.env.GOOGLE_PROJECT_ID,
			private_key: process.env.GOOGLE_PRIVATE_KEY,
		};
		const auth = new google.auth.GoogleAuth({
			credentials: credentials,
			scopes: SCOPES,
		});

		const calendar = google.calendar({ version: 'v3', auth });

		console.log('Google Calendar API initialized:');
		return calendar;
	} catch (error) {
		console.error('Error initializing Google Calendar API:', error);
	}
};

export const buildDateSlots = async (date: Date) => {
	const dateSlots = availableSlots.map((slot) => {
		// Create IST datetime
		const istDateTime = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			+slot.slice(0, 2),
			+slot.slice(3, 5)
		);
		// Convert from IST to UTC for comparison with Google Calendar events
		return fromZonedTime(istDateTime, 'Asia/Kolkata');
	});
	return dateSlots;
};

export const getAvailableSlots = async (date: string) => {
	const calendar = await initGoogleCalendar();

	const dayDate = parse(date, 'yyyyMMdd', new Date());
	console.log(`getting events on ${dayDate}`);
	const response = await calendar?.events.list({
		calendarId: calendarId,
		eventTypes: ['default'],
		timeMin: dayDate.toISOString(),
		timeMax: add(dayDate, { days: 1 }).toISOString(),
		singleEvents: true,
		orderBy: 'startTime',
	});

	const events = response?.data?.items || [];
	const dateSlots = await buildDateSlots(dayDate);

	const availableSlots = dateSlots.filter((slot) => {
		const slotEnd = add(slot, { minutes: 30 });

		// Check if this slot conflicts with any existing event
		const hasConflict = events.some(
			(event: googleCalendar.Schema$Event) => {
				const eventStart = new Date(event.start?.dateTime || '');
				const eventEnd = new Date(event.end?.dateTime || '');

				return isBefore(slot, eventEnd) && isAfter(slotEnd, eventStart);
			}
		);

		return !hasConflict;
	});

	// Convert available Date objects to string time slots - in IST timezone
	return availableSlots.map((slot) => {
		return format(toZonedTime(slot, 'Asia/Kolkata'), 'HH:mm');
	});
};

export const createMeeting = async (
	prevState: { message: string } | null,
	formData: FormData
) => {
	const calendar = await initGoogleCalendar();
	console.log('Using CALENDAR_ID:', calendarId);

	let message = '';

	const dateString = formData.get('selectedCalendarDate') as string;
	const timeString = formData.get('timetable') as string;
	if (!timeString && availableSlots.includes(timeString)) {
		return { message: 'No correct time slot selected' };
	}
	const description = formData.get('message') as string;
	const invitee = formData.get('email') as string;

	// Parse the date and time in IST timezone
	const istDateTime = parse(
		`${dateString} ${timeString}`,
		'dd/MM/yyyy HH:mm',
		new Date()
	);
	const utcDate = fromZonedTime(istDateTime, 'Asia/Kolkata');

	// Convert date to UTC
	const startDateTime = new Date(utcDate.toUTCString());
	const endDateTime = add(startDateTime, { minutes: 30 });

	const event = {
		summary: `Call with ${invitee}`,
		description: description || undefined,
		start: {
			dateTime: formatISO(startDateTime),
			timeZone: 'UTC',
		},
		end: {
			dateTime: formatISO(endDateTime),
			timeZone: 'UTC',
		},
		conferenceData: {
			createRequest: {
				requestId: Math.random().toString(36).substring(7),
				conferenceSolutionKey: {
					type: 'hangoutsMeet',
				},
			},
		},
		reminders: {
			useDefault: false,
			overrides: [
				{
					method: 'email',
					minutes: 30,
				},
			],
		},
	};

	const meeting = await calendar?.events.insert({
		calendarId: calendarId,
		requestBody: event,
	});
	console.log(meeting);
	if (meeting?.data) {
		if (meeting.status === 200) {
			message = 'Meeting has been added to my calendar';
		} else {
			console.log('Failed to insert event');
			message = 'Failed to insert event';
		}
	} else {
		console.log('Failed to insert event: Calendar not initialized');
		message = 'Failed to insert event: Calendar not initialized';
	}

	revalidatePath('/');
	return { message: message };
};
