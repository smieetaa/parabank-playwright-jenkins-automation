export const apiTestData = {
    billPayment: {
        accountId: '33102',
        paymentAmount: '10',
        expectedTransaction: {
            description: 'Funds Transfer Sent',
            type: 'Debit',
            amount: 10.00
        }
    }
};