import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Patients from './Components/Patients';
import Appointment from './Components/Appointment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
                <a className="navbar-brand" to="#">HospitalAppointment</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink className='nav-link' activeClassName='active' to="/Dashboard">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className='nav-link' activeClassName='active' to="/Patients">Patients</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className='nav-link' activeClassName='active' to="/Appointment">Appointment</NavLink>
                    </li> 
                  </ul>

                </div>
              </div>
            </nav>

            <Routes>
              <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route>
              <Route path="/Patients" element={<Patients></Patients>}></Route>
              <Route path="/Appointment" element={<Appointment></Appointment>}></Route>
              
            </Routes>

          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
