import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Calendar() {
	const currentDate = new Date()
	const monthName = currentDate.toLocaleString('default', { month: 'long' })
	const daysInMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0
	).getDate()
	const firstDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	).getDay()

	const dates = [...Array(daysInMonth)].map((_, index) => index + 1)
	for (let i = 0; i < firstDayOfMonth; i++) {
		dates.unshift(null)
	}

	const today = new Date()
	const dayOfMonth = today.getDate()

	const [calendar, setCalendar] = useState(null)
	const [activeEvent, setActiveEvent] = useState(null)

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				console.log('Fetching events…')
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/others/get-events`
				)
				console.log('Response:', response)
				const data = response.data
				console.log('Data:', data)
				setCalendar(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchEvents()
	}, [])

	const handleMouseEnter = (event) => {
		if (event) {
			console.log('Event ID:', event.id)
			setActiveEvent(event)
		}
	}

	const handleMouseLeave = () => {
		setActiveEvent(null)
	}

	return (
		<div className='text-center'>
			<h2 className='month mb-8'>{monthName}</h2>
			<table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 text-center'>
				<thead>
					<tr className='days cal-tr'>
						<th className='fs-6 fw-bold'>Sun</th>
						<th className='fs-6 fw-bold'>Mon</th>
						<th className='fs-6 fw-bold'>Tue</th>
						<th className='fs-6 fw-bold'>Wed</th>
						<th className='fs-6 fw-bold'>Thu</th>
						<th className='fs-6 fw-bold'>Fri</th>
						<th className='fs-6 fw-bold'>Sat</th>
					</tr>
				</thead>
				<tbody>
					{[...Array(Math.ceil(dates.length / 7)).keys()].map((weekIndex) => (
						<tr key={weekIndex} className='cal-tr'>
							{[...Array(7).keys()].map((dayIndex) => {
								const dateIndex = weekIndex * 7 + dayIndex
								const date = dates[dateIndex]
								const eventsOnDate =
									calendar && Array.isArray(calendar) // check if calendar is an array before filtering
										? calendar.filter((event) => {
												const eventDate = new Date(event.date)
												return (
													eventDate.getDate() === date &&
													eventDate.getMonth() === currentDate.getMonth() &&
													eventDate.getFullYear() === currentDate.getFullYear()
												)
										  })
										: []
								return (
									<td
										className='fs-7 fw-bold'
										key={dayIndex}
										style={{
											backgroundColor:
												eventsOnDate.length > 0
													? '#fff8dd'
													: date === dayOfMonth
													? '#e8fff3'
													: undefined,
											color:
												date === dayOfMonth
													? '#47be7d'
													: eventsOnDate.length > 0
													? '#f1bc00'
													: 'inherit',
											// Add new condition to set backgroundColor if there is an event on dayOfMonth
											...(eventsOnDate.some(
												(event) => new Date(event.date).getDate() === dayOfMonth
											) && {
												backgroundColor: '#f1faff',
												color: '#0095e8',
											}),
										}}
										onMouseEnter={() => handleMouseEnter(eventsOnDate[0])}
										onMouseLeave={handleMouseLeave}
									>
										{date && <span className='dateNumber'>{date}</span>}
									</td>
								)
							})}
						</tr>
					))}
				</tbody>
			</table>
			{activeEvent ? (
				<div>
					<p className='text-primary'>{activeEvent.title}</p>
				</div>
			) : (
				<div>
					<p className='text-danger'>
						No selected event. Hover/Click on the calendar to check available
						event.
					</p>
				</div>
			)}
		</div>
	)
}

export default Calendar
