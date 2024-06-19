import styled from '@emotion/styled'
import { Button } from 'react-bootstrap'

const StyledButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  lineHeight: 1.5,
  backgroundColor: '#1a1a1a',
  color: '#39A0ED',
  borderStyle: 'none',
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
