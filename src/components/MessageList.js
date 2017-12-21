import React from 'react'
import Message from './Message'

function MessageList({ messages, selected, functions }) {
  return messages.map((el, i) => {
    const isSelected = selected.includes(el.id) // will be true or false
    return <Message key={ i } message={ el } selected={ isSelected } functions={ functions } />
  })
}

export default MessageList