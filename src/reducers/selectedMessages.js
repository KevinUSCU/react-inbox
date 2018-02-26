import { TOGGLE_SELECT_ALL_MESSAGES, TOGGLE_SELECT_MESSAGE, DESELECT_ALL_MESSAGES } from '../actions'

const initialState = []

export default (state = initialState, action) => {

  switch(action.type) {
    
    case TOGGLE_SELECT_ALL_MESSAGES:
      // note that selected state is not server-side persistant, so we will only save it to local state
      const allMessagesSelected = (state.length === action.messageList.length)
      // if all messages are selected, deselect all; otherwise select all
      if (allMessagesSelected) return []
      else return action.messageList.map(message => message.id)

    case TOGGLE_SELECT_MESSAGE:
      const newSelected = [ ...state ] //make copy
      const index = newSelected.indexOf(action.messageId) //check for currently selected
      if (index >= 0) newSelected.splice(index, 1) //remove from selected
      else newSelected.push(action.messageId) //add to selected
      return newSelected

    case DESELECT_ALL_MESSAGES:
      return []

    default: return state
  }
}