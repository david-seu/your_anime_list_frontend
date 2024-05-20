import User from '../data/User'

interface AuthHeaderProps {
  user: User
}

export default function authHeader({ user }: AuthHeaderProps) {
  if (user && user.authorization) {
    return { Authorization: `Bearer ${user.authorization}` }
  }
  return {}
}
