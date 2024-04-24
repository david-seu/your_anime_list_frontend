import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddAnime from './pages/AddAnime'
import EditAnime from './pages/EditAnime'
import ViewAnime from './pages/ViewAnime'
import AddEpisode from './pages/AddEpisode'
import EditEpisode from './pages/EditEpisode'
import ViewEpisode from './pages/ViewEpsiode'
import {
  NetworkStatusIndicator,
  ServerkStatusIndicator,
} from './components/StatusIndicator'

function App() {
  return (
    <div>
      {/* <NetworkStatusIndicator /> */}
      <ServerkStatusIndicator />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addAnime" element={<AddAnime />} />
        <Route path="/editAnime/:id" element={<EditAnime />} />
        <Route path="/viewAnime/:id" element={<ViewAnime />} />
        <Route path="/addEpisode" element={<AddEpisode />} />
        <Route path="/editEpisode/:id" element={<EditEpisode />} />
        <Route path="/viewEpisode/:id" element={<ViewEpisode />} />
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
