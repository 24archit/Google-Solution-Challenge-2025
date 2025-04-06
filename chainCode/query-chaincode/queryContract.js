'use strict';

const { Contract } = require('fabric-contract-api');

class QueryContract extends Contract {
    /**
     * Query a voter record by voterID.
     * Only authorized users (e.g., election officials) should be allowed.
     */
    async queryVoterRecord(ctx, voterID) {
        // (Optional) Insert chaincode-level access control logic here.
        const recordBytes = await ctx.stub.getState(voterID);
        if (!recordBytes || recordBytes.length === 0) {
            throw new Error(`Record for voter ${voterID} does not exist`);
        }
        return recordBytes.toString();
    }
}

module.exports = QueryContract;
