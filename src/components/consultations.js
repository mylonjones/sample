import React, { useState } from 'react'

function monthName(num) {
  switch(num) {
    case 0: return 'January'
    case 1: return 'February'
    case 2: return 'March'
    case 3: return 'April'
    case 4: return 'May'
    case 5: return 'June'
    case 6: return 'July'
    case 7: return 'August'
    case 8: return 'September'
    case 9: return 'October'
    case 10: return 'November'
    case 11: return 'December'
    default: return 'Not a month'
  }
}



function getCalendar(today) {

  const date = new Date(today.getFullYear(), today.getMonth(), 1)
  let dates = []
  const weeks = []

  while (date.getMonth() === today.getMonth()) {
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
  return weeks
}

export default function Consultations() {

  let today = new Date()
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const [weeks, setWeeks] = useState(getCalendar(today))
  const [selected, setSelected] = useState(null)




  function handleNext() {
    setWeeks(prev => getCalendar(new Date(prev[0][0].getFullYear(), prev[0][0].getMonth() + 1, 1)))
  }

  function handlePrev() {
    setWeeks(prev => getCalendar(new Date(prev[0][0].getFullYear(), prev[0][0].getMonth() - 1, 1)))
  }

  function handleSelect(day) {
    setSelected(day)
  }


  return (
    <div>
      Consultations
      <div className='clendar' >
        <div>
          {monthName(weeks[0][0].getMonth()) + ' ' + weeks[0][0].getFullYear()}
        </div>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
        <div className='calendarWeeks' >
          <div className='calendarWeek' >
            <div className='calendarDay' style={{gridArea: 'day0'}} >
              {'S'}
            </div>
            <div className='calendarDay' style={{gridArea: 'day1'}} >
              {'M'}
            </div>
            <div className='calendarDay' style={{gridArea: 'day2'}} >
              {'T'}
            </div>
            <div className='calendarDay' style={{gridArea: 'day3'}} >
              {'W'}
            </div>
            <div className='calendarDay' style={{gridArea: 'day4'}} >
              {'T'}
            </div>
            <div className='calendarDay' style={{gridArea: 'day5'}} >
              {'F'}
            </div>
            <div className='calendarDay' style={{gridArea: 'day6'}} >
              {'S'}
            </div>
          </div>

          {weeks.map((week, index) => {
            return (<div
              className='calendarWeek'
              key={index} >
                {week.map((day, index) => {
                  let addedClass = ' '
                  if(day.getTime() === today.getTime()) addedClass += 'today'
                  if(selected && selected.getTime() === day.getTime()) addedClass += 'selectedDate'

                  return (<div
                    className={'calendarDay' + addedClass}
                    style={{gridArea: 'day' + day.getDay()}}
                    onClick={()=>{handleSelect(day)}}
                    key={index}>
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