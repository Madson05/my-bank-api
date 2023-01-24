import express from "express";
import accountsRouter from "./routes/accounts.js";
import { promises as fs, write } from "fs";

const app = express();

const { readFile, writeFile } = fs;

global.fileName = "accounts.json"

app.use(express.json());

app.use("/account", accountsRouter);

const port = 3000;

app.listen(port, async () => {
  try {
    await readFile(global.fileName);
    console.log("API started");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    try {
      await writeFile(global.fileName, JSON.stringify(initialJson));
      console.log("API started and file created");
    } catch (error) {
      console.log(error);
    }
  }
});
