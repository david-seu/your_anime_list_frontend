import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddAnime from './pages/AddAnime'
import EditAnime from './pages/EditAnime'
import ViewAnime from './pages/ViewAnime'
import AddEpisode from './pages/AddEpisode'
import EditEpisode from './pages/EditEpisode'
import ViewEpisode from './pages/ViewEpsiode'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ConfirmRegister from './pages/ConfirmRegister'
import ConfirmLogin from './pages/ConfirmLogin'
import AddUser from './pages/AddUser'
import EditUser from './pages/EditUser'
import ViewUser from './pages/ViewUser'
import Stats from './pages/Stats'
import CustomNavBar from './components/Navbar'
import Anime from './pages/Anime'
import YourAnimeList from './pages/YourAnimeList'
import Users from './pages/Users'

function App() {
  return (
    <div>
      <CustomNavBar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/confirm" element={<ConfirmLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/confirm" element={<ConfirmRegister />} />
        <Route path="/addAnime" element={<AddAnime />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/anime/edit/:id" element={<EditAnime />} />
        <Route path="/anime/:id" element={<ViewAnime />} />
        <Route path="/addEpisode" element={<AddEpisode />} />
        <Route path="/editEpisode/:id" element={<EditEpisode />} />
        <Route path="/viewEpisode/:id" element={<ViewEpisode />} />
        <Route path="/user/add" element={<AddUser />} />
        <Route path="/editUser/:id" element={<EditUser />} />
        <Route path="/viewUser/:id" element={<ViewUser />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/anime/mine" element={<YourAnimeList />} />
        <Route path="/user" element={<Users />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
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
