import { Form, Button } from 'react-bootstrap'

interface AddEpisodeFormProps {
  setTitle: (title: string) => void
  setNumber: (number: number) => void
  setSeason: (season: number) => void
  setScore: (score: number) => void
  setWatched: (watched: boolean) => void
  setAnimeTitle: (animeTitle: string) => void
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function AddEpisodeForm({
  setTitle,
  setNumber,
  setSeason,
  setScore,
  setWatched,
  setAnimeTitle,
  handleSubmit,
}: AddEpisodeFormProps) {
  return (
    <Form className="gap-2">
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAge">
        <Form.Label>Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter episode number"
          required
          onChange={(e) => setNumber(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAge">
        <Form.Label>Season</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter season number"
          required
          onChange={(e) => setSeason(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAge">
        <Form.Label>Score</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter score"
          required
          onChange={(e) => setScore(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAge">
        <Form.Label>Anime</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the title of the anime it belongs"
          required
          onChange={(e) => setAnimeTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formWatched">
        <Form.Check
          type="checkbox"
          label="Watched"
          required
          onChange={(e) => setWatched(e.target.checked)}
        />
      </Form.Group>
      <Button onClick={(e) => handleSubmit(e)} type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default AddEpisodeForm
