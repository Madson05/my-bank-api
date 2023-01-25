import express from "express";

import { promises as fs, write } from "fs";

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || account.balance === null) {
      throw new Error("Name e Balance são dados obrigatórios!");
    }

    const data = JSON.parse(await readFile(global.fileName));

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };

    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    global.logger.info(`POST /account - ${JSON.stringify(account)}`);
    res.send(account);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    global.logger.info("GET /account");

    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find((account) => {
      return account.id === parseInt(req.params.id);
    });

    global.logger.info(`GET /account/${req.params.id}`);
    res.send(account);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    global.logger.info(
      `DELETE /account/${req.params.id}- ${JSON.stringify(account)}`
    );
    res.end();
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const account = req.body;

    if (!account.name || account.balance === null || !account.id) {
      throw new Error("Name, Balance e id são dados obrigatórios!");
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (index === -1)
      throw new Error("Registro não encontrado na base de dados");

    data.accounts[index] = {
      id: data.account[index].id,
      name: account.name,
      balance: account.balance,
    };

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    global.logger.info(`PUT /account - ${JSON.stringify(account)}`);
    res.end();
  } catch (error) {
    next(error);
  }
});

router.patch("/updateBalance", async (req, res) => {
  try {
    const account = req.body;

    if (account.balance === null || !account.id) {
      throw new Error("Balance e id são dados obrigatórios!");
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (index === -1)
      throw new Error("Registro não encontrado na base de dados");


    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    global.logger.info(
      `PATCH /account/updateBalance - ${JSON.stringify(account)}`
    );
    res.end();
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
  res.status(400).send({ error: error.message });
});

export default router;
