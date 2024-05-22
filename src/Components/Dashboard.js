import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const[getdash, setGetDash] = useState([]);

    const GetDashboard  = async () => {
        try {
          const result = await axios.get(
            "https://freeapi.gerasim.in/api/HospitalAppointment/GetDashboardData",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
              },
            }
          );
          setGetDash(result.data.data);
        } catch (error) {
          console.error("Error fetching appointment:", error);
        }
      };
   
      useEffect(() => {
        GetDashboard();
      })
    return (
        <div>
            <div className='container-fluid pt-3'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='card'>
                            <div className='card-header bg-info'>
                                <h4>Dashboard</h4>
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Total Patients</th>
                                            <th>Total Appointments</th>
                                            <th>Todays Total Appointments</th>
                                            <th>Todays Total Done Appointments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getdash.map((dash ,index) => {
                                                return(<tr>
                                                    <td>{index + 1}</td>
                                                    <td>{dash.totalPatients}</td>
                                                    <td>{dash.totalAppointments}</td>
                                                    <td>{dash.todaysTotalAppointments}</td>
                                                    <td>{dash.todaysTotalDoneAppointments}</td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;