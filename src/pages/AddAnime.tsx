import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import EditAnimeForm from '../components/EditAnimeForm'

export default function AddAnime() {
  const user = useUserStore((state) => state.currentUser)!
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role === 'ROLE_USER') {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="home-container">
      <EditAnimeForm initialAnimeId="new" />
    </div>
  )
}
