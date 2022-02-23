import { createStore, combineReducers } from 'redux'
import caloriesReducer from './calories/caloriesReducer'
import recipesReducer from './recipes/recipesReducer'

const rootReducer = combineReducers({
  caloriesReducer: caloriesReducer,
  recipesReducer: recipesReducer
})

const store = createStore(rootReducer)

export default store
