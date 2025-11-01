import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'

const REVIEWS = 'reviews'

export async function listReviewsForItem({ itemId, itemType }) {
  // Avoid composite index requirement by not ordering in Firestore; sort on client instead
  const q = query(
    collection(db, REVIEWS),
    where('itemId', '==', itemId),
    where('itemType', '==', itemType)
  )
  const snap = await getDocs(q)
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  return items.sort((a, b) => {
    const ta = a.createdAt?.toMillis?.() ?? 0
    const tb = b.createdAt?.toMillis?.() ?? 0
    return tb - ta
  })
}

export async function createReview({ itemId, itemType, rating, text, user }) {
  return addDoc(collection(db, REVIEWS), {
    itemId,
    itemType,
    rating,
    text,
    userId: user.uid,
    userEmail: user.email,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateReview({ id, rating, text }) {
  return updateDoc(doc(db, REVIEWS, id), {
    rating,
    text,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteReviewById(id) {
  return deleteDoc(doc(db, REVIEWS, id))
}
