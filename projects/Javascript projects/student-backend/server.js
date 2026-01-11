const express = require("express");
const fs = require("fs").promises;

const app = express();
app.use(express.json());

const FILE = "./students.json";

/* Read students */
async function readStudents() {
  const data = await fs.readFile(FILE, "utf-8");
  return JSON.parse(data);
}

/* Write students */
async function writeStudents(students) {
  await fs.writeFile(FILE, JSON.stringify(students, null, 2));
}

/* Get all students */
app.get("/students", async (req, res) => {
  const students = await readStudents();
  res.json(students);
});

/* Register a student */
app.post("/students", async (req, res) => {
  const { name, course } = req.body;

  const students = await readStudents();

  const newStudent = {
    id: Date.now(),
    name,
    course
  };

  students.push(newStudent);
  await writeStudents(students);

  res.status(201).json(newStudent);
});

/* Delete a student */
app.delete("/students/:id", async (req, res) => {
  const id = Number(req.params.id);

  let students = await readStudents();
  students = students.filter(s => s.id !== id);

  await writeStudents(students);

  res.json({ message: "Student deleted" });
});

/* Start server */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
