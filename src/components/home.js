import React from 'react';
import { LoremIpsum } from "lorem-ipsum";
import { connect } from 'react-redux'

const lorem = new LoremIpsum({
  sentencesPerParagraph: { max: 7, min: 4 },
  wordsPerSentence: { max: 10, min: 4 }
});

function Home(props) {
  let meals = props.calories.filter(calories => calories.type === 'meal')

  let workouts = props.calories.filter(calories => calories.type === 'workout')

  let mealTotal = meals.reduce((prev, current) => prev + current.cal, 0)

  let workoutTotal = workouts.reduce((prev, current) => prev + current.cal, 0)


  return (
    <div className='home'>
      <div className='homeContainer'>
        <div className='titleContainer'>
          <div className='title'>Be Fitness</div>
          <div className='subTitle'>{'If you would be fit, where would you start?'}</div>
        </div>

        <div className='sideBySide'>
          <div className='sentense1 inside'>
            <p>Calories Consumed</p>
            <p className='largeNumber' >{mealTotal}</p>
          </div>
          <div className='sentense2 inside'>
            <p>Calories Burned</p>
            <p className='largeNumber' >{workoutTotal}</p>
          </div>
          <div className='sentense3 inside'>
            <p>Calorie Balance</p>
            <p className='largeNumber' >{mealTotal - workoutTotal}</p>
          </div>
        </div>
      </div>

      <div className='spacer2'>{'Let Health Inspire You'}</div>
      <div className='split'>
        <img
          className='chicken half'
          src='photos/runner.jpg'
          alt='chicken'
          width='100%'
          height='100%'
        />
        <div className='content half'>
          <div className='bold'>{lorem.generateWords(2)}</div>
          {lorem.generateParagraphs(1)}
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    calories: state.caloriesReducer.calories
  }
}

export default connect(
  mapStateToProps
  )(Home)