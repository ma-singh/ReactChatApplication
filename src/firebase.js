import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCPt2N-VPGvSwFufwvMvQA4jqxtE_-GP1w",
  authDomain: "react-chat-application.firebaseapp.com",
  databaseURL: "https://react-chat-application.firebaseio.com",
  projectId: "react-chat-application",
  storageBucket: "react-chat-application.appspot.com",
  messagingSenderId: "238854618708"
}

firebase.initializeApp(config)

export default firebase
