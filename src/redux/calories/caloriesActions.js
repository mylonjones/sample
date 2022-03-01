import { ADD_CALORIES, EDIT_CALORIES, DELETE_ONE_CALORIES } from './caloriesTypes'

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

export const deleteOneCalories = (index) => {
  return {
    type: DELETE_ONE_CALORIES,
    index
  }
}