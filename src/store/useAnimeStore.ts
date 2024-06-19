import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import Anime from '../data/Anime'

interface AnimeStore {
  animeList: Anime[]
  top100AnimeList: Anime[]
  mostPopularAnimeList: Anime[]
  mostPopularAnimeThisSeasonList: Anime[]
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
  setTop100AnimeList: (animeList: Anime[]) => void
  setMostPopularAnimeList: (animeList: Anime[]) => void
  setMostPopularAnimeThisSeasonList: (animeList: Anime[]) => void
  appendAnimeList: (animeList: Anime[]) => void
  addAnime: (anime: Anime) => void
  deleteAnime: (id: number) => void
  updateAnime: (anime: Anime) => void
  setAnimeList: (animeList: Anime[]) => void
  setHasMore: (hasMore: boolean) => void
  getAnime: (id: number) => Anime
  getAllAnime: () => Anime[]
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

export const useAnimeStore = create<AnimeStore>()(
  persist(
    (set, get) => ({
      animeList: [],
      top100AnimeList: [],
      mostPopularAnimeList: [],
      mostPopularAnimeThisSeasonList: [],
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
      setTop100AnimeList: (top100AnimeList: Anime[]) =>
        set({ top100AnimeList }),
      setMostPopularAnimeList: (mostPopularAnimeList: Anime[]) =>
        set({ mostPopularAnimeList }),
      setMostPopularAnimeThisSeasonList: (
        mostPopularAnimeThisSeasonList: Anime[]
      ) => set({ mostPopularAnimeThisSeasonList }),
      setSortDirection: (sort: string) => set({ sortDirection: sort }),
      setTitle: (title: string) => set({ title }),
      nextPage: () => {
        console.log(get().page)
        set({ page: get().page + 1 })
      },
      prevPage: () => set({ page: get().page - 1 }),
      setAnimeList: (animeList: Anime[]) => set({ animeList }),
      setHasMore: (hasMore: boolean) => set({ hasMore }),
      addAnime: (anime: Anime) =>
        set({ animeList: [anime, ...get().animeList] }),
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
      getAllAnime: () => get().animeList,
      setPage: (page: number) => set({ page }),
      appendAnimeList: (animeList: Anime[]) =>
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
      name: 'anime-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAnimeStore
