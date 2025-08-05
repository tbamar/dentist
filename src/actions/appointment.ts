// app/actions/appointment.ts
'use server';

import { parse, format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

const SunToFriMorning = ['11:00', '11:30', '12:00', '12:30', '13:00'];
const MonToFriEvening = ['19:00', '19:30', '20:00', '20:30', '21:00'];
const monAndWedAfternoon = [
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
];
const tueThufriSatEvening = ['17:30', '18:00', '18:30', '19:00', '19:30'];

export type Chamber = 1 | 2;

export async function getAvailableSlots(
	date: string, // yyyyMMdd
	chamber: Chamber
): Promise<string[]> {
	const dayDate = parse(date, 'yyyyMMdd', new Date());
	const day = format(dayDate, 'eee'); // Mon/Tue/...

	let slots: string[] = [];

	if (chamber === 1) {
		const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day);
		const isSun = day === 'Sun';
		if (isWeekday || isSun) slots = SunToFriMorning;
		if (isWeekday) slots = [...slots, ...MonToFriEvening];
	} else {
		switch (day) {
			case 'Mon':
			case 'Wed':
				slots = monAndWedAfternoon;
				break;
			case 'Tue':
			case 'Thu':
			case 'Fri':
			case 'Sat':
				slots = tueThufriSatEvening;
				break;
			case 'Sun':
			default:
				slots = [];
		}
	}

	return slots.map((t) => {
		const utc = fromZonedTime(
			`${format(dayDate, 'yyyy-MM-dd')}T${t}:00`,
			'Asia/Kolkata'
		);
		return format(toZonedTime(utc, 'Asia/Kolkata'), 'HH:mm');
	});
}
