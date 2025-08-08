import { test, expect } from '@playwright/test';
import { ParabankApi } from '../services/ParabankApi';
import { apiTestData } from '../data/apiTestData'; 

test.describe('API Tests', () => {
    test('Search transaction by amount for bill payment (XML response)', async ({ request }) => {
        // Retrieve test data for the bill payment scenario
        const billPayment = apiTestData.billPayment;

        // 1. Create an instance of the API service.
        const parabankApi = new ParabankApi(request);

        // 2. Call the service method to find the transaction.
        // This makes the test intent clear and readable.
        const responseData = await parabankApi.findTransactionByAmount(billPayment.accountId, billPayment.paymentAmount);

        // 3. Validate the details from the parsed XML response.
        // We expect the data structure to be <transactions><transaction>...</transaction></transactions>.
        const transaction = responseData.transactions.transaction;
        console.log("responseData: ", responseData);
        // Assertion: Check that the transaction details are correct
        expect(transaction.id).not.toBeNull();
        expect(transaction.accountId).toBe(billPayment.accountId);
        expect(transaction.type).toBe(billPayment.expectedTransaction.type);
        expect(transaction.date).not.toBeNull();
        expect(transaction.amount).toBe(billPayment.expectedTransaction.amount);
        expect(transaction.description).toContain(billPayment.expectedTransaction.description);

        console.log(`Successfully validated XML response for transaction: ${transaction.description}`);
    });
});
