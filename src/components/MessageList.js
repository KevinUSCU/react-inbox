import React from 'react'
import Message from './Message'

function MessageList({ messages }) {
  return messages.map((el, i) => <Message key={ i } message={ el } />)
}

export default MessageList