
let initialState = {
  recipes: []
}

const recipesReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_RECIPES': return {
      ...state,
      recipes: state.recipes.concat(action.item)
    }
    default: return state
  }
}

export default recipesReducer