export const GET_MESSAGE_LIST_SUCCESS = 'GET_MESSAGE_LIST_SUCCESS'
export const getMessageList = () => {
  return async (dispatch) => {
    const messagesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const messagesJson = await messagesResponse.json()
    
    dispatch({
      type: GET_MESSAGE_LIST_SUCCESS,
      messageList: messagesJson._embedded.messages
    })
  }
}