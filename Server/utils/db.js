import mysql from 'mysql';

const con = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"emplyeems"

})
con.connect(function(err){
    if(err){
        console.log("connection error")
    }else{
        console.log("connected")
    }
})
export default con;