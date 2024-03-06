/* eslint-disable no-unused-vars */
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const EmployeeLogin = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
      email: "",
      password: "",
    });
    const [error,setError] = useState(null)
    axios.defaults.withCredentials = true;

    
    const handleSubmit = (event)=>{
      event.preventDefault()
      axios.post('http://localhost:3000/employee/employee_login',values)
      .then(result =>{
        console.log(result.data)
        if(result.data.loginStatus){
          localStorage.setItem("valid", true)
          navigate('/employee_detail/'+result.data.id)
        }else{
          setError(result.data.Error)
        }
        
      })
      .catch(err => console.log(err))
    }
 
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
    <div className="p-3 rounded w-25 border loginForm">
      <div className="text-warning">
        {error && error}
      </div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter Email"
            className="form-control rounded-0"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="form-control rounded-0"
            onChange={(e) =>
              setValues({ ...values, password: e.target.value })
            }
          />
        </div>

        <button className="btn btn-success w-100 rounded-0 mb-2">
          Log in
        </button>
        <div className="mb-1">
          <input type="checkbox" name="tick" id="tick" className="me-2" />{" "}
          <label htmlFor="password">
            You are Agree with terms and conditions
          </label>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EmployeeLogin