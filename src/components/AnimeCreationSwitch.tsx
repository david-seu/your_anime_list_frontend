import * as React from 'react'
import Switch from '@mui/material/Switch'
import { AlertColor, FormControlLabel, FormGroup } from '@mui/material'
import { useState } from 'react'
import useStartAnimeCreation from '../hooks/useStartAnimeCreation'
import useStopAnimeCreation from '../hooks/useStopAnimeCreation'
import CustomizedSnackbars from './CustomizedSnackBars'

export default function AnimeCreationSwitch() {
  const [checked, setChecked] = useState(false)

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const startAnimeCreation = useStartAnimeCreation({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })
  const stopAnimeCreation = useStopAnimeCreation({
    setSnackbarType,
    setSnackbarMessage,
    setSnackbarOpen,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    if (event) {
      startAnimeCreation()
    } else {
      stopAnimeCreation()
    }
  }

  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Allow anime creation"
        />
      </FormGroup>
      <CustomizedSnackbars
        open={snackbarOpen}
        type={snackbarType as AlertColor}
        message={snackbarMessage}
        handleClose={() => setSnackbarOpen(false)}
      />
    </div>
  )
}
