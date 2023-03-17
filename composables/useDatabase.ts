import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query
} from 'firebase/firestore'

import { toTimestamp } from '~/utils/formats'

export default function () {
  const { $firestore } = useNuxtApp()
  const storeLoader = useLoader()

  const database = {
    async add (col: string, document: any) {
      try {
        const ref = collection($firestore, col)

        document.createdAt = toTimestamp(new Date().toDateString())

        const doc = await addDoc(ref, document)

        return { success: true, data: { id: doc?.id } }
      } catch (error) {
        throw createError({ statusCode: 400, message: 'failed to add document' })
      }
    },

    async get (col: string, length = 1000) {
      try {
        storeLoader.startLoading()

        const ref = collection($firestore, col)

        const { docs } = await getDocs(
          query(ref, limit(length))
        )

        const data = docs.map((doc) => {
          const data = doc.data()

          data.id = doc.id

          return data
        })

        storeLoader.endLoading()

        return { success: true, data }
      } catch (error) {
        storeLoader.endLoading()

        throw createError({ statusCode: 400, message: 'failed to get documents' })
      }
    },

    async delete (col: string, id: string) {
      try {
        const ref = doc($firestore, col, id)

        await deleteDoc(ref)

        return { success: true, data: null }
      } catch (error) {
        throw createError({ statusCode: 400, message: 'failed to delete document' })
      }
    }
  }

  return database
}
