import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import TechnicianForm from './TechnicianForm'
import ServiceHistory from './ServiceHistory';
import ServiceAppointmentList from './ServiceAppointmentList'; import ManufacturerForm from './ManufacturerForm';
import VehicleModelForm from './VehicleModelForm';
import AutomobileForm from './AutomobileForm';
import SalespersonForm from './SalespersonForm';
import SalesForm from './SalesForm';
import SalesList from './SalesList';
import CustomerForm from './CustomerForm';
import ManufacturerList from './ManufacturerList';
import VehicleModelList from './VehicleModelList';
import AutomobileList from './AutomobileList';





function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturer/" element={<ManufacturerForm />} />
          <Route path="/models/" element={<VehicleModelForm />} />
          <Route path="/automobile/" element={<AutomobileForm />} />
          <Route path="/salesperson/" element={<SalespersonForm />} />
          <Route path="/sale/" element={<SalesForm />} />
          <Route path="/sales/" element={<SalesList />} />
          <Route path="/customer/" element={<CustomerForm />} />
          <Route path="/manufacturers/" element={<ManufacturerList />} />
          <Route path="/vehicles/" element={<VehicleModelList />} />
          <Route path="/automobiles/" element={<AutomobileList />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
