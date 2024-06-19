import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmLoginForm from '../components/ConfirmLoginForm'
import useUserStore from '../store/useUserStore'

export default function ConfirmLogin() {
  const user = useUserStore((state) => state.currentUser)!
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="container-fluid">
      <div className="form-container">
        <ConfirmLoginForm />
      </div>
    </div>
  )
}
