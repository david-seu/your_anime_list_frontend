import { Form, Button } from 'react-bootstrap'

interface LoginFormProps {
  setUsername: (username: string) => void
  setPassword: (password: string) => void
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function LoginForm({
  setUsername,
  setPassword,
  handleSubmit,
}: LoginFormProps) {
  return (
    <Form className="gap-2">
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button onClick={(e) => handleSubmit(e)} type="submit">
        Login
      </Button>
    </Form>
  )
}
