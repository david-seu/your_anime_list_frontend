import styled from '@emotion/styled'
import { Button } from 'react-bootstrap'
import { Add as AddIcon } from '@mui/icons-material'

const StyledButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  lineHeight: 1.5,
  backgroundColor: '#1a1a1a',
  color: '#39A0ED',
  borderColor: '#39A0ED',
  borderStyle: 'solid',
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
    fontSize: 16,
    padding: '6px 12px',
    borderStyle: 'none',
  },
})

export default StyledButton
