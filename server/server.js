import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import mysql from "mysql2";
//import multer from "multer";
//import db from "./config/db.js";

const app = express();
const __dirname = path.resolve();
dotenv.config();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const PORT = 5000;

const db1 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zman1ac",
  database: "sys",
});

app.post("/getstarted", (req, res) => {
  const { name, email, phone } = req.body;

  const q =
    "INSERT INTO `sys`.`getstarted` (`name`, `email`, `number`) VALUES (?, ?, ?)";
  const values = [name, email, phone];
  db1.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

app.post("/infodetails", (req, res) => {
  const { name, email, phone, gender, reason, physician, appointment } =
    req.body;

  const formattedAppointment = new Date(appointment)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const q =
    "INSERT INTO `sys`.`patients` (`name`, `email`, `phone`, `gender`, `reason`, `physician`,`appointment`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    name,
    email,
    phone,
    gender,
    reason,
    physician,
    formattedAppointment,
  ];

  db1.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

app.get("/patients", (req, res) => {
  const q = "SELECT * FROM sys.patients";

  db1.query(q, (err, results) => {
    if (err) {
      console.error("Error fetching patients:", err);
      return res
        .status(500)
        .json({ error: "Error fetching patients", details: err });
    }

    // Format the appointment date for each patient
    const formattedResults = results.map((patient) => {
      if (patient.appointment) {
        const appointmentDate = new Date(patient.appointment);
        patient.appointment = appointmentDate
          .toISOString()
          .slice(0, 19)
          .replace("T", "--");
      }
      return patient;
    });

    res.json(formattedResults);
  });
});

app.get("/patients", (req, res) => {
  const fields = req.query.fields; // Extract 'fields' from the query string
  let selectedFields = "*"; // Default: select all fields

  if (fields) {
    selectedFields = fields.split(",").join(", "); // Convert 'fields' into a valid SQL string
  }

  const q = `SELECT ${selectedFields} FROM patients`;

  db1.query(q, (err, result) => {
    if (err) {
      console.error("Error fetching patients:", err);
      return res
        .status(500)
        .json({ error: "Error fetching patients", details: err });
    }
    res.json(result);
    console.log("Patients:", result);
  });

  const formattedResults = results.map((patient) => {
    if (patient.appointment) {
      const appointmentDate = new Date(patient.appointment);
      patient.appointment = appointmentDate
        .toISOString()
        .slice(0, 19)
        .replace("T", "--");
    }
    return patient;
  });

  res.json(formattedResults);
});

app.patch("/patients/:id/status", (req, res) => {
  const { id } = req.params;
  const { status, appointment, reason } = req.body;

  const validStatus = ["pending", "cancelled", "scheduled"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const q =
    "UPDATE sys.patients SET status = ?, appointment = ?, reason = ? WHERE id = ?";

  try {
    db1.query(q, [status, appointment, reason, id], (err, result) => {
      if (err) {
        console.error("Error updating status:", err);
        return res.status(500).json({
          error: "Error updating status",
          details: err,
        });
      }

      res.json({ message: "Status updated successfully", result });
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/add-doctor", (req, res) => {
  const { name, email, phone, department, education, experience } = req.body;

  if (!name || !email || !phone || !department || !education || !experience) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const q =
    "INSERT INTO `sys`.`doctors` ( `name`, `email`, `phone`, `department`, `education`, `experience`) VALUES (?, ?, ?, ?, ?, ?)";

  const values = [name, email, phone, department, education, experience];

  db1.query(q, values, (err, result) => {
    if (err) {
      console.error("Error inserting doctor:", err);
      return res
        .status(500)
        .json({ error: "Error inserting data", details: err });
    }
    console.log("Doctor added:", result);
    res.status(200).json({ message: "Doctor added successfully", result });
  });
});

app.get("/doctors", (req, res) => {
  const q = "SELECT * FROM sys.doctors";
  db1.query(q, (err, result) => {
    if (err) {
      console.error("Error fetching doctors:", err);
      return res
        .status(500)
        .json({ error: "Error fetching doctors", details: err });
    }
    res.json(result);
    console.log("Doctors:", result);
  });
});

app.get("/doctors", (req, res) => {
  const { fields } = req.query;

  const selectedFields = fields ? fields.split(",").join(",") : "*";
  const q = `SELECT ${selectedFields} FROM sys.doctors`;

  db1.query(q, (err, result) => {
    if (err) {
      console.error("Error fetching doctors:", err);
      return res
        .status(500)
        .json({ error: "Error fetching doctors", details: err });
    }
    res.json(result);
    console.log("Doctors:", result);
  });
});
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server started on port ${process.env.PORT || PORT}`);
});
