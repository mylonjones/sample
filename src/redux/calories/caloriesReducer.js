import { ADD_CALORIES } from './calorieTypes'

const initialState = {
  calories: [{name: 'beef', cal: 350}, {name: 'chicken', cal: 200}]
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