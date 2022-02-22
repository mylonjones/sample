import { ADD_CALORIES, EDIT_CALORIES } from './calorieTypes'

export const addCalories = (item) => {
  return {
    type: ADD_CALORIES,
    item
  }
}

export const editCalories = (item, index) => {
  return {
    type: EDIT_CALORIES,
    item,
    index
  }
}