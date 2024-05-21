import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddAnime from './pages/AddAnime'
import EditAnime from './pages/EditAnime'
import ViewAnime from './pages/ViewAnime'
import AddEpisode from './pages/AddEpisode'
import EditEpisode from './pages/EditEpisode'
import ViewEpisode from './pages/ViewEpsiode'
import Register from './pages/Register'
import Login from './pages/Login'
import ConfirmRegister from './pages/ConfirmRegister'
import ConfirmLogin from './pages/ConfirmLogin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/confirm" element={<ConfirmLogin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/confirm" element={<ConfirmRegister />} />
      <Route path="/addAnime" element={<AddAnime />} />
      <Route path="/editAnime/:id" element={<EditAnime />} />
      <Route path="/viewAnime/:id" element={<ViewAnime />} />
      <Route path="/addEpisode" element={<AddEpisode />} />
      <Route path="/editEpisode/:id" element={<EditEpisode />} />
      <Route path="/viewEpisode/:id" element={<ViewEpisode />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default WrappedApp
