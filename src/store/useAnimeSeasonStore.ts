import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'

interface AnimeSeasonStore {
  animeSeason: string[]
  setAnimeSeason: (animeSeason: string[]) => void
}

export const useAnimeSeasonStore = create<AnimeSeasonStore>()(
  persist(
    (set) => ({
      animeSeason: [],
      setAnimeSeason: (animeSeason: string[]) => set({ animeSeason }),
    }),
    {
      name: 'genre-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAnimeSeasonStore
