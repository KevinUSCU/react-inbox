export const GET_MESSAGE_LIST_SUCCESS = 'GET_MESSAGE_LIST_SUCCESS'

// MESSAGE LIST FUNCTIONS
export const getMessageList = () => {
  return async (dispatch) => {
    const messages = await getMessageIndex()
    
    dispatch({
      type: GET_MESSAGE_LIST_SUCCESS,
      messageList: messages
    })
  }
}

export const messageRead = (event) => {
  return async (dispatch) => {
    const messageId = Number(event.target.closest('.message').id)
    await updateMessages([ messageId ], 'read', { read: true })
    const updatedMessages = await getMessageIndex()

    dispatch({
      type: GET_MESSAGE_LIST_SUCCESS,
      messageList: updatedMessages
    })
  }
}

export const toggleStar = (event) => {
  return async (dispatch, getState) => {
    const messageId = Number(event.target.closest('.message').id)
    const currentState = getState().messageList.filter(el => el.id === messageId)[0].starred
    await updateMessages([ messageId ], 'star', { star: !currentState })
    const updatedMessages = await getMessageIndex()

    dispatch({
      type: GET_MESSAGE_LIST_SUCCESS,
      messageList: updatedMessages
    })
  }
}

// TOOLBAR FUNCTIONS
export const TOGGLE_COMPOSE_FORM = 'TOGGLE_COMPOSE_FORM'
export const toggleComposeForm = () => {
  return {
    type: TOGGLE_COMPOSE_FORM
  }
}

export const sendMessage = (event) => {
  // prevent default refresh
  event.preventDefault()
  // get form values
  const subject = event.target.subject.value
  const body = event.target.body.value
  return async (dispatch) => {
    // Send post data to API
    await sendNewMessage(subject, body)
    
    // Update local state from API & close form
    const updatedMessages = await getMessageIndex()

    dispatch({
      type: GET_MESSAGE_LIST_SUCCESS,
      messageList: updatedMessages
    })

    dispatch({
      type: TOGGLE_COMPOSE_FORM
    })
  }
}

export const TOGGLE_SELECT_ALL_MESSAGES = 'TOGGLE_SELECT_ALL_MESSAGES'
export const toggleSelectAllMessages = (messageList) => {
  return {
    type: TOGGLE_SELECT_ALL_MESSAGES,
    messageList
  }    
}

export const TOGGLE_SELECT_MESSAGE = 'TOGGLE_SELECT_MESSAGE'
export const toggleSelectMessage = (event) => { 
  return {
    type: TOGGLE_SELECT_MESSAGE,
    messageId: Number(event.target.closest('.message').id)
  }
}

export const applyLabel = (event) => {
  return async (dispatch, getState) => {
    const label = event.target.value
    event.target.selectedIndex = 0 // reset selection box to default
    if (label) { // ignores cases where the selection header is selected
      await updateMessages(getState().selectedMessages, 'addLabel', { label })
      const updatedMessages = await getMessageIndex()

      dispatch({
        type: GET_MESSAGE_LIST_SUCCESS,
        messageList: updatedMessages
      })
    }
  }
}

export const removeLabel = (event) => {
  return async (dispatch, getState) => {
    const label = event.target.value
    event.target.selectedIndex = 0 // reset selection box to default
    if (label) { // ignores cases where the selection header is selected
      await updateMessages(getState().selectedMessages, 'removeLabel', { label })
      const updatedMessages = await getMessageIndex()

      dispatch({
        type: GET_MESSAGE_LIST_SUCCESS,
        messageList: updatedMessages
      })
    }
  }
}

export const DESELECT_ALL_MESSAGES = 'DESELECT_ALL_MESSAGES'
export const deleteMessages = () => {
  return async (dispatch, getState) => {
    await updateMessages(getState().selectedMessages, 'delete')
    const updatedMessages = await getMessageIndex()

    dispatch({
      type: GET_MESSAGE_LIST_SUCCESS,
      messageList: updatedMessages
    })

    // empty selected list since they are deleted
    dispatch({
      type: DESELECT_ALL_MESSAGES
    })
  }
}

export const markRead = () => {
  return async (dispatch, getState) => {
    await updateMessages(getState().selectedMessages, 'read', { read: true })
    const updatedMessages = await getMessageIndex()

    dispatch({
      type: GET_MESSAGE_LIST_SUCCESS,
      messageList: updatedMessages
    })
  }
}

export const markUnread = () => {
  return async (dispatch, getState) => {
    await updateMessages(getState().selectedMessages, 'read', { read: false })
    const updatedMessages = await getMessageIndex()

    dispatch({
      type: GET_MESSAGE_LIST_SUCCESS,
      messageList: updatedMessages
    })
  }
}

// API CALLS
async function getMessageIndex() {
  const messagesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
  const messagesJson = await messagesResponse.json()
  return messagesJson._embedded.messages
}

async function sendNewMessage(subject, body) {
  await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
    method: 'POST',
    body: JSON.stringify({ subject, body }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

async function updateMessages(messageIds, command, attribute) {
  const request = {
    messageIds,
    command
  }
  if (attribute) {
    const key = Object.keys(attribute)[0]
    request[key] = attribute[key]
  }
  // Send updated data to API
  await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
    method: 'PATCH',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}