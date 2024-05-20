import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import User from '../data/User'

interface UserStore {
  user: User | null
  signIn: (user: User) => void
  signOut: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      signIn: (user: User) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useUserStore
