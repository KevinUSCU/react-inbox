import { GET_MESSAGE_LIST_SUCCESS } from '../actions'

const initialState = []

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_MESSAGE_LIST_SUCCESS:
      return action.messages
    default: return state
  }
}