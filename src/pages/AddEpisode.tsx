import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import ExpandLinkButton from '../components/ExpandLinkButton'
import AddEpisodeForm from '../components/AddEpisodeForm'
import useUserStore from '../store/useUserStore'

export default function AddEpisode() {
  const user = useUserStore((state) => state.currentUser)!
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div>
      <ExpandLinkButton to="/home">Back</ExpandLinkButton>
      <div className="add--container">
        <AddEpisodeForm />
      </div>
    </div>
  )
}
