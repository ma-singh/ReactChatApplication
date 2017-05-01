export const fetchMessages = () => {
  return function(disatch) {
    dispatch(startFetchingMessages())

    firebase.database()
      .ref('messages')
      .on('value', (snapshot => {
        setTimeout(() => {
          const messages = snapshot.val() || []

          dispatch(receiveMessages(messages))
        }, 0)
      }))
  }
}

export const receiveMessages = (messages) => {
  return function (dispatch) {
    Object.values(messages).forEach(msg => dispatch(addMessage(msg)))

    dispatch(receivedMessages())
  }
}
