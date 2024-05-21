import { Form, Button } from 'react-bootstrap'

interface ConfirmLoginFormProps {
  setCode: (code: number) => void
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function ConfirmLoginForm({
  setCode,
  handleSubmit,
}: ConfirmLoginFormProps) {
  return (
    <Form className="gap-2">
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>6-digit Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter 6-digit code"
          required
          onChange={(e) => setCode(Number(e.target.value))}
        />
      </Form.Group>
      <Button onClick={(e) => handleSubmit(e)} type="submit">
        Login
      </Button>
    </Form>
  )
}
