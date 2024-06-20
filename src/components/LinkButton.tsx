import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

interface LinkButtonProps {
  to: string
  children: React.ReactNode
}

const StyledButton = styled(Button)({
  boxShadow: '0px 0px 10px 0px #1a1a1a',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
  backgroundColor: '#1a1a1a',
  color: '#39A0ED',
  transition: 'all 0.3s ease',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#39A0ED',
    color: '#1a1a1a',
    boxShadow: '0px 0px 5px 4px rgba(255, 255, 255, 0.05)',
  },
})

export default function LinkButton({ to, children }: LinkButtonProps) {
  return (
    <Link to={to}>
      <StyledButton>{children}</StyledButton>
    </Link>
  )
}
