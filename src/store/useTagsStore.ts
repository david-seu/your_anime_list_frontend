import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import Tag from '../data/Tag'

interface TagsStore {
  tags: Tag[]
  setTags: (tags: Tag[]) => void
}

export const useTagStore = create<TagsStore>()(
  persist(
    (set) => ({
      tags: [],
      setTags: (tags: Tag[]) => set({ tags }),
    }),
    {
      name: 'tag-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useTagStore
