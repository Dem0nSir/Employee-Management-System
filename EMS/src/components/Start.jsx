/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3000/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/employee_detail/" + result.data.id);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2 className="text-center">Login As</h2>
        <div className="d-flex justify-content-between mt-5 mb-2">
          <button className="btn btn-primary "onClick={()=>{navigate('/auth/adminlogin')}}>Admin</button>
          <button className="btn btn-success" onClick={()=>{navigate('/employee_login')}}>Employee</button>
        </div>
      </div>
    </div>
  );
};

export default Start;
