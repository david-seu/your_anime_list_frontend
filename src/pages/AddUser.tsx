import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import AddUserForm from '../components/AddUserForm'
import User from '../data/User'

export default function AddUser() {
  const user: User = useUserStore((state) => state.currentUser)!
  const navigate = useNavigate()

  useEffect(() => {
    if (!user && (user as User).role !== 'ROLE_ADMIN') {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="container-fluid">
      <div className="form-container">
        <AddUserForm />
      </div>
    </div>
  )
}
