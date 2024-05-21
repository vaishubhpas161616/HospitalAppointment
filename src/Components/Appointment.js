import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Appointment = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [getAppintment, setGetApointment] = useState([]);
    const [addAppointment, setAddAppointment] = useState(
        {
            name: "",
            mobileNo: "",
            city: "",
            age: 0,
            gender: "",
            appointmentDate: "",
            appointmentTime: "",
            isFirstVisit: true,
            naration: ""
        }
    );

    const [errors, setErrors] = useState({
            name: "",
            mobileNo: "",
            city: "",
            age: 0,
            gender: "",
            appointmentDate: "",
            appointmentTime: "",
            isFirstVisit: true,
            naration: ""
      });

      const ChangeAppointment = (event, key) => {
        setAddAppointment((prevObj) => ({
          ...prevObj,
          [key]: event.target.value,
        }));
        // Clear error message when user starts typing again
        setErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));
      };

      const GetAllApointment = async () => {
        try {
          const result = await axios.get(
            "https://freeapi.gerasim.in/api/HospitalAppointment/GetAllAppointments",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
              },
            }
          );
          setGetApointment(result.data.data);
        } catch (error) {
          console.error("Error fetching appointment:", error);
        }
      };

      const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };
    
        // Validation for each field
        if (!addAppointment.name.trim()) {
          newErrors.name = "Person Name is required";
          isValid = false;
        }
        if (!addAppointment.mobileNo.trim()) {
          newErrors.mobileNo = "Mobile No is required";
          isValid = false;
        }
        if (!addAppointment.city.trim()) {
          newErrors.city = "City is required";
          isValid = false;
        }
        if (!addAppointment.age.trim()) {
          newErrors.age = "Age is required";
          isValid = false;
        }
        if (!addAppointment.gender.trim()) {
          newErrors.gender = "Gender is required";
          isValid = false;
        }
        if (!addAppointment.appointmentDate.trim()) {
            newErrors.appointmentDate = "AppointmentDate is required";
            isValid = false;
          }
          if (!addAppointment.appointmentTime.trim()) {
            newErrors.appointmentTime = "AppointmentTime is required";
            isValid = false;
          }
          
          if (!addAppointment.naration.trim()) {
            newErrors.naration = "Naration is required";
            isValid = false;
          }
        setErrors(newErrors);
        return isValid;
      };

      const AddNewApointment = async () => {
        debugger;
        if (validateForm()) {
          try {
            const result = await axios.post(
              "https://freeapi.gerasim.in/api/HospitalAppointment/AddNewAppointment",
              addAppointment,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
              }
            );
            if (result.data.data) {
              Swal.fire(" Patient add Success!", result.data.data, "success");
              GetAllApointment();
              handleClose();
            } else {
              alert(result.data.message);
              GetAllApointment();
            }
          } catch (error) {
            console.error("Error saving appointment:", error);
          }
          return;
        }
      };

    useEffect(() => {
        GetAllApointment();
        
    }, []);

      const onreset = () => {
        setAddAppointment({
            name: "",
            mobileNo: "",
            city: "",
            age: 0,
            gender: "",
            appointmentDate: "",
            appointmentTime: "",
            isFirstVisit: true,
            naration: ""
        });
      };

      const onDelete = async (appointmentId) => {
        const confirmDelete = await Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to recover this patient!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        });
        if (confirmDelete.isConfirmed) {
          try {
            const result = await axios.delete(
              `https://freeapi.gerasim.in/api/HospitalAppointment/DeleteAppointmentByAppointment?appointmentId=
                        ${appointmentId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
              }
            );
            if (result.data.data) {
              Swal.fire("Error!", result.data.data, "error");
            } else {
              Swal.fire("Success!", result.data.message, "success");
              GetAllApointment();
            }
          } catch (error) {
            console.error("Error deleting patient:", error);
          }
        }
      };
    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12'>
                    <div className="col-md-1"></div>
            <div className="card bg-light">
              <div className="card-header bg-info">
              <div className="row mt-2">
                  <div className="col-md-10 text-center ">
                    <h4 className="text-center">Get All Appointments</h4>
                  </div>
                  <div className="col-md-2 text-end">
                    <Button
                      variant="success"
                      className="btn-md m-1 text-right"
                      onClick={handleShow}
                    >
                      <FaPlus />
                      Add
                    </Button>
                  </div>
                </div>
              </div>

                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Name</th>
                                            <th>AppointmentNo</th>
                                            <th>Date</th>
                                            <th>AppointmentId</th>
                                            <th>Time</th>
                                            <th>Naration</th>
                                            <th>PatientId</th>
                                            <th>MobileNo</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getAppintment.map((appintment, index) => {
                                                return (<tr>
                                                    <td>{index + 1}</td>
                                                    <td>{appintment.name}</td>
                                                    <td>{appintment.appointmentNo}</td>
                                                    <td>{appintment.appointmentDate}</td>
                                                    <td>{appintment.appointmentId}</td>
                                                    <td>{appintment.appointmentTime}</td>
                                                    <td>{appintment.naration}</td>
                                                    <td>{appintment.patientId}</td>
                                                    <td>{appintment.mobileNo}</td>
                                                    <td>
                                                    <button type="button" className="btn btn-col-2 btn-danger mx-2"onClick={() => {onDelete(appintment.appointmentId);}}><FaTrash /></button>
                                                    </td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <form action=''>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton className="bg-info">
                                <Modal.Title>Add Appointment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <label>Name</label>
                                                        <input type='text' onChange={(event) => { ChangeAppointment(event, 'name') }} placeholder='Enter Name' className='form-control'></input>
                                                        <small className="text-danger">{errors.name}</small>
                                                    </div>
                                                    <div className='col-6'>
                                                        <label>Mobile No</label>
                                                        <input type='text' onChange={(event) => { ChangeAppointment(event, 'mobileNo') }} placeholder='Enter MobileNo' className='form-control'></input>
                                                        <small className="text-danger">{errors.mobileNo}</small>
                                                    </div>
                                                    <div className='col-6'>
                                                        <label>City</label>
                                                        <input type='text' onChange={(event) => { ChangeAppointment(event, 'city') }} placeholder='Enter City' className='form-control'></input>
                                                        <small className="text-danger">{errors.city}</small>
                                                    </div>
                                                    <div className='col-6'>
                                                        <label>Age</label>
                                                        <input type='text' onChange={(event) => { ChangeAppointment(event, 'age') }} placeholder='Enter Age' className='form-control'></input>
                                                        <small className="text-danger">{errors.age}</small>
                                                    </div>
                                                    <div className='col-6'>
                                                        <label>Gender</label>
                                                        <input type='text' onChange={(event) => { ChangeAppointment(event, 'gender') }} placeholder='Enter Gender' className='form-control'></input>
                                                        <small className="text-danger">{errors.gender}</small>
                                                    </div>
                                                    <div className='col-6'>
                                                        <label>AppointmentDate</label>
                                                        <input type='date' onChange={(event) => { ChangeAppointment(event, 'appointmentDate') }} placeholder='Enter Date' className='form-control'></input>
                                                        <small className="text-danger">{errors.appointmentDate}</small>
                                                    </div>
                                                    <div className='col-6'>
                                                        <label>Time</label>
                                                        <input type='time' onChange={(event) => { ChangeAppointment(event, 'appointmentTime') }} placeholder='Enter Time' className='form-control'></input>
                                                        <small className="text-danger">{errors.appointmentTime}</small>
                                                    </div>
                                                    <div className='col-6'>
                                                        <label>Naration</label>
                                                        <input type='text' onChange={(event) => { ChangeAppointment(event, 'naration') }} placeholder='Enter Naration' className='form-control'></input>
                                                        <small className="text-danger">{errors.naration}</small> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <div className="col-12 text-center">
                                {
                                <button type="button" className="btn btn-sm btn-primary m-2" onClick={AddNewApointment}>Add</button>
                                }
                                <button type="button" className="btn btn-sm btn-secondary" onClick={onreset}>Reset</button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Appointment;