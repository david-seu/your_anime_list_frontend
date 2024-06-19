import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from '@mui/material'
import AnimeUser from '../data/AnimeUser'

interface EditAnimeDialogProps {
  openDialog: boolean
  selectedAnime: AnimeUser
  setSelectedAnime: (anime: AnimeUser) => void
  handleCloseDialog: () => void
  handleSave: () => void
}

export default function EditAnimeDialog({
  openDialog,
  selectedAnime,
  setSelectedAnime,
  handleCloseDialog,
  handleSave,
}: EditAnimeDialogProps) {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle
        style={{
          backgroundColor: '#0B3954',
          color: '#39A0ED',
        }}
      >
        Edit Anime
      </DialogTitle>
      <DialogContent style={{ backgroundColor: '#0B3954', color: '#39A0ED' }}>
        <DialogContentText style={{ color: '#39A0ED' }}>
          Edit the details of the selected anime.
        </DialogContentText>
        <TextField
          margin="dense"
          label="Score"
          type="number"
          fullWidth
          value={selectedAnime.score}
          onChange={(e) =>
            setSelectedAnime({
              ...selectedAnime,
              score: parseFloat(e.target.value),
            })
          }
        />
        <TextField
          margin="dense"
          label="Start Date"
          type="date"
          fullWidth
          value={
            selectedAnime.startDate instanceof Date
              ? selectedAnime.startDate.toISOString().split('T')[0]
              : ''
          }
          onChange={(e) =>
            setSelectedAnime({
              ...selectedAnime,
              startDate: new Date(e.target.value),
            })
          }
        />
        <TextField
          margin="dense"
          label="End Date"
          type="date"
          fullWidth
          value={
            selectedAnime.endDate instanceof Date
              ? selectedAnime.endDate.toISOString().split('T')[0]
              : ''
          }
          onChange={(e) =>
            setSelectedAnime({
              ...selectedAnime,
              endDate: new Date(e.target.value),
            })
          }
        />
        <Select
          margin="dense"
          label="Status"
          fullWidth
          value={selectedAnime.status}
          onChange={(e) =>
            setSelectedAnime({ ...selectedAnime, status: e.target.value })
          }
          style={{ color: '#39A0ED' }}
        >
          <MenuItem value="WATCHING">Watching</MenuItem>
          <MenuItem value="COMPLETED">Completed</MenuItem>
          <MenuItem value="PLAN_TO_WATCH">Plan To Watch</MenuItem>
          <MenuItem value="DROPPED">Dropped</MenuItem>
          <MenuItem value="ON_HOLD">On Hold</MenuItem>
        </Select>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedAnime.isFavorite}
              onChange={(e) =>
                setSelectedAnime({
                  ...selectedAnime,
                  isFavorite: e.target.checked,
                })
              }
            />
          }
          label="Favorite"
        />
      </DialogContent>
      <DialogActions style={{ backgroundColor: '#0B3954' }}>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
