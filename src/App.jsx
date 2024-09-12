import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing_Page from './components/Landing_Page/Landing_Page.jsx'
import Login from './components/Login/Login.jsx'
import BookingConsultation from "./components/BookingConsultation/BookingConsultation.jsx";
import Sign_Up from './components/Sign_Up/Sign_Up.jsx'
import ProfileForm from './components/ProfileCard/ProfileCard.jsx';
import ReportsLayout from './components/ReportsLayout/ReportsLayout.jsx';
import Notification from './components/Notification/Notification.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing_Page />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Sign_Up />} />
          <Route path="/instant-consultation" element={<BookingConsultation />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/reports" element={<ReportsLayout />} />
          <Route path="/notif" element={<Notification />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
