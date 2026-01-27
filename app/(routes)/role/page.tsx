'use client'

import { useSessionStore } from '@/store/useSessionStore'
import { selectRole as selectRoleAction } from './actions'
import { Role, ROLES } from '@/types'

export default function RolePage() {
  const setRole = useSessionStore((s) => s.setRole)
  const startSession = useSessionStore((s) => s.startSession)

  const selectRole = (role: Role) => {
    setRole(role)
    selectRoleAction(role)
    startSession()
  }

  return (
    <div>
      <h1>Select role</h1>

      <button 
      className='bg-red-300 p-2 m-3 rounded'
      type='button'
      onClick={() => selectRole(ROLES.FRONTEND)}>
        Frontend
      </button>

      <button 
      className='bg-red-300 p-2 m-3 rounded'
      type='button'
      onClick={() => selectRole(ROLES.BACKEND)}>
        Backend
      </button>
    </div>
  )
}
