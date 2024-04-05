import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Edit from './pages/Edit'
import View from './pages/View'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/view/:id" element={<View />} />
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
