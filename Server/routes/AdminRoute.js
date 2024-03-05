import express, { Router } from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ?  AND password = ?";
  con.query(sql, [req.body.email, req.body.password], function (err, result) {
    if (err) {
      return res.json({ loginStatus: false, Error: "Error in query" });
    } else {
      if (result.length) {
        const email = result[0].email;

        const token = jwt.sign(
          { role: "admin", email: email },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie("token", token);
        return res.json({ loginStatus: true, Error: "Login Success" });
      } else {
        return res.json({ loginStatus: false, Error: "Invalid Credentials" });
      }
    }
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, function (err, result) {
    if (err) {
      return res.json({ Status: false, Error: "Error in query" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
});

router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.category], function (err, result) {
    if (err) {
      return res.json({ Status: false, Error: "Error in query" });
    } else {
      return res.json({ Status: true });
    }
  });
});

// image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

//end of upload image

router.post("/add_employee", upload.single("image"), (req, res) => {
  const sql = `INSERT INTO employee (name,email,password,salary,address,image,category_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) {
      console.error("Error in hashing password:", err);
      return res.json({ Status: false, Error: "Error in hashing password" });
    }

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.salary,
      req.body.address,
      req.file.filename,
      req.body.category_id,
    ];
    console.log("SQL Query:", sql);
    console.log("Query Values:", values);
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error in query:", err);
        return res.json({
          Status: false,
          Error: "Error in query: " + err.message,
        });
      }
      return res.json({ Status: true });
    });
  });
});

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, function (err, result) {
    if (err) {
      return res.json({ Status: false, Error: "Error in query" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
});

router.get("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error in query" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
});
router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE employee SET name = ?, email = ?, salary = ?, address = ?, category_id = ? WHERE id = ?";
  con.query(
    sql,
    [
      req.body.name,
      req.body.email,
      req.body.salary,
      req.body.address,
      req.body.category_id,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: "Error in query" });
      } else {
        return res.json({ Status: true });
      }
    }
  );
});
router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error in query" });
    } else {
      return res.json({ Status: true });
    }
  });
});
router.get("/admin_count", (req, res) => {
  const sql = "select count(id) as admin from admin";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error in query" });
    } else {
     
      return res.json({ Status: true, Result: result });
    }
  });
});
router.get("/employee_count", (req, res) => {
  const sql = "select count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error in query" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
});
router.get("/salary_count", (req, res) => {
  const sql = "select sum(salary) as salary from employee";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error in query" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
});
router.get("/admins", (req, res) => {
  const sql = "SELECT * FROM admin";
  con.query(sql, function (err, result) {
    if (err) {
      return res.json({ Status: false, Error: "Error in query" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
}
);

router.get('/logout',(req,res)=>{
  res.clearCookie('token');
  return res.json({status:true})
})

export { router as adminRouter };
