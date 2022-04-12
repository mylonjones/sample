import React from 'react'

export default function Consultations() {

  let month = new Date()

  const date = new Date(month.getFullYear(), month.getMonth(), 1)

  let dates = []
  const weeks = []

  while (date.getMonth() === month.getMonth()) {
    const next = new Date(date)
    dates.push(next)
    if(next.getDay() === 6) {
      weeks.push(dates)
      dates = []
    }
    date.setDate(date.getDate() + 1)
  }
  if(dates.length !== 0) {
    weeks.push(dates)
  }




  return (
    <div>
      Consultations
      <div className='clendar' >
        <div>
          calendar
        </div>
        <div className='calendarWeeks' >
          {weeks.map((week, index) => {
            return (<div className='calendarWeek' key={index} >
              {week.map((day, index) => {
                return (<div className='calendarDay' style={{gridArea: 'day' + day.getDay()}} key={index}>
                  {day.getDate()}
                </div>)
              })}
            </div>)
          })}
        </div>
      </div>
    </div>
  )
}