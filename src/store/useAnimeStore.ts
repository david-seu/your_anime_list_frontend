import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import Anime from '../data/Anime'

interface AnimeStore {
  animeList: Anime[]
  addAnime: (anime: Anime) => void
  deleteAnime: (id: number) => void
  updateAnime: (anime: Anime) => void
}

export const useAnimeStore = create<AnimeStore>()(
  persist(
    (set, get) => ({
      animeList: [], // Add the missing property 'animeList'
      addAnime: (anime: Anime) =>
        set({ animeList: [...get().animeList, anime] }),
      deleteAnime: (id: number) =>
        set({ animeList: get().animeList.filter((anime) => anime.id !== id) }),
      updateAnime: (anime: Anime) =>
        set({
          animeList: get().animeList.map((a) =>
            a.id === anime.id ? anime : a
          ),
        }),
    }),
    {
      name: 'anime-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAnimeStore
