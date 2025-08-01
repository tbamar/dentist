import * as React from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { http } from '@/httpClient/httpClient';
import { toast } from 'react-toastify';

export function SearchModal({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const [query, setQuery] = React.useState({
		bookingId: '',
		email: '',
	});

	const handleCancelBooking = async (query: {
		bookingId: string;
		email: string;
	}) => {
		// alert(`Searching for: ${query}`);
		// setOpen(false); // optionally close after search
		try {
			const trimmedbookingId = query.bookingId.trim();
			const res = await http.delete(
				`bookings/${trimmedbookingId}/cancel`,
				{
					data: { email: query.email },
				}
			);
			console.log('💻cancel res', res);

			toast.success('Booking cancelled successfully');
			setOpen(!true);
		} catch (error: any) {
			if (error.response) {
				const status = error.response.status;

				if (status === 404) {
					toast.error('Booking ID not found!');
				} else if (status === 403) {
					toast.error('Email does not match!');
				} else if (status >= 500) {
					toast.error('Booking not found !');
				} else {
					toast.error(
						`Error: ${
							error.response.data?.message ||
							'Something went wrong!'
						}`
					);
				}
			} else if (error.request) {
				// Request was made but no response received
				toast.error(
					'No response from server, please check your network!'
				);
			} else {
				// Something else caused the error
				toast.error(
					`Error: ${error.message || 'Something went wrong!'}`
				);
			}
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cancel Your Booking</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-4 ">
					<div className="flex flex-col gap-1">
						<label htmlFor="email">Email</label>
						<Input
							placeholder="enter your email..."
							value={query.email}
							id="email"
							required
							onChange={(e) =>
								setQuery({ ...query, email: e.target.value })
							}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label
							className=""
							htmlFor="bookingId">
							Booking ID
						</label>
						<Input
							placeholder="enter your booking id..."
							value={query.bookingId}
							id="bookingId"
							required
							onChange={(e) =>
								setQuery({
									...query,
									bookingId: e.target.value,
								})
							}
						/>
					</div>
					<Button
						className="bg-red-900 p-3 "
						onClick={() => handleCancelBooking(query)}>
						Cancel
					</Button>
				</div>
				<DialogClose className="absolute right-4 top-4"></DialogClose>
			</DialogContent>
		</Dialog>
	);
}
