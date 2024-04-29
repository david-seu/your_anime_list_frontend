import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import Episode from '../data/Episode'

interface EpisodeStore {
  episodeList: Episode[]
  idList: number[]
  page: number
  addEpisode: (episode: Episode) => void
  deleteEpisode: (id: number) => void
  updateEpisode: (episode: Episode) => void
  setEpisodeList: (episodeList: Episode[]) => void
  setIdList: (idList: number[]) => void
  getEpisode: (id: number) => Episode
  getAllEpisodes: () => Episode[]
  nextPage: () => void
  prevPage: () => void
}

export const useEpisodeStore = create<EpisodeStore>()(
  persist(
    (set, get) => ({
      episodeList: [],
      idList: [],
      page: 0,
      nextPage: () => set({ page: get().page + 1 }),
      prevPage: () => set({ page: get().page - 1 }),
      setEpisodeList: (episodeList: Episode[]) => set({ episodeList }),
      setIdList: (idList: number[]) => set({ idList }),
      addEpisode: (episode: Episode) =>
        set({ episodeList: [...get().episodeList, episode] }),
      deleteEpisode: (id: number) =>
        set({
          episodeList: get().episodeList.filter((episode) => episode.id !== id),
        }),
      updateEpisode: (episode: Episode) =>
        set({
          episodeList: get().episodeList.map((e) =>
            e.id === episode.id ? episode : e
          ),
        }),
      getEpisode: (id: number) =>
        get().episodeList.find((episode) => episode.id === id)!,
      getAllEpisodes: () => get().episodeList,
    }),
    {
      name: 'episode-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useEpisodeStore
