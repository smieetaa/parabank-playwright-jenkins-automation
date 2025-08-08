import { test, expect } from '@playwright/test';
import { ParabankApi } from '../services/ParabankApi';
import { readSharedData } from '../utils/dataUtils';
import { apiTestData } from '../data/apiTestData'; 

test.describe('API Tests', () => {
    test('Search transaction by amount for bill payment (XML response)', async ({ request }) => {
        // Retrieve shared test data for the bill payment scenario
        const billPaymentDetails = readSharedData();
        
        // read the expectd data file
        const billPayment = apiTestData.billPayment;

        // 1. Create an instance of the API service.
        const parabankApi = new ParabankApi(request);

        // 2. Call the service method to find the transaction.
        // This makes the test intent clear and readable.
        const responseData = await parabankApi.findTransactionByAmount(billPaymentDetails.accountId, billPaymentDetails.billAmount);

        // 3. Validate the details from the parsed XML response.
        const transaction = responseData.transactions.transaction;
        
        // Assertion: Check that the transaction details are correct
        expect(transaction.id).not.toBeNull();
        expect(transaction.date).not.toBeNull();
        expect(transaction.description).not.toBeNull();

        // values from shared data
        expect( String(transaction.accountId)).toBe(billPaymentDetails.accountId);
        expect( String(transaction.amount)).toBe(billPaymentDetails.billAmount);

        // values from static data
        expect(transaction.type).toBe(billPayment.expectedTransaction.type);
    });
});
