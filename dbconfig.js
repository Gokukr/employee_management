const mysql=require("mysql")
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gokul196',
    database: 'employee_details',
  });
  

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to databse');
  });
  module.exports=db;