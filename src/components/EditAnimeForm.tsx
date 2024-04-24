import { Button, Form } from 'react-bootstrap'

interface EditAnimeFormProps {
  title: string
  score: number
  watched: boolean
  setTitle: (title: string) => void
  setScore: (score: number) => void
  setWatched: (watched: boolean) => void
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function EditAnimeForm({
  title,
  score,
  watched,
  setTitle,
  setScore,
  setWatched,
  handleSubmit,
}: EditAnimeFormProps) {
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
