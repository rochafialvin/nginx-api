const express = require("express");
const app = express();
const port = 2022;
const cors = require("cors");
const mysql = require("mysql2");

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password123",
  database: "nginx",
});

pool.getConnection((err, conn) => {
  if (err) {
    conn.release();
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log(`Successfully connected to the database (id ${conn.threadId})`);
  conn.release();
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("<h1>Service is running<h1>");
});

app.get("/users", async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();
    const [users] = await connection.query("select * from users");
    res.send({ message: "List of users", data: users });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.log({ error });
  res.status(500).send({ error });
});

app.listen(port, () => console.log(`Server is running at : ${port}`));
