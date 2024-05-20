import { Form, Button } from 'react-bootstrap'

interface AddUserFormProps {
  setUsername: (username: string) => void
  setPassword: (password: string) => void
  setEmail: (email: string) => void
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function AddAnimeForm({
  setUsername,
  setPassword,
  setEmail,
  handleSubmit,
}: AddUserFormProps) {
  return (
    <Form className="gap-2">
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          onChange={(e) => setEmail(e.target.value)}
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
        Submit
      </Button>
    </Form>
  )
}
