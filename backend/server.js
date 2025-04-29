const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "earist", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});



// API endpoint to fetch registration data
app.get("/api/registration", (req, res) => {
  const query = "SELECT subject_code, subject_title, lec_units, lab_units, credit_units, tuition_units, subject_section, subject_schedule_room, subject_faculty FROM subjects"; // Adjust table/column names as needed
 
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(results);
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});