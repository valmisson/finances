import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  type DocumentData,
} from 'firebase/firestore'

import { toTimestamp } from '~/utils/formats'

export default function () {
  const { $firestore } = useNuxtApp()
  const dataLoader = useDataLoader()

  const database = {
    async add (col: string, document: DocumentData) {
      try {
        const ref = collection($firestore, col)

        document.createdAt = toTimestamp(new Date().toDateString())

        const doc = await addDoc(ref, document)

        return { success: true, data: { id: doc?.id } }
      } catch {
        throw createError({ statusCode: 400, message: 'failed to add document' })
      }
    },

    async update (col: string, id: string, document: DocumentData) {
      try {
        const ref = doc($firestore, col, id)

        const updateAt = toTimestamp(new Date().toDateString())

        document.updateAt = updateAt

        await updateDoc(ref, document)

        return { success: true, data: { updateAt } }
      } catch {
        throw createError({ statusCode: 400, message: 'failed to update document' })
      }
    },

    async getOne<T> (col: string, id: string) {
      try {
        dataLoader.startLoading()

        const ref = doc($firestore, col, id)

        const result = await getDoc(ref)

        if (result.exists()) {
          const data = result.data() as T

          return { success: true, data }
        }

        return { success: false, data: null }
      } catch {
        throw createError({ statusCode: 400, message: 'failed to get document' })
      } finally {
        dataLoader.endLoading()
      }
    },

    async getAll (col: string, length = 1000) {
      try {
        dataLoader.startLoading()

        const ref = collection($firestore, col)

        const { docs } = await getDocs(
          query(ref, limit(length))
        )

        const data = docs.map((doc) => {
          const data = doc.data()

          data.id = doc.id

          return data
        })

        return { success: true, data }
      } catch {
        throw createError({ statusCode: 400, message: 'failed to get all documents' })
      } finally {
        dataLoader.endLoading()
      }
    },

    async delete (col: string, id: string) {
      try {
        const ref = doc($firestore, col, id)

        await deleteDoc(ref)

        return { success: true, data: null }
      } catch {
        throw createError({ statusCode: 400, message: 'failed to delete document' })
      }
    }
  }

  return database
}
