import express from "express";

import accountControler from "../controllers/account.controller.js";

const router = express.Router();

router.post("/", accountControler.createAccount);
router.get("/", accountControler.getAccounts);
router.get("/:id", accountControler.getAccount);
router.delete("/:id", accountControler.deleteAccount);
router.put("/", accountControler.updateAccount);
router.patch("/updateBalance", accountControler.updateBalance);

router.use((error, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${error.message} - ${error.stack}`);
  res.status(400).send({ error: error.message});
});

export default router;
