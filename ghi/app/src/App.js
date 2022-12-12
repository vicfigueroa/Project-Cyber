import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import TechnicianForm from './TechnicianForm'
import ServiceHistory from './ServiceHistory';
import ServiceAppointmentList from './ServiceAppointmentList';
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians/new" element={<TechnicianForm />} />
          <Route path="/appointments/new" element={<ServiceAppointmentForm />} />
          <Route path="/appointments/history" element={<ServiceHistory />} />
          <Route path="/appointments" element={<ServiceAppointmentList />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
