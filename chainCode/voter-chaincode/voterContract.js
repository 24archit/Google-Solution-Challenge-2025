'use strict';

const { Contract } = require('fabric-contract-api');

class VoterContract extends Contract {
    async createVoterRecord(ctx, voterID, qrCodeData, timestamp) {
        // Create a record object with voter info
        const record = {
            voterID,
            qrCodeData,
            timestamp,
            docType: 'voterRecord'
        };

        // Store the record on the ledger using voterID as key
        await ctx.stub.putState(voterID, Buffer.from(JSON.stringify(record)));
        return JSON.stringify(record);
    }

    async queryVoterRecord(ctx, voterID) {
        const recordBytes = await ctx.stub.getState(voterID);
        if (!recordBytes || recordBytes.length === 0) {
            throw new Error(`Record for voter ${voterID} does not exist`);
        }
        return recordBytes.toString();
    }
}

module.exports = VoterContract;
