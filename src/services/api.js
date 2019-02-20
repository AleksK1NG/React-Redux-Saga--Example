import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

class ApiService {
  fb = firebase

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  subscribeForPeople = (callback) =>
    this.fb
      .firestore()
      .collection('people')
      .onSnapshot((snapshot) => callback(resToEntities(snapshot)))

  fetchAllEvents = () =>
    this.fb
      .firestore()
      .collection('events')
      .get()
      .then(resToEntities)

  fetchLazyEvents = (id) =>
    this.fb
      .firestore()
      .collection('events')
      .orderBy('title')
      .startAfter(id ? id : '')
      .limit(10)
      .get()
      .then(resToEntities)

  loadAllPeople = () =>
    this.fb
      .firestore()
      .collection('people')
      .get()
      .then(resToEntities)

  addPerson = (person) =>
    this.fb
      .firestore()
      .collection('people')
      .add(person)

  addPersonToEvent = (eventId, peopleIds) =>
    this.fb
      .firestore()
      .collection('events')
      .doc(eventId)
      .update({ peopleIds })

  deleteEvent = (id) =>
    this.fb
      .firestore()
      .collection('events')
      .doc(id)
      .delete()

  deletePerson = (id) =>
    this.fb
      .firestore()
      .collection('people')
      .doc(id)
      .delete()
}

function resToEntities(res) {
  return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export default new ApiService()
