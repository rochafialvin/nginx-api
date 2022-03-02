const express = require("express");
const app = express();
const port = 2022;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("<h1>Service is running<h1>");
});

app.use((error, req, res, next) => {
  console.log({ error });
  res.status(500).send({ error });
});

app.listen(port, () => console.log(`Server is running at : ${port}`));
