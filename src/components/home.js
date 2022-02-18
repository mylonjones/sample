import React from 'react';
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: { max: 7, min: 4 },
  wordsPerSentence: { max: 10, min: 4 }
});

export default function Home() {
  return (
    <div className='home'>
      <div className='dashPartition'>
        <div className='titleContainer'>
          <div className='title'>This Is The Title</div>
          <div className='subTitle'>{lorem.generateWords(10)}</div>
        </div>

        <div className='spacer' >
        {'Catch Phrase or Something'}
        </div>

        <div className='sideBySide'>
          <p className='sentense1 inside'>{lorem.generateSentences(1)}</p>
          <p className='sentense2 inside'>{lorem.generateSentences(1)}</p>
          <p className='sentense3 inside'>{lorem.generateSentences(1)}</p>
        </div>
      </div>

      <div className='spacer2'>{'Yet Another Short Phrase'}</div>
      <div className='split'>
        <img
          className='chicken half'
          src='photos/chicken.jpg'
          alt='chicken'
          width='100%'
        />
        <div className='content half'>
          <div className='bold'>{lorem.generateWords(2)}</div>
          {lorem.generateParagraphs(1)}
        </div>
      </div>

    </div>
  )
}