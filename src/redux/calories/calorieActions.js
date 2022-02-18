import { ADD_CALORIES } from './calorieTypes'

export const addCalories = (item) => {
  return {
    type: ADD_CALORIES,
    item: item
  }
}