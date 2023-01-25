import express from "express";
import winston from "winston";
import accountsRouter from "./routes/accounts.js";
import { promises as fs } from "fs";
import cors from "cors"
import {swaggerDocument} from "./doc.js"
import swaggerUi from "swagger-ui-express"


const app = express();

const {combine, timestamp, label, printf} = winston.format;
const myFormat = printf(({level, message, label, timestamp}) => {
  return `${timestamp} [${label}] ${level} : ${message}`
})

global.logger = winston.createLogger({
  level: "silly", 
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({filename: "my-bank-api.log"})
  ],
  format: combine(
    label({label:"mybank-api"}),
    timestamp(),
    myFormat
)
  
})

const { readFile, writeFile } = fs;

global.fileName = "accounts.json"

app.use(express.json());
app.use(cors())
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/account", accountsRouter);

const port = 3000;

app.listen(port, async () => {
  try {
    await readFile(global.fileName);
    global.logger.info("API started");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    try {
      await writeFile(global.fileName, JSON.stringify(initialJson));
      global.logger.info("API started and file created");
    } catch (error) {
      global.logger.error(error);
    }
  }
});
