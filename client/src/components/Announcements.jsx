import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaBullhorn } from 'react-icons/fa'

const Announcement = () => {
	const [announcement, setAnnouncement] = useState(null)

	useEffect(() => {
		const fetchAnnouncement = async () => {
			try {
				console.log('Fetching announcement…')
				const { data } = await axios.get(
					`${process.env.REACT_APP_API_URL}/others/get-announce`
				)
				console.log('Announcement:', data)
				setAnnouncement(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchAnnouncement()
	}, [])

	return (
		<div className='announce mb20'>
			<div className='ann-icon'>
				<div className='icon'>
					<FaBullhorn />
				</div>
			</div>
			{announcement && (
				<div className='ann-text'>
					<p>{announcement.announcement}</p>
				</div>
			)}
		</div>
	)
}

export default Announcement
