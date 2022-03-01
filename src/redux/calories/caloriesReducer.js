import { ADD_CALORIES, EDIT_CALORIES, DELETE_ONE_CALORIES } from './caloriesTypes'

let initialState = {
  calories: []
}

let stored = localStorage.getItem('meals')
if(stored) {
  initialState = {
    calories: JSON.parse(stored)
  }
}


const caloriesReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_CALORIES: return {
      ...state,
      calories: state.calories.concat([action.item])
    }
    case EDIT_CALORIES: {
      state.calories.splice(action.index, 1, action.item)
      return {
        ...state
      }
    }
    case DELETE_ONE_CALORIES: {
      let calorieSets = state.calories
      calorieSets.splice(action.index, 1)
      for(let i = action.index; i < calorieSets.length; i++) {
        calorieSets[i].index = calorieSets[i].index - 1
      }
      return {
        ...state,
        calories: calorieSets
      }
    }

    default: return state
  }
}

export default caloriesReducer