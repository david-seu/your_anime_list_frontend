import { Button, Form } from 'react-bootstrap'

interface EditEpisodeFormProps {
  title: string
  number: number
  season: number
  score: number
  watched: boolean
  setTitle: (title: string) => void
  setNumber: (number: number) => void
  setSeason: (season: number) => void
  setScore: (score: number) => void
  setWatched: (watched: boolean) => void
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => void
}

export default function EditEpisodeForm({
  title,
  number,
  season,
  score,
  watched,
  setTitle,
  setNumber,
  setSeason,
  setScore,
  setWatched,
  handleSubmit,
}: EditEpisodeFormProps) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSore">
        <Form.Label className="">Number</Form.Label>
        <Form.Control
          type="number"
          value={number}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNumber(Number(e.target.value))
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSore">
        <Form.Label className="">Season</Form.Label>
        <Form.Control
          type="number"
          value={season}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSeason(Number(e.target.value))
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSore">
        <Form.Label className="">Score</Form.Label>
        <Form.Control
          type="number"
          value={score}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setScore(Number(e.target.value))
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formWatched">
        <Form.Check
          type="checkbox"
          label="Watched"
          checked={watched}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWatched(e.target.checked)
          }
        />
      </Form.Group>
      <Button onClick={(e) => handleSubmit(e)} type="submit">
        Submit
      </Button>
    </Form>
  )
}
