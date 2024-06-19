/* eslint-disable import/no-named-as-default */
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useParams } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import EditUserForm from '../components/EditUserForm'

export default function EditUser(): JSX.Element {
  const id = useParams<{ id: string }>().id as string

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
        <EditUserForm id={id} />
      </div>
    </div>
  )
}
