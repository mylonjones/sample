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

  let lastWeek = weeks[weeks.length - 1]
  while(lastWeek.length < 7) {
    lastWeek.push(null)
  }

  let firstWeek = weeks[0]
  while(firstWeek.length < 7) {
    firstWeek.unshift(null)
  }

  return weeks
}

export default function Consultations() {

  let today = new Date()
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const [weeks, setWeeks] = useState(getCalendar(today))
  const [selected, setSelected] = useState(null)

  const [type, setType] = useState('Diet')
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [time, setTime] = useState('12:00')

  function handleNext() {
    setWeeks(prev => getCalendar(new Date(prev[0][6].getFullYear(), prev[0][6].getMonth() + 1, 1)))
  }

  function handlePrev() {
    setWeeks(prev => getCalendar(new Date(prev[0][6].getFullYear(), prev[0][6].getMonth() - 1, 1)))
  }

  return (
    <div className='consultations' >
      <div className='booking'>
        <div className='header'>Make a consultation appointment</div>
        <div className='formContainer'>
          <form className='form'>
            <label>Consultation Type</label>
            <select
              className='input'
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value='Diet' >Diet</option>
              <option value='Training'>Training</option>
            </select>
            <label>Name</label>
            <input
              className='input'
              type='text'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              className='input'
              type='text'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Time</label>
            <select
              className='input'
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value='12:00' >12:00</option>
              <option value='1:00' >1:00</option>
              <option value='2:00' >2:00</option>
              <option value='3:00' >3:00</option>
              <option value='4:00' >4:00</option>
              <option value='5:00' >5:00</option>
            </select>
          </form>
          <div className='calendar' >

            <div className='calendarWeeks' >
              <div className='month'>
                <div className='button' onClick={handlePrev}>{'<--'}</div>
                {monthName(weeks[0][6].getMonth()) + ' ' + weeks[0][6].getFullYear()}
                <div className='button' onClick={handleNext}>{'-->'}</div>
              </div>
              <div className='calendarWeek' >
                <div className='calendarDay'>{'S'}</div>
                <div className='calendarDay'>{'M'}</div>
                <div className='calendarDay'>{'T'}</div>
                <div className='calendarDay'>{'W'}</div>
                <div className='calendarDay'>{'T'}</div>
                <div className='calendarDay'>{'F'}</div>
                <div className='calendarDay'>{'S'}</div>
              </div>

              {weeks.map((week, index) => {
                return (<div
                  className='calendarWeek'
                  key={index} >
                    {week.map((day, index) => {

                      if(day === null) {
                        return (<div
                          className='calendarDay'
                          key={index}
                        ></div>)
                      }


                      let addedClass = ''
                      if(day.getTime() === today.getTime()) addedClass += ' today'
                      if(selected && selected.getTime() === day.getTime()) addedClass += ' selectedDate'

                      return (<div
                        className={'calendarDay' + addedClass}
                        onClick={()=>{setSelected(day)}}
                        key={index}>
                          {day.getDate()}
                      </div>)
                    })}
                </div>)
              })}

            </div>

          </div>
        </div>
        <div className='submitForm'>
          <div className='details'>{`book ${name}'s ${type} appointment for ${ (selected && selected.toDateString())  || 'unselected'} at ${time}`}</div>
          <div className='submit'>book and pay</div>
        </div>
      </div>
    </div>
  )
}