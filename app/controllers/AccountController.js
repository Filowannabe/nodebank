const AccountController = module.exports
const AccountService = require('../services/AccountService')

AccountController.listAccountsByCustomer = async (req, res, next) => {
    const params = req.params;

    try {
        const response = await AccountService.listAccountByCostumer(params.id)

        res.send(response)

    } catch (error) {
        console.log({ error })
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}


AccountController.createAccount = async (req, res, next) => {
    const body = req.body;

    try {
        await AccountService.create(body)
        res.send({ message: 'Account is created' })

    } catch (error) {
        console.log({ error })
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}

AccountController.cancelAccount = async (req, res, next) => {
    const params = req.params;

    try {
        await AccountService.cancel(params.id)
        res.send({ message: 'Account was canceled' })

    } catch (error) {
        console.log({ error })
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}

AccountController.withRawal = async (req, res, next) => {
    const params = req.params;
    const body = req.body;

    try {
        await AccountService.withDraw(params.id, body.withrawal)
        res.send({ message: 'Withrawal was succesful' })

    } catch (error) {
        console.log({ error })
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}

AccountController.deposit = async (req, res, next) => {
    const params = req.params;
    const body = req.body;

    try {
        await AccountService.deposit(params.id, body.deposit)
        res.send({ message: 'Deposit was succesful' })

    } catch (error) {
        console.log({ error })
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}

AccountController.transfer = async (req, res, next) => {
    const params = req.params;
    const body = req.body;

    try {
        await AccountService.transfer(params.id, body.destination, body.amount)
        res.send({ message: 'Transfer was succesful' })

    } catch (error) {
        console.log({ error })
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}