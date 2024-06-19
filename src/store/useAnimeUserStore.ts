import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import AnimeUser from '../data/AnimeUser'

interface AnimeUserStore {
  animeList: AnimeUser[]
  page: number
  hasMore: boolean
  title: string
  sortDirection: string
  season: string | null
  year: number | null
  genres: string[]
  tags: string[]
  studios: string[]
  type: string[]
  status: string | null
  orderBy: string | null
  appendAnimeList: (animeList: AnimeUser[]) => void
  addAnime: (anime: AnimeUser) => void
  deleteAnime: (id: number) => void
  updateAnime: (anime: AnimeUser) => void
  setAnimeList: (animeList: AnimeUser[]) => void
  setHasMore: (hasMore: boolean) => void
  getAnime: (id: number) => AnimeUser
  getAllAnime: () => AnimeUser[]
  nextPage: () => void
  prevPage: () => void
  setPage: (page: number) => void
  setTitle: (title: string) => void
  setSortDirection: (sortDirection: string) => void
  setSeason: (season: string | null) => void
  setYear: (year: number | null) => void
  setGenres: (genres: string[]) => void
  setTags: (tags: string[]) => void
  setStudios: (studios: string[]) => void
  setType: (type: string[]) => void
  setStatus: (status: string | null) => void
  setOrderBy: (orderBy: string | null) => void
}

export const useAnimeUserStore = create<AnimeUserStore>()(
  persist(
    (set, get) => ({
      animeList: [],
      page: 0,
      hasMore: true,
      title: '',
      sortDirection: 'desc',
      season: null,
      year: null,
      genres: [],
      tags: [],
      studios: [],
      type: [],
      status: null,
      orderBy: null,
      setSortDirection: (sort: string) => set({ sortDirection: sort }),
      setTitle: (title: string) => set({ title }),
      nextPage: () => {
        console.log(get().page)
        set({ page: get().page + 1 })
      },
      prevPage: () => set({ page: get().page - 1 }),
      setAnimeList: (animeList: AnimeUser[]) => set({ animeList }),
      setHasMore: (hasMore: boolean) => set({ hasMore }),
      addAnime: (anime: AnimeUser) =>
        set({ animeList: [anime, ...get().animeList] }),
      deleteAnime: (id: number) =>
        set({ animeList: get().animeList.filter((anime) => anime.id !== id) }),
      updateAnime: (anime: AnimeUser) =>
        set({
          animeList: get().animeList.map((a) =>
            a.id === anime.id ? anime : a
          ),
        }),
      getAnime: (id: number) =>
        get().animeList.find((anime) => anime.id === id)!,
      getAllAnime: () => get().animeList,
      setPage: (page: number) => set({ page }),
      appendAnimeList: (animeList: AnimeUser[]) =>
        set({ animeList: [...get().animeList, ...animeList] }),
      setSeason: (season: string | null) => set({ season }),
      setYear: (year: number | null) => set({ year }),
      setGenres: (genres: string[]) => set({ genres }),
      setTags: (tags: string[]) => set({ tags }),
      setStudios: (studios: string[]) => set({ studios }),
      setType: (type: string[]) => set({ type }),
      setStatus: (status: string | null) => set({ status }),
      setOrderBy: (orderBy: string | null) => set({ orderBy }),
    }),
    {
      name: 'anime-user-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAnimeUserStore
