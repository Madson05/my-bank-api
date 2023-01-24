import express from "express";

import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let account = req.body;

    const data = JSON.parse(await readFile(global.fileName));

    account = { id: data.nextId++, ...account };

    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try{
    const data = JSON.parse(await readFile(global.fileName))
    const account = data.accounts.find((account) => {
      return account.id === parseInt(req.params.id)
    })

    res.send(account)
  }catch(e){

  }
});

export default router;
