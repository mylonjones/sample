import { ADD_CALORIES } from './calorieTypes'

let initialState = {
  calories: []
}

let stored = localStorage.getItem('meals')
if(stored) {
  initialState = {
    calories: JSON.parse(stored)
  }
}


const calorieReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_CALORIES: return {
      ...state,
      calories: state.calories.concat([action.item])
    }

    default: return state
  }
}

export default calorieReducer