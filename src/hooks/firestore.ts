import { db, storage } from "../firebase"
import {
  collection,
  query,
  orderBy,
  getDocs,
  setDoc,
  addDoc,
  doc,
  serverTimestamp,
  DocumentData,
  QuerySnapshot,
  OrderByDirection,
  DocumentReference,
  Timestamp,
  FieldValue
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

//TO Address: async in ChatGPT
const getCollection = async (
  collectionName: string,
  orderQuery?: [string, OrderByDirection]
): Promise<QuerySnapshot<DocumentData>> => {
  let q = query(collection(db, collectionName))

  if (orderQuery && orderQuery.length === 2) {
    q = query(
      collection(db, collectionName),
      orderBy(orderQuery[0], orderQuery[1])
    )
  }
  return getDocs(q)
}

// For adding NEW docs.
// DO NOT use for updating docs unless you specify a docId.
//TO Address: async in ChatGPT
const postDoc = async (
  collectionName: string,
  docData: DocumentData,
  docId?: string
): Promise<void | DocumentReference<DocumentData>> => {
  // For if we provide a custom docId
  if (docId) {
    return setDoc(doc(db, collectionName, docId), docData)
    // If we did not provide a custom docId, we just reference a collection and
    // when the doc is added, it will be generated with a random Id.
  } else {
    return addDoc(collection(db, collectionName), docData)
  }
}

const uploadToStorage = async (
  path: string,
  file: Blob | Uint8Array | ArrayBuffer
): Promise<string> => {
  const storageRef = ref(storage, path) //Path could be letters/Seraya Bi Annual Letter.pdf (they allow spaces I think)

  //Uploads the file to storage
  const snapshot = await uploadBytes(storageRef, file)

  //TODO: Also may have to handle errors here if there are any, or maybe if they are thrown
  //useQuery will catch them, idk

  //Get download URL after sending and then return that download URL
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}

// Returns current firestore serverTimestamp (unlike regular firebase firestore Timestamp,
// it cannot be read or converted to a date until it is fetched back from firestore)
const getFirestoreTimestamp = (): FieldValue => {
  return serverTimestamp()
}

// Converts to javascript timestamp
const convertFirestoreTimestamp = (timestamp: Timestamp): Date => {
  return timestamp.toDate()
}

export {
  getCollection,
  postDoc,
  uploadToStorage,
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
