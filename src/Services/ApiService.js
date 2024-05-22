import React from 'react';
import axios from 'axios';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';

const url ="https://freeapi.gerasim.in/api/HospitalAppointment/";
const  get = async(endpoint)=>{
    try {
        const response = await axios.get(url + endpoint);
        if(response.data.data){
            alert(response.data.message)
        }
    } catch (error) {
        alert(error);
    }
}
const post =async(obj,endpoint)=>{
debugger
    try {
        const response = await axios.post(url + endpoint,obj);
        return response.data;
    } catch (error) {
        alert(error);
        
    }
}
const put =async(obj,endpoint)=>{
    try {
        const response = await axios.post(url + endpoint,obj);
        return response.data;
    } catch (error) {
        alert(error);
        
    }
}
const deletedata = async(id,endpoint)=>{
    try {
        const response = await axios.get(url + endpoint+id)
        return response.data;
    } catch (error) {
        alert(error);
    }
}

export{post,get,put,deletedata}
