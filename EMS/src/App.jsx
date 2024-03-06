import "./App.css";
import Category from "./components/Category";
import Dashboard from "./components/Dashboard";
import Employee from "./components/Employee";
import Home from "./components/Home";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./components/Profile";
import Add_Category from "./components/Add_Category";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import Start from "./components/Start";
import EmployeeLogin from "./components/EmployeeLogin";
import EmployeeDetail from "./components/EmployeeDetail";
// import { useEffect } from "react";
// import axios from "axios";

function App() {
  // const navigate = useNavigate();


   
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/auth/adminlogin" element={<Login />}></Route>
          <Route path="/employee_login" element={<EmployeeLogin />}></Route>
          <Route
            path="/employee_detail/:id"
            element={<EmployeeDetail />}
          ></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<Home />}></Route>
            <Route path="/dashboard/employee" element={<Employee />}></Route>
            <Route path="/dashboard/category" element={<Category />}></Route>
            <Route path="/dashboard/profile" element={<Profile />}></Route>
            <Route
              path="/dashboard/add_Category"
              element={<Add_Category />}
            ></Route>
            <Route
              path="/dashboard/add_employee"
              element={<AddEmployee />}
            ></Route>
            <Route
              path="/dashboard/edit_employee/:id"
              element={<EditEmployee />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
