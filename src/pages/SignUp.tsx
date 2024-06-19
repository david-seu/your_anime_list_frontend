import 'bootstrap/dist/css/bootstrap.min.css'
import SignUpForm from '../components/SignUpForm'
import '../App.css'

export default function SignUp() {
  return (
    <div className="container-fluid">
      <div className="form-container">
        <h3>Register to YourAnimeList</h3>
        <br />
        <SignUpForm />
      </div>
    </div>
  )
}
