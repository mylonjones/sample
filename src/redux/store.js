import { createStore } from 'redux'
import caloriesReducer from './calories/caloriesReducer'

const store = createStore(caloriesReducer)

export default store