'use server';

import { revalidatePath } from 'next/cache';
import { google } from 'googleapis';
import { calendar_v3 as googleCalendar } from '@googleapis/calendar';
import { parse, add, format, parseISO } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

const SCOPES = [
	'https://www.googleapis.com/auth/calendar',
	'https://www.googleapis.com/auth/calendar.events',
];
const calendarId = process.env.CALENDAR_ID!;

const initGoogleCalendar = async () => {
	const auth = new google.auth.GoogleAuth({
		credentials: {
			client_id: process.env.GOOGLE_CLIENT_ID,
			client_email: process.env.GOOGLE_CLIENT_EMAIL,
			project_id: process.env.GOOGLE_PROJECT_ID,
			private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
		},
		scopes: SCOPES,
	});
	return google.calendar({ version: 'v3', auth });
};
// Chamber 1 slots
const SunToFriMorning = ['11:00', '11:30', '12:00', '12:30', '13:00'];
const MonToFriEvening = ['19:00', '19:30', '20:00', '20:30', '21:00'];
//saturday closed

// Chamber 2 slots
// const monAndWed = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'];
// const fri = ['15:00', '15:30', '16:00', '16:30', '17:00'];
// const tueThuSat = ['17:30', '18:00', '18:30', '19:00', '19:30'];
const monAndWedAfternoon = [
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
];
const tueThufriSatEvening = ['17:30', '18:00', '18:30', '19:00', '19:30'];
//sunday app basis only

type Chamber = 1 | 2;
type SlotType = 'morning' | 'evening' | 'afternoon'; // Only relevant for Chamber 1

/**
 * Turn each "HH:mm IST" slot into the correct UTC Date for conflict checks.
 */
export const buildDateSlots = async (
	date: Date,
	chamber: Chamber,
	slotType?: string
): Promise<Date[]> => {
	const isoDay = format(date, 'yyyy-MM-dd'); // e.g. "2025-05-12"
	const day = format(date, 'eee'); // e.g. "Sat"
	// console.log('date recieved' + date);

	console.log('day recieved' + day);

	let availableSlots: string[] = [];

	// console.log('chamber all details' + chamber); got that
	// console.log(day);
	if (chamber === 1) {
		const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day);
		const isSun = day === 'Sun';
		console.log('slot type in chamber 1', slotType);
		if (slotType === 'morning' && (isWeekday || isSun)) {
			availableSlots = SunToFriMorning;
		} else if (slotType === 'evening' && isWeekday) {
			availableSlots = MonToFriEvening;
		} else {
			availableSlots = []; // No slots on Saturday or invalid combination
		}
	} else if (chamber === 2) {
		const isAfternoon = ['Mon', 'Wed'].includes(day);
		const isEvening = ['Tue', 'Thu', 'Fri', 'Sat'].includes(day);
		const isSun = day === 'Sun';

		switch (day) {
			case 'Mon':
			case 'Wed':
				availableSlots = isAfternoon ? monAndWedAfternoon : [];
				break;
			case 'Fri':
				availableSlots = isEvening ? tueThufriSatEvening : [];
				break;
			case 'Tue':
			case 'Thu':
			case 'Sat':
				availableSlots = isEvening ? tueThufriSatEvening : [];
				break;
			case 'Sun':
			default:
				availableSlots = []; // appointment-based or closed
				break;
		}
	}

	console.log('availableSlots', availableSlots);
	return availableSlots.map((slot) =>
		fromZonedTime(`${isoDay}T${slot}:00`, 'Asia/Kolkata')
	);
};

/**
 * Fetch busy events for the given IST day and return the free slots (as "HH:mm").
 * @param date  in 'yyyyMMdd' format, e.g. "20250512"
 */

export const getAvailableSlots = async (
  date: string,
  chamber: 1 | 2,
  slotType?: 'morning' | 'evening' | string
): Promise<string[]> => {
  // Parse 'yyyyMMdd' date string
  const dayDate = parse(date, 'yyyyMMdd', new Date());

  // Get all slots based on chamber/day/slotType arrays (no API call)
  const allSlotsUtc = await buildDateSlots(dayDate, chamber, slotType);

  // Return slots formatted in IST 'HH:mm' for UI
  return allSlotsUtc.map((slotUtc) => {
    const slotIst = toZonedTime(slotUtc, 'Asia/Kolkata');
    return format(slotIst, 'HH:mm');
  });
};
// with googleapi
// export const getAvailableSlots = async (
// 	date: string,
// 	chamber: 1 | 2,
// 	slotType?: 'morning' | 'evening' | string
// ): Promise<string[]> => {
// 	const calendar = await initGoogleCalendar();

