import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Announcement = () => {
	const [announcement, setAnnouncement] = useState(null)

	useEffect(() => {
		const fetchAnnouncement = async () => {
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_API_URL}/others/get-announce`
				)

				setAnnouncement(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchAnnouncement()
	}, [])

	return (
		<div className='card mb-5 mb-xl-10'>
			<div className='card-body announce'>
				{announcement && (
					<div className='ann-text'>
						<h4>{announcement.announcement}</h4>
					</div>
				)}
			</div>
		</div>
	)
}

export default Announcement
