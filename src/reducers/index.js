import { combineReducers } from 'redux'
import labelOptions from './labelOptions'
import messageList from './messageList'
import selectedMessages from './selectedMessages'

export default combineReducers({
  labelOptions,
  messageList,
  selectedMessages
})