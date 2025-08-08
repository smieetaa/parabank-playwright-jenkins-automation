import { APIRequestContext, expect } from '@playwright/test';
import { XMLParser } from 'fast-xml-parser';

export class ParabankApi {
    private request: APIRequestContext;
    private baseUrl = 'https://parabank.parasoft.com/parabank/services/bank';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Method to find a transaction by amount, which returns an XML response.
    async findTransactionByAmount(accountId: string, amount: string): Promise<any> {
        const response = await this.request.get(`${this.baseUrl}/accounts/${accountId}/transactions/amount/${amount}`);
        
        // Ensure the API call was successful.
        expect(response.ok()).toBeTruthy();

        // Get the XML string and parse it into a JavaScript object.
        const xmlString = await response.text();
        const parser = new XMLParser();
        const parsedData = parser.parse(xmlString);
        return parsedData;
    }
}