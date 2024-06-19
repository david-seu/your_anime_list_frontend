import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import Genre from '../data/Genre'

interface GenreStore {
  genre: Genre[]
  setGenre: (genre: Genre[]) => void
}

export const useGenreStore = create<GenreStore>()(
  persist(
    (set) => ({
      genre: [],
      setGenre: (genre: Genre[]) => set({ genre }),
    }),
    {
      name: 'genre-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useGenreStore
