// api_tests/transactions.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Transactions API Tests', () => {

    test.skip('Search transactions by amount for bill payment', async ({ request }) => {
        // --- Prerequisites: Assuming a bill payment of $5 was made to account '987654321' ---
        // In a real-world scenario, you would dynamically get the account ID
        // and the transaction amount from the UI test. For this example, we'll
        // use a hardcoded value that matches the UI test scenario.
        const accountId = '12345'; // Placeholder: Replace with the actual account number from your UI test
        const paymentAmount = '5'; // Use a string to match the form submission value

        // 1. Search for the transaction using the "Find Transaction by Amount" API
        // This is the correct API endpoint for searching by amount.
        const response = await request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}/transactions/amount/${paymentAmount}`);

        // Assertion: Validate the response status
        expect(response.ok()).toBeTruthy();

        // 2. Validate the details displayed in the JSON response
        const transactions = await response.json();

        // The API returns an array, so we expect a single transaction object
        expect(Array.isArray(transactions)).toBeTruthy();
        expect(transactions.length).toBeGreaterThan(0);

        // Get the first transaction object
        const paymentTransaction = transactions[0];

        // Assertions: Ensure the transaction details are correct
        expect(paymentTransaction.description).toContain('Bill Payment');
        expect(paymentTransaction.amount).toBe(parseFloat(paymentAmount));
        expect(paymentTransaction.type).toBe('Debit');

        console.log(`Successfully found bill payment transaction for $${paymentAmount}.`);
    });
});