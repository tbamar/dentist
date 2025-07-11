import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const {
			name,
			email,
			phone,
			message,
			referredBy,
			date,
			location,
			timeSlot,
		} = body;

		if (
			!email ||
			!name ||
			!phone ||
			!message ||
			!referredBy ||
			!date ||
			!location ||
			!timeSlot
		) {
			return NextResponse.json(
				{ success: false, message: 'Missing required fields.' },
				{ status: 404 }
			);
		}

		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASS,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		const patientMailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject: `Your appointment with Dr. ${referredBy} - ${date} at ${timeSlot}`,
			html: `<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Your Appointment Confirmation</title>
					<style>
						/* Basic CSS for email client compatibility */
						body {
							font-family: 'Inter', sans-serif; /* Using Inter as requested */
							line-height: 1.6;
							color: #333333;
							background-color: #f4f4f4;
							margin: 0;
							padding: 0;
						}
						.container {
							width: 100%;
							max-width: 600px;
							margin: 0 auto;
							background-color: #ffffff;
							padding: 20px;
							border-radius: 8px; /* Rounded corners */
							box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
						}
						.header {
							text-align: center;
							padding-bottom: 20px;
							border-bottom: 1px solid #eeeeee;
						}
						.header h1 {
							color: #2c3e50;
							margin: 0;
							font-size: 24px;
						}
						.content {
							padding: 20px 0;
						}
						.content p {
							margin-bottom: 10px;
						}
						.appointment-details {
							width: 100%;
							border-collapse: collapse;
							margin-top: 20px;
							margin-bottom: 20px;
							border-radius: 8px; /* Rounded corners for the table */
							overflow: hidden; /* Ensures rounded corners are visible */
						}
						.appointment-details th,
						.appointment-details td {
							padding: 12px 15px;
							text-align: left;
							border-bottom: 1px solid #dddddd;
						}
						.appointment-details th {
							background-color: #e0f2f7; /* Light blue for headers */
							color: #2c3e50;
							font-weight: bold;
							border-top-left-radius: 8px; /* Rounded corners for first header cell */
							border-top-right-radius: 8px; /* Rounded corners for second header cell */
						}
						.appointment-details tr:last-child td {
							border-bottom: none;
						}
						.appointment-details tr:nth-child(even) {
							background-color: #f9f9f9; /* Light stripe for readability */
						}
						.footer {
							text-align: center;
							padding-top: 20px;
							border-top: 1px solid #eeeeee;
							font-size: 12px;
							color: #777777;
						}
						.button {
							display: inline-block;
							background-color: #3498db;
							color: #ffffff;
							padding: 10px 20px;
							text-decoration: none;
							border-radius: 5px;
							margin-top: 15px;
						}
					</style>
				</head>
				<body>
					<div class="container">
						<div class="header">
							<h1>Appointment Confirmation</h1>
						</div>
						<div class="content">
							<p>Dear ${name},</p>
							<p>This email confirms your upcoming appointment with <strong>Dr. ${referredBy}</strong> at <strong>32 Smile Dental Clinic</strong>.</p>
							<p>Here are the details of your appointment:</p>

							<table class="appointment-details">
								<thead>
									<tr>
										<th>Detail</th>
										<th>Value</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><strong>Doctor</strong></td>
										<td>Dr. ${referredBy}</td>
									</tr>
									<tr>
										<td><strong>Date</strong></td>
										<td>${date}</td>
									</tr>
									<tr>
										<td><strong>Time</strong></td>
										<td>${timeSlot}</td>
									</tr>
									<tr>
										<td><strong>Location</strong></td>
										<td>${location}</td>
									</tr>
									<tr>
										<td><strong>Your Message</strong></td>
										<td>"${message}"</td>
									</tr>
									<tr>
										<td><strong>Referred By</strong></td>
										<td>"${referredBy}"</td>
									</tr>
									<tr>
										<td><strong>Contact Number</strong></td>
										<td>${phone}</td>
									</tr>
									<tr>
										<td><strong>Email</strong></td>
										<td>${email}</td>
									</tr>
								</tbody>
							</table>

							<p>Please arrive ${30} minutes prior to your scheduled time to complete any necessary paperwork. Remember to bring ${'your prescription'}.</p>
							<p>If you need to reschedule or cancel your appointment, please contact us at ${'clinicPhoneNumber'} or reply to this email as soon as possible.</p>
							<p>We look forward to seeing you!</p>
						</div>
						<div class="footer">
							<p>Sincerely,</p>
							<p>The ${'32 Smile Dental Clinic'} Team</p>
							<p>&copy; ${new Date().getFullYear()} 32 Smile Dental Clinic. All rights reserved.</p>
						</div>
					</div>
				</body>
				</html>
`,
		};
		await transporter.sendMail(patientMailOptions);

		// 5. **Return Success Response**
		return NextResponse.json({
			success: true,
			message: 'Reservation confirmed and email sent successfully!',
		});
	} catch (error) {
		console.error('Error sending email:', error);
		return NextResponse.json(
			{ error: 'Failed to send email' },
			{ status: 500 }
		);
	}
}
