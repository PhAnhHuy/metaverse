import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/Authentication/Login';
import Canvas from './pages/Canvas';
import Register from './pages/Authentication/Register';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Canvas />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
