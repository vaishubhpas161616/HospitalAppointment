import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Patients from './Components/Patients';
import List from './Components/List';

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
                    <NavLink className='nav-link' activeClassName='active' to="/List">List</NavLink>
                  </li>
                </ul>

                <form className='d-flex'>
                  <button className='btn btn-outline-success' type='button'>LogOut</button>
                </form>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route path="/Patients" element={<Patients></Patients>}></Route>
            <Route path="/List" element={<List></List>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
