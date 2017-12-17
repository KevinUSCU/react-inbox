import React from 'react'
import Message from './Message'

function MessageList({ messages, functions }) {
  return messages.map((el, i) => <Message key={ i } message={ el } functions={ functions } />)
}

export default MessageList