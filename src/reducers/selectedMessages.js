import { TOGGLE_SELECT_ALL_MESSAGES, TOGGLE_SELECT_MESSAGE } from '../actions'

const initialState = []

export default (state = initialState, action) => {

  switch(action.type) {
    
    case TOGGLE_SELECT_ALL_MESSAGES:
      // note that selected state is not server-side persistant, so we will only save it to local state
      const allMessagesSelected = (state.selectedMessages.length === state.messageList.length)
      // if all messages are selected, deselect all; otherwise select all
      if (allMessagesSelected) return []
      else return state.messageList.map(message => message.id)

    case TOGGLE_SELECT_MESSAGE:
      const newSelected = [ ...state ] //make copy
      const index = newSelected.indexOf(action.messageId) //check for currently selected
      if (index >= 0) newSelected.splice(index, 1) //remove from selected
      else newSelected.push(action.messageId) //add to selected
      return newSelected

    default: return state
  }
}