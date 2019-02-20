import conferences from './conferences'
import firebase from 'firebase/app'
import 'firebase/firestore'

// Save to Firebase database helper function
export function saveEventsToFB() {
  const eventsRef = firebase.firestore().collection('events')
  conferences.forEach((conference) => eventsRef.add(conference))
}

window.saveEventsToFB = saveEventsToFB
