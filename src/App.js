import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Add from './components/Add';
import Edit from './components/Edit';
import View from './components/View';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/add" Component={Add} />
          <Route path="/edit/:id" Component={Edit} />
          <Route path="/view/:id" Component={View} />
          <Route path="*" element={<div>404 Not Found</div>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
