import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import Episode from '../data/Episode'

interface EpisodeStore {
  episodeList: Episode[]
  addEpisode: (episode: Episode) => void
  deleteEpisode: (id: number) => void
  updateEpisode: (episode: Episode) => void
  setEpisodeList: (episodeList: Episode[]) => void
  getEpisode: (id: number) => Episode
}

export const useEpisodeStore = create<EpisodeStore>()(
  persist(
    (set, get) => ({
      episodeList: [],
      setEpisodeList: (episodeList: Episode[]) => set({ episodeList }),
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
    }),
    {
      name: 'episode-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useEpisodeStore
