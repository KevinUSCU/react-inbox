import { combineReducers } from 'redux'
import composeFormVisible from './composeFormVisible'
import labelOptions from './labelOptions'
import messageList from './messageList'
import selectedMessages from './selectedMessages'

export default combineReducers({
  composeFormVisible,
  labelOptions,
  messageList,
  selectedMessages
})