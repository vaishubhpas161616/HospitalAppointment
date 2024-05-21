import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Patients = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [getPatients, setGetPatients] = useState([]);
    const [patientObj, setPatientObj] = useState(
        {
            patientId: 0,
            name: "",
            mobileNo: "",
            city: "",
            age: "",
            gender: ""
          }
    );

    const [errors, setErrors] = useState({
        patientId: 0,
            name: "",
            mobileNo: "",
            city: "",
            age: "",
            gender: ""
      });

      const ChangeForm = (event, key) => {
        setPatientObj((prevObj) => ({
          ...prevObj,
          [key]: event.target.value,
        }));
        // Clear error message when user starts typing again
        setErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));
      };
    const getAllPatients = async () => {
        try {
          const result = await axios.get(
            "https://freeapi.gerasim.in/api/HospitalAppointment/GetAllPatients",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
              },
            }
          );
          setGetPatients(result.data.data);
        } catch (error) {
          console.error("Error fetching patients:", error);
        }
      };

    
  
      const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };
    
        // Validation for each field
        if (!patientObj.name.trim()) {
          newErrors.name = "Person Name is required";
          isValid = false;
        }
        if (!patientObj.mobileNo.trim()) {
          newErrors.mobileNo = "Mobile No is required";
          isValid = false;
        }
        if (!patientObj.city.trim()) {
          newErrors.city = "City is required";
          isValid = false;
        }
        if (!patientObj.age.trim()) {
          newErrors.age = "Age is required";
          isValid = false;
        }
        if (!patientObj.gender.trim()) {
          newErrors.gender = "Gender is required";
          isValid = false;
        }
        
    
        setErrors(newErrors);
        return isValid;
      };

    const SavePatients = async () => {
        debugger;
        if (validateForm()) {
          try {
            const result = await axios.post(
              "https://freeapi.gerasim.in/api/HospitalAppointment/AddNewPatient",
              patientObj,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
              }
            );
            if (result.data.data) {
              Swal.fire(" Patient add Success!", result.data.data, "success");
              getAllPatients();
              handleClose();
            } else {
              alert(result.data.message);
              getAllPatients();
            }
          } catch (error) {
            console.error("Error saving Patient:", error);
          }
          return;
        }
      };

    
    useEffect(() => {
        getAllPatients();
        
    }, []);

    const onEdit = (obj) => {
        setPatientObj(obj);
        handleShow();
      };


      const onreset = () => {
        setPatientObj({
            patientId: "",
            name: "",
            mobileNo: "",
            city: "",
            age: "",
            gender: ""
        });
      };


    const UpdatePatients = async () => {
        try {
          const result = await axios.put(
            `https://freeapi.gerasim.in/api/HospitalAppointment/UpdatePatient`,
            patientObj,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
              },
            }
          );
          if (result.data.data) {
            Swal.fire("Success!", result.data.data, "success");
          } else {
            Swal.fire("Success!", result.data.message, "success");
            getAllPatients();
            handleClose();
          }
        } catch (error) {
          console.error("Error updating patients:", error);
        }
      };


      const DeletePatients = async (patientId) => {
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
              `https://freeapi.gerasim.in/api/HospitalAppointment/DeletePatientByPatienId?patientId=
                        ${patientId}`,
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
              getAllPatients();
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
                    <h4 className="text-center">Get All Patients</h4>
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
                                            <th>Patient Id</th>
                                            <th>Name</th>
                                            <th>Mobile No</th>
                                            <th>City</th>
                                            <th>Age</th>
                                            <th>Gender</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                           getPatients.map((patient, index) => {
                                            return(<tr> 
                                                <td>{index + 1}</td>
                                                <td>{patient.patientId}</td>
                                                <td>{patient.name}</td>
                                                <td>{patient.mobileNo}</td>
                                                <td>{patient.city}</td>
                                                <td>{patient.age}</td>
                                                <td>{patient.gender}</td>
                                                <td>
                                                  <button type="button" className="btn btn-col-2 btn-primary mx-2" onClick={() => onEdit(patient)}><FaEdit />
                                                   {/* Adjust margin as needed */}</button>
                                                   <button type="button" className="btn btn-col-2 btn-danger mx-2" onClick={() => {DeletePatients(patient.patientId);}}>
                                                    <FaTrash /></button>
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
                                <Modal.Title>Add Patients</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <div className='row'>
                                                <div className='col-6'>
                                    <label>Name</label>
                                    <input type='text' value={patientObj.name} placeholder='Enter Name' onChange={(event) => {ChangeForm(event, 'name')}} className='form-control'></input>
                                    <small className="text-danger">{errors.name}</small>
                                </div>
                                <div className='col-6'>
                                    <label>Mobile No</label>
                                    <input type='text' value={patientObj.mobileNo} placeholder='Enter Mob' onChange={(event) => {ChangeForm(event, 'mobileNo')}} className='form-control'></input>
                                    <small className="text-danger">{errors.mobileNo}</small>
                                </div>
                                <div className='col-6'>
                                    <label>City</label>
                                    <input type='text' value={patientObj.city} placeholder='Enter City' onChange={(event) => {ChangeForm(event, 'city')}} className='form-control'></input>
                                    <small className="text-danger">{errors.city}</small>
                                </div>
                                <div className='col-6'>
                                    <label>Age</label>
                                    <input type='text' value={patientObj.age} placeholder='Enter Age' onChange={(event) => {ChangeForm(event, 'age')}} className='form-control'></input>
                                    <small className="text-danger">{errors.age}</small>
                                </div>
                                <div className='col-6'>
                                    <label>Gender</label>
                                    <input type='text' value={patientObj.gender} placeholder='Enter Gender' onChange={(event) => {ChangeForm(event, 'gender')}} className='form-control'></input>
                                    <small className="text-danger">{errors.gender}</small>
                                </div>
                                </div>
                                </div>
                                </div>
                                </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                            <div className="col-12 text-center"> 
                            {patientObj.patientId === 0 && (
                            <button type="button" className="btn btn-sm btn-primary m-2" onClick={SavePatients}>Add</button>)}
                            {patientObj.patientId !== 0 && (
                            <button type="button" className="btn btn-sm btn-warning m-2" onClick={UpdatePatients}>Update </button>)}
                            <button type="button" className="btn btn-sm btn-secondary" onClick={onreset}>Reset</button></div>
                            </Modal.Footer>
                        </Modal>
                    </form>
                </div>
            </div>
        
        </div>
    );
};

export default Patients;



                                