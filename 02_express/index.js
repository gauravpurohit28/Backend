import logger from "./logger.js";
import morgan from "morgan";
import "dotenv/config";
import express from "express";
const app = express()

const port = process.env.PORT || 3000;
const morganFormat = ":method :url :status :response-time ms";
app.use(express.json());

let teaData = [];
let nextId = 1;

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: nextId++,
    name,
    price,
  };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  res.status(200).send(tea);
});

// update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;

  res.status(200).send(tea);
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((tea) => tea.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }

  teaData.splice(index, 1);
  res.status(204).send("Deleted");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});