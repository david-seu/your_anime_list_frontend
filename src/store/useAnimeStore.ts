import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import Anime from '../data/Anime'

interface AnimeStore {
  animeList: Anime[]
  idList: number[]
  page: number
  addAnime: (anime: Anime) => void
  deleteAnime: (id: number) => void
  updateAnime: (anime: Anime) => void
  setIdList: (idList: number[]) => void
  setAnimeList: (animeList: Anime[]) => void
  getAnime: (id: number) => Anime
  getAllAnime: () => Anime[]
  getDirtyAnime: () => Anime[]
  nextPage: () => void
  prevPage: () => void
}

export const useAnimeStore = create<AnimeStore>()(
  persist(
    (set, get) => ({
      animeList: [],
      idList: [],
      page: 0,
      nextPage: () => set({ page: get().page + 1 }),
      prevPage: () => set({ page: get().page - 1 }),
      setIdList: (idList: number[]) => set({ idList }),
      setAnimeList: (animeList: Anime[]) => set({ animeList }),
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
      getAnime: (id: number) =>
        get().animeList.find((anime) => anime.id === id)!,
      getAllAnime: () =>
        get().animeList.filter(
          (anime) => anime.persisted === true || anime.checked === false
        ),
      getDirtyAnime: () => get().animeList.filter((anime) => !anime.persisted),
    }),
    {
      name: 'anime-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAnimeStore
