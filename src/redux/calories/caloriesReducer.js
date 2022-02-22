import { ADD_CALORIES, EDIT_CALORIES } from './calorieTypes'

let initialState = {
  calories: [{name: 'name', cal: 'cal'}]
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
    case EDIT_CALORIES: {
      state.calories.splice(action.index, 1, action.item)
      return {
        ...state
      }
    }

    default: return state
  }
}

export default calorieReducer