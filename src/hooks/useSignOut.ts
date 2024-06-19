import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line import/no-named-as-default
import useUserStore from '../store/useUserStore'
import User from '../data/User'

const useSignOut = () => {
  const signOutStore = useUserStore((state) => state.signOut)
  const navigate = useNavigate()
  const signIn = useUserStore((state) => state.signIn)

  const signOut = () => {
    signOutStore()
    const user: User = {
      id: -1,
      username: 'anynomous',
      password: 'anynomous',
      email: 'anynomous',
      role: 'anynomous',
      enabled: true,
      token: 'anynomous',
      checked: false,
    }
    signIn(user)
    navigate('/')
  }

  return signOut
}

export default useSignOut
