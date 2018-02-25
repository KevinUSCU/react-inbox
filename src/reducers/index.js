import { combineReducers } from 'redux'
import messageList from './messageList'
import selectedMessages from './selectedMessages'

export default combineReducers({
  messageList,
  selectedMessages
})