/* eslint-disable import/no-named-as-default */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material'
import ExpandLinkButton from '../components/ExpandLinkButton'
import useUserStore from '../store/useUserStore'
import useFetchUserById from '../hooks/useFetchUserById'

export default function ViewUser(): JSX.Element {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [role, setRole] = useState<string>('')

  const { id } = useParams<{ id: string }>() as unknown as { id: string }

  const currentUser = useUserStore((state) => state.currentUser)!
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  useFetchUserById({
    id,
    setUsername,
    setEmail,
    setPassword,
    setRole,
  })

  return (
    <div className="container-fluid">
      <Box
        sx={{
          backgroundColor: '#0B3954',
          display: 'flex',
          justifyContent: 'centre',
          borderRadius: '2',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
        }}
      >
        <ExpandLinkButton to={`/editUser/${id}`}>Edit</ExpandLinkButton>
        <Container className="view--container" sx={{ marginTop: 4 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Username: {username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Password: {password}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Role: {role}
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  )
}
