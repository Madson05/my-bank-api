import accountRepository from "../repositories/account.repository.js";


const createAccount = async (account) => {
  return await accountRepository.insertAccount(account)
};

const getAccounts = async () => {
  return await accountRepository.getAccounts()
};

const getAccount = async (id) => {
  return await accountRepository.getAccount(id)
  
};

const deleteAccount = async (id) => {
  await accountRepository.deleteAccount(id)
};

const updateAccount = async (account) => {
  return await accountRepository.updateAccount(account);
};

const updateBalance = async (account) => {

  const acc = await accountRepository.getAccount(account.id)
  acc.balance = account.balance;
  

  return await accountRepository.updateAccount(acc)
};

export default {
  createAccount,
  getAccounts,
  getAccount,
  deleteAccount,
  updateAccount,
  updateBalance
};
