import AccountService from "../services/account.service.js";

const createAccount = async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || account.balance === null) {
      throw new Error("Name e Balance são dados obrigatórios!");
    }

    account = await AccountService.createAccount(account);

    global.logger.info(`POST /account - ${JSON.stringify(account)}`);
    res.send(account);
  } catch (error) {
    next(error);
  }
};

const getAccounts = async (req, res, next) => {
  try {
    global.logger.info("GET /account");
    res.send(await AccountService.getAccounts());
  } catch (error) {
    next(error);
  }
};

const getAccount = async (req, res, next) => {
  try {
    global.logger.info(`GET /account/${req.params.id}`);
    res.send(await AccountService.getAccount(req.params.id));
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    
    global.logger.info(`DELETE /account/${req.params.id}`);
    res.send(await AccountService.deleteAccount(req.params.id));
  } catch (error) {
    next(error);
  }
};

const updateAccount = async (req, res, next) => {
  try {
    const account = req.body;

    if (!account.name || account.balance === null || !account.id) {
      throw new Error("Name, Balance e id são dados obrigatórios!");
    }

    global.logger.info(
      `PUT /account => id = ${req.body.id}`
    );
    res.send(await AccountService.updateAccount(account));
  } catch (error) {
    next(error);
  }
};

const updateBalance = async (req, res, next) => {
  try {
    const account = req.body;

    if (account.balance === null || !account.id) {
      throw new Error("Balance e id são dados obrigatórios!");
    }

    global.logger.info(
      `PATCH /account/updateBalance - ${JSON.stringify(account)}`
    );
    res.send(await AccountService.updateBalance(account));
  } catch (error) {
    next(error);
  }
};

export default {
  createAccount,
  getAccounts,
  getAccount,
  deleteAccount,
  updateAccount,
  updateBalance,
};
