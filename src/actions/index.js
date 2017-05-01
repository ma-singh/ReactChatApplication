import firebase from '../firebase'
import DeviceInfo from 'react-native-device-info'
import FCM, { FCMEvent, NotificationType, WillPresentNotificationResult, RemoteNotificationResult } from 'react-native-fcm'
import { Platform } from 'react-native'

export const addMessage = (msg) => ({
    type: 'ADD_MESSAGE',
    ...msg
})

export const sendMessage = (text, user) => {
    return function (dispatch) {
        let msg = {
                text: text,
                time: Date.now(),
                author: {
                    name: user.name,
                    avatar: user.avatar
                }
            }

        const newMsgRef = firebase.database()
                                  .ref('messages')
                                  .push()
        msg.id = newMsgRef.key;
        newMsgRef.set(msg)

        dispatch(addMessage(msg))
    }
}

export const login = () => {
  return function (dispatch) {
    dispatch(startAuthorizing())

    firebase.auth()
      .signInAnonymously()
      .then(() => {
          dispatch(userAuthorized())
          dispatch(fetchMessages())
      })
    }
}

export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
})

export const receivedMessages = () => ({
    type: 'RECEIVED_MESSAGES',
    receivedAt: Date.now()
})

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

export const updateMessagesHeight = (event) => {
    const layout = event.nativeEvent.layout;

    return {
        type: 'UPDATE_MESSAGES_HEIGHT',
        height: layout.height
    }
}
