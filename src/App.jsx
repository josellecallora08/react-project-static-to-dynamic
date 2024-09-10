import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing_Page from './components/Landing_Page/Landing_Page.jsx'
import Login from './components/Login/Login.jsx'
import Sign_Up from './components/Sign_Up/Sign_Up.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing_Page />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Sign_Up />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
