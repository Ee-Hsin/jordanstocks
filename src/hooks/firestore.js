import { db } from "../firebase"
import {
  collection,
  query,
  orderBy,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"

// TODO: Add an arguments for clauses (like where, and orderby) and spread that as additional
// parameters in getDocs.
// Order Query i optional and should be an array []
const getCollection = (collectionName, orderQuery) => {
  let q = query(collection(db, collectionName))

  if (orderQuery) {
    q = query(collection(db, collectionName), orderBy(...orderQuery))
  }
  return getDocs(q)
}
const postDoc = (collectionName, docData, docId = undefined) => {
  // For if we provide a custom docId such as the email in a collection called "emailList"
  // docData can then be both current date  of subscription (generate via firestore) and
  // their email.
  if (docId) {
    return setDoc(doc(db, collectionName, docId), docData)
    // If we did not provide a custom docId, we just reference a collection and when the doc is
    // added, it will be generated with a random Id.
  } else {
    return setDoc(collection(collectionName), docData)
  }
}

// Returns current firestore serverTimestamp (unlike regular firebase firestore Timestamp,
// it cannot be read or converted to a date until it is fetched back from firestore)
const getFirestoreTimestamp = () => {
  return serverTimestamp()
}

// Converts to javascript timestamp
const convertFirestoreTimestamp = (timestamp) => {
  return timestamp.toDate()
}

export {
  getCollection,
  postDoc,
  getFirestoreTimestamp,
  convertFirestoreTimestamp,
}

// The below code works, but the getTimestamp uses Timestamp from firebase/firestore.
// I rather use serverTimestamp(). Which SHOULD work it just doesn't work directly with m testing
// because it needs to go into the server first before it can be converted into a Timestamp.
/*The second function works fine regardless as long as it has a viable timestamp. I may use it
  after all, to convert to nicer timsetamp formats once I am able to test how the 
  convertFirestoreTimestamp function really works */

// const getFirestoreTimestamp = () => {
//   return Timestamp.now()
// }

// // Converts to javascript timestamp
// const convertFirestoreTimestamp = (timestamp) => {
//   let dateInMillis = timestamp * 1000
//   let date = new Date(dateInMillis)
//   let myDate = date.toLocaleDateString()
//   let myTime = date.toLocaleTimeString()
//   myDate = myDate.replaceAll("/", "-")
//   return myDate + " " + myTime
// }
