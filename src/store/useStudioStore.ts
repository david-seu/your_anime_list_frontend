import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import Studio from '../data/Studio'

interface StudioStore {
  studio: Studio[]
  setStudio: (studio: Studio[]) => void
}

export const useStudioStore = create<StudioStore>()(
  persist(
    (set) => ({
      studio: [],
      setStudio: (studio: Studio[]) => set({ studio }),
    }),
    {
      name: 'studio-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useStudioStore
