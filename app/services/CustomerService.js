const CustomerService = module.exports
const CustomerRepository = require('../repositories/CustomerRepository')
const AccountRepository = require('../repositories/AccountRepository')

CustomerService.create = async (customer) => {
    const customerFound = await CustomerRepository.findById(customer.id)

    if (customerFound.length > 0) {
        throw new Error('Customer already exist')
    }

    await CustomerRepository.create(customer)
}

CustomerService.edit = async (id, customer) => {
    const customerFound = await CustomerRepository.findById(id)

    if (customerFound.length === 0) {

        throw new Error('Customer does not exist')
    }

    await CustomerRepository.edit(id, customer)
}

CustomerService.delete = async (customerId) => {
    const customerAccounts = await AccountRepository.listAccountByCustomer(customerId)

    if (customerAccounts.length > 0) {
        throw new Error('customer with accounts, can not be deleted')
    }

    await CustomerRepository.delete(customerId)
}

CustomerService.findCustomer = async (customerId) => {
    const customers = await CustomerRepository.findById(customerId)

    if (customers.length === 0){
        throw new Error('customer does not exist')
    }

    return customers[0];
}