import { db } from "../firebase"
import { collection, getDocs, setDoc, doc } from "firebase/firestore"

const getCollection = (collectionName) => {
  return getDocs(collection(db, collectionName))
}

const postDoc = (collectionName, docId, dataToStore) => {
  // For if we provide a custom docId such as "emailList" in a collection called Newsletter
  // kinda dumb but that's the way we're doing things)
  if (docId) {
    return setDoc(doc(db, collectionName, docId), dataToStore)
    // If we did not provide a custom docId, we just reference a collection and when the doc is
    // added, it will be generated with a random Id.
  } else {
    return setDoc(collection(collectionName), dataToStore)
  }
}

export { getCollection, postDoc }
