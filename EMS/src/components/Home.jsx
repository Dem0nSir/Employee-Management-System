/* eslint-disable no-unused-vars */
// import React from 'react'

import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount(0);
    employeeCount(0);
    salaryCount(0);
    getAdmins();
  });
  const adminCount = () => {
    axios.get("http://localhost:3000/auth/admin_count").then((result) => {
      setAdminTotal(result.data.Result[0].admin);
      // console.log(result.data.Result[0].admin)
    });
  };
  const employeeCount = () => {
    axios.get("http://localhost:3000/auth/employee_count").then((result) => {
      setEmployeeTotal(result.data.Result[0].employee);
      // console.log("e",result.data)
    });
  };
  const salaryCount = () => {
    axios.get("http://localhost:3000/auth/salary_count").then((result) => {
      setSalaryTotal(result.data.Result[0].salary);
      // console.log("s",result.data)
    });
  };
  const getAdmins = () => {
    axios.get("http://localhost:3000/auth/admins").then((result) => {
      if(result.data.Status) {
        setAdmins(result.data.Result)
      } else {
         alert(result.data.Error)
      }
      // console.log(result.data.Result[0])
    });
  };
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>Rs {salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => (
                // eslint-disable-next-line react/jsx-key
                <tr>
                  <td>{a.email}</td>
                  <td>
                  <button
                    className="btn btn-info btn-sm me-2">
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm" onClick={()=>handleDelete()}>
                    Delete
                  </button>
                  </td>
                </tr>
              ))
              // <tr>
              //   <td>{admins?.email}</td>
              // </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
