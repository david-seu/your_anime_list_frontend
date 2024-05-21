import { Form, Button } from 'react-bootstrap'

interface ConfirmRegisterFormProps {
  setToken: (token: string) => void
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function ConfirmRegisterForm({
  setToken,
  handleSubmit,
}: ConfirmRegisterFormProps) {
  return (
    <Form className="gap-2">
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Token</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter confirmation token"
          required
          onChange={(e) => setToken(e.target.value)}
        />
      </Form.Group>
      <Button onClick={(e) => handleSubmit(e)} type="submit">
        Login
      </Button>
    </Form>
  )
}
