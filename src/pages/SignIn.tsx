import 'bootstrap/dist/css/bootstrap.min.css'
import SignInForm from '../components/SignInForm'
import '../App.css'

export default function SignIn() {
  return (
    <div className="container-fluid">
      <div className="form-container">
        <h3>Login</h3>
        <br />
        <SignInForm />
      </div>
    </div>
  )
}
