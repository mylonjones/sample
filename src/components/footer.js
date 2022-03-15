import React from 'react'

const copyToClipboard = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject('The Clipboard API is not available.');
};

export default function Footer() {
  let date = new Date()
  let year = date.getFullYear()

  function mouseHandlers(id) {
    return {
      onMouseEnter: () => {
        let button = document.getElementById(id)
        button.style.visibility = 'visible'
      },
      onMouseLeave: () => {
        let button = document.getElementById(id)
        button.style.visibility = 'hidden'
        button.textContent = 'Copy'
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
      <ul>
        <div {...mouseHandlers('email')} >resources@befitness.com
          <button
            id='email'
            className='copyButton'
            {...clickHandler('resources@befitness.com')}
            >Copy</button>
        </div>
        <div {...mouseHandlers('phoneNumber')} >1-234-567-8910
        <button
            id='phoneNumber'
            className='copyButton'
            {...clickHandler('1-234-567-8910')}
            >Copy</button>
        </div>
        <div>{'© ' + year + ' Be Fitness Health'}</div>

      </ul>
    </div>
  )
}