// 	// Build the UTC range that corresponds to the IST calendar day
// 	const isoDay = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(
// 		6,
// 		8
// 	)}`; // "2025-05-12"
// 	const dayStartUtc = fromZonedTime(`${isoDay}T00:00:00`, 'Asia/Kolkata');
// 	const dayEndUtc = add(dayStartUtc, { days: 1 });

// 	const resp = await calendar.events.list({
// 		calendarId,
// 		singleEvents: true,
// 		orderBy: 'startTime',
// 		timeMin: dayStartUtc.toISOString(),
// 		timeMax: dayEndUtc.toISOString(),
// 	});
// 	console.log('calendar response', resp?.data?.items); //fetched events from calendar
// 	const events = resp.data.items || [];

// 	// Compute all 30-min slot start times (in UTC)
// 	const dayDate = parse(date, 'yyyyMMdd', new Date());

// 	const allSlotsUtc = await buildDateSlots(dayDate, chamber, slotType);
// 	console.log(allSlotsUtc);

// 	// Filter out slots that overlap existing events
// 	// const freeSlotsUtc = allSlotsUtc.filter((slotUtc) => {
// 	// 	const slotEndUtc = add(slotUtc, { minutes: 30 });
// 	// 	return !events.some((evt: googleCalendar.Schema$Event) => {
// 	// 		const evtStart = new Date(evt.start?.dateTime || '');
// 	// 		const evtEnd = new Date(evt.end?.dateTime || '');
// 	// 		return slotUtc < evtEnd && slotEndUtc > evtStart;
// 	// 	});
// 	// });
// 	const freeSlotsUtc = allSlotsUtc; // Keep all slots, no filtering

// 	// Convert each free UTC slot back into IST for display
// 	return freeSlotsUtc.map((slotUtc) => {
// 		const slotIst = toZonedTime(slotUtc, 'Asia/Kolkata');
// 		return format(slotIst, 'HH:mm');
// 	});
// };

/**
 * Create the event at the picked IST time by handing Google a local ISO string + timeZone.
 * @param prevState  unused
 * @param formData   must include:
 *   - selectedCalendarDate: 'yyyy-MM-dd'
 *   - timetable:            'HH:mm'
 *   - email, message, etc.
 */
export const createMeeting = async (
	_prevState: { message: string } | null,
	formData: FormData
): Promise<{ message: string }> => {
	const calendar = await initGoogleCalendar();
	const dateString = formData.get('selectedCalendarDate') as string; // now '2025-05-12'
	const timeString = formData.get('timetable') as string; // e.g. '12:30'
	const mesage = formData.get('message') as string;
	const referredBy = formData.get('referredBy') as string;
	const name = formData.get('name') as string;

	const chamber = parseInt((formData.get('chamber') ?? '').toString()) as
		| 1
		| 2;
	const location = chamber === 1 ? 'Chamber I' : 'Chamber II';
	const description =
		`• Message: ${mesage}\n` +
		`• Referred By: ${referredBy}\n` +
		`• Name: ${name}`;
	const invitee = formData.get('email') as string;

	if (!dateString || !timeString) {
		return { message: 'Please select a date and time slot' };
	}

	// Build local‐IST ISO timestamps
	const startDateTimeStr = `${dateString}T${timeString}:00`; // '2025-05-12T12:30:00'
	const endDate = add(parseISO(startDateTimeStr), { minutes: 30 });
	const endTime = format(endDate, 'HH:mm');
	const endDateTimeStr = `${dateString}T${endTime}:00`; // '2025-05-12T13:00:00'

	// Let Google schedule it in IST
	const event: googleCalendar.Schema$Event = {
		summary: `Meeting Scheduled with ${invitee}`,
		description: description || undefined,
		location: location,
		start: {
			dateTime: startDateTimeStr,
			timeZone: 'Asia/Kolkata',
		},
		end: {
			dateTime: endDateTimeStr,
			timeZone: 'Asia/Kolkata',
		},
		conferenceData: {
			createRequest: {
				requestId: Math.random().toString(36).slice(-8),
				conferenceSolutionKey: { type: 'hangoutsMeet' },
			},
		},
		reminders: {
			useDefault: false,
			overrides: [{ method: 'email', minutes: 30 }],
		},
	};

	const resp = await calendar.events.insert({
		calendarId,
		requestBody: event,
	});
	// debug
	console.log('Insert response:', resp.status, resp.data);

	const message =
		resp.status === 200
			? "Meeting has been added to Doctor's calendar"
			: `Failed to insert event (${resp.status})`;

	revalidatePath('/');
	return { message };
};
