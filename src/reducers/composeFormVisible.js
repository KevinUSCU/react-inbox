import { TOGGLE_COMPOSE_FORM } from '../actions'

const intitialState = false

export default (state = intitialState, action) => {
  switch(action.type) {

    case TOGGLE_COMPOSE_FORM:
      return !state.composeFormVisible

    default: return state
  }
}