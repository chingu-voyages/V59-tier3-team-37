import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SessionState = {
  role: 'student' | 'teacher' | null
  sessionStarted: boolean

  setRole: (role: 'student' | 'teacher') => void
  startSession: () => void
  resetSession: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      role: null,
      sessionStarted: false,

      setRole: (role) => set({ role }),
      startSession: () => set({ sessionStarted: true }),
      resetSession: () => set({ role: null, sessionStarted: false }),
    }),
    {
      name: 'session-store', // saved in localStorage
    }
  )
)
