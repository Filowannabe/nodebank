const express = require('express');
const CustomerController = require('../controllers/CustomerController')
const AccountController = require('../controllers/AccountController')

const router = express.Router();

router.post('/customers', CustomerController.create);
router.delete('/customers/:id', CustomerController.delete);
router.put('/customers/:id', CustomerController.edit);
router.get('/customers/:id', CustomerController.find);
router.get('/customers/:id/accounts', AccountController.listAccountsByCustomer);
router.post('/accounts', AccountController.createAccount);
router.delete('/accounts/:id', AccountController.cancelAccount);
router.put('/accounts/:id/withrawal', AccountController.withRawal);
router.put('/accounts/:id/deposit', AccountController.deposit);
router.put('/accounts/:id/transfer', AccountController.transfer);

module.exports = router;