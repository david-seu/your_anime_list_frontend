import { Form, Button } from 'react-bootstrap'

interface AddAnimeFormProps {
  setTitle: (title: string) => void
  setScore: (score: number) => void
  setWatched: (watched: boolean) => void
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function AddAnimeForm({
  setTitle,
  setScore,
  setWatched,
  handleSubmit,
}: AddAnimeFormProps) {
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
        <Form.Label>Score</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter score"
          required
          onChange={(e) => setScore(Number(e.target.value))}
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
