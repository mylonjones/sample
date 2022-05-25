import React, { useRef } from 'react'

const copyToClipboard = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject('The Clipboard API is not available.');
};

export default function Footer() {
  let date = new Date()
  let year = date.getFullYear()
  const email = useRef()
  const number = useRef()

  function mouseHandlers(ref) {
    return {
      onMouseEnter: () => {
        ref.current.style.visibility = 'visible'
      },
      onMouseLeave: () => {
        ref.current.style.visibility = 'hidden'
        ref.current.textContent = 'Copy'
      }
    }
  }

  function clickHandler(content) {
    return {
      onClick: (e) => {
        copyToClipboard(content)
        e.target.textContent = 'Copied!'
      }
    }
  }

  return(
    <div className='footer'>
      <div {...mouseHandlers(email)} >resources@befitness.com
        <button
          ref={email}
          className='copyButton'
          {...clickHandler('resources@befitness.com')}
          >Copy</button>
      </div>
      <div {...mouseHandlers(number)} >1-234-567-8910
      <button
          ref={number}
          className='copyButton'
          {...clickHandler('1-234-567-8910')}
          >Copy</button>
      </div>
      <div>{'© ' + year + ' Be Fitness Health'}</div>
    </div>
  )
}