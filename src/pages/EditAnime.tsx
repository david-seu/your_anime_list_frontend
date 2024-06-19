/* eslint-disable import/no-named-as-default */
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useParams } from 'react-router-dom'
import EditAnimeForm from '../components/EditAnimeForm'
import useUserStore from '../store/useUserStore'

export default function EditAnime(): JSX.Element {
  const id = useParams<{ id: string }>().id as string
  console.log(id)

  const user = useUserStore((state) => state.currentUser)!
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role === 'ROLE_USER') {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="home-container">
      <EditAnimeForm initialAnimeId={Number(id)} />
    </div>
  )
}
