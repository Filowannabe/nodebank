const AccountService = module.exports
const CustomerRepository = require('../repositories/CustomerRepository')
const AccountRepository = require('../repositories/AccountRepository')

AccountService.listAccountByCostumer = async (customerId) => {
    const customerFound = await CustomerRepository.findById(customerId)

    if (customerFound.length <= 0) {

        throw new Error('customer does not exist')
    }

    return AccountRepository.listAccountByCustomer(customerId)
}

AccountService.create = async (account) => {
    const customerFound = await CustomerRepository.findById(account.customerid)

    if (customerFound.length === 0) {
        throw new Error('cutomer does not exist')
    }

    const accountsByCustomer = await AccountRepository.listAccountByCustomer(account.customerid)

    if (accountsByCustomer.length >= 3) {
        throw new Error('no more than 3 accounts...')
    }
    account.openedAt = new Date();
    account.amount = 0;
    await AccountRepository.create(account)
}

AccountService.cancel = async (accountId) => {
    const accountToFind = await AccountRepository.findById(accountId)

    if (accountToFind.length === 0) {
        throw new Error('Account does not exist')
    }

    if (accountToFind[0].amount > 0) {
        throw new Error('Account must have an amount of 0 to be deleted')
    }
    await AccountRepository.delete(accountId)
}

AccountService.withRawal = async (accountId, withrawal) => {
    const accountToFind = await AccountRepository.findById(accountId)
    let newAmount = 0;
    if (accountToFind.length === 0) {
        throw new Error('Account does not exist')
    }

    if (!isNaN(withrawal)) {
        if ((accountToFind[0].amount - withrawal) < 0) {
            throw new Error('Account does not have this amount')
        }
        newAmount = accountToFind[0].amount - withrawal;
    }

    await AccountRepository.edit(accountId, {
        amount: newAmount
    })
}

AccountService.deposit = async (accountId, deposit) => {
    const accountToFind = await AccountRepository.findById(accountId)
    let newAmount = 0;

    if (accountToFind.length === 0) {
        throw new Error('Account does not exist')
    }

    if (!isNaN(deposit)) {
        if (!(deposit <= 0)) {
            newAmount = accountToFind[0].amount + deposit;
        } else {
            throw new Error('Deposit is not valid')
        }
    }

    await AccountRepository.edit(accountId, {
        amount: newAmount
    })
}

AccountService.transfer = async (originAccountId, destinationAccountId, amount) => {
    const originAccountToFind = await AccountRepository.findById(originAccountId)
    const destinationAccountToFind = await AccountRepository.findById(destinationAccountId)
    let withdrawal = 0;
    let destinationAmount = 0;

    if (originAccountToFind.length === 0) {
        throw new Error('Origin Account does not exist')
    }

    if (destinationAccountToFind.length === 0) {
        throw new Error('Destination Account does not exist')
    }
    
    if (amount <= 0) {
        throw new Error('Deposit is not valid')
    }

    if (!isNaN(amount)) {
        if ((originAccountToFind[0].amount - amount) < 0) {
            throw new Error('Origin Account does not have this amount')
        }
        withdrawal = originAccountToFind[0].amount - amount;
    }

    await AccountRepository.edit(originAccountId, {
        amount: withdrawal
    })

    destinationAmount = destinationAccountToFind[0].amount + amount;

    await AccountRepository.edit(destinationAccountId, {
        amount: destinationAmount
    })
}
