import React from 'react';

function Calendar() {
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const dates = [...Array(daysInMonth)].map((_, index) => index + 1);
  for (let i = 0; i < firstDayOfMonth; i++) {
    dates.unshift(null);
  }

  const today = new Date();
  const dayOfMonth = today.getDate();
  
  const cells = document.getElementsByClassName('date');
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (parseInt(cell.innerHTML) === dayOfMonth) {
        cell.style.backgroundColor = '#bb944f';
        cell.style.color = '#fff';
    }
  }

  return (    
    <div className="calendar">
    <h2>{monthName}</h2>
    <table>
      <thead>
        <tr className='days'>
          <th className='date'>Sun</th>
          <th className='date'>Mon</th>
          <th className='date'>Tue</th>
          <th className='date'>Wed</th>
          <th className='date'>Thu</th>
          <th className='date'>Fri</th>
          <th className='date'>Sat</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(Math.ceil(dates.length / 7)).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {[...Array(7).keys()].map((dayIndex) => {
              const dateIndex = weekIndex * 7 + dayIndex;
              const date = dates[dateIndex];
              return (
                <td className='date' key={dayIndex}>
                  {date !== null && date}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Calendar;
