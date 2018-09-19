'use strict';

const {expect} = require('chai');
const {AirbnbChecker} = require('../../lib/services');
const sinon = require('sinon');

describe('AirbnbChecker', () => {

    it('Performs request to mocked service', async () => {
        const mockedRequest = sinon.stub().returns({statusCode: 302});
        const instance = new AirbnbChecker(mockedRequest);
        const isValid = await instance.isValidId(42);
        expect(isValid, 'result').to.equal(false);
        expect(mockedRequest.callCount, 'callCount').to.equal(1);
    });

    it('Uses internal cache', async () => {
        const mockedRequest = sinon.stub().returns({statusCode: 200});
        const instance = new AirbnbChecker(mockedRequest);
        const isValid = await instance.isValidId(42);
        expect(isValid, 'first result').to.equal(true);
        expect(mockedRequest.callCount, 'callCount').to.equal(1);
        const isValidAfter = await instance.isValidId(42);
        expect(isValidAfter, 'second result').to.equal(true);
        expect(mockedRequest.callCount, 'callCount').to.equal(1);

    });

    it('Throws on unusal statusCode', async () => {
        const mockedRequest = sinon.stub().returns({statusCode: 404});
        const instance = new AirbnbChecker(mockedRequest);
        try {
            await instance.isValidId(42);
            return Promise.reject(new Error('instance.isValidId did not throw as expected'))
        } catch(err) {
            expect(err.message).to.match(/404/);
            return null;
        }

    });

});