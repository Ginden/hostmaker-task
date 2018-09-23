'use strict';
/* eslint no-console: 0 */
const rp = require('request-promise');
const {expect} = require('chai');
const _ = require('lodash');
const Promise = require('bluebird');
const {green, red} = require('chalk');

const port = process.env.PORT || 8432;
const hostname = `http://localhost:${port}`;

const ankurProperty = require('./fixtures/ankur-prop');
const carlosProperty = require('./fixtures/carlos-prop');
const elaineProperty = require('./fixtures/elaine-prop');

const isVerbose = process.argv.includes('--verbose');

function log(color, msg) {
    console.log(color(msg));
}

(async () => {

    log(green, 'We check if getting non-existant property returns error');
    await expectNotToExist(ankurProperty);
    await expectNotToExist(carlosProperty);
    await expectNotToExist(elaineProperty);
    log(green, 'These 3 properties (owned by Ankur, Carlos and Elaine couldn\'t be found');

    log(green, 'Now we will create these 3 properties');

    await createProperty(ankurProperty);
    await createProperty(carlosProperty);
    await createProperty(elaineProperty);

    log(green, 'Succesfully created all properties');

    log(green, 'Now we check if these properties can be returned from API');

    await expectToExist(ankurProperty);
    await expectToExist(carlosProperty);
    await expectToExist(elaineProperty);

    log(green, 'All these properties exist!');

    log(green, 'Ankur removed his property from our site - deleting it');
    await deleteProperty(ankurProperty);


    await expectNotToExist(ankurProperty);

    log(green, 'And now, his property is not in DB anymore');

    log(green, 'Elaine made some changes to her property');
    const improvedProperty = {
        ...elaineProperty,
        incomeGenerated: 1543.2,
        numberOfBedrooms: 3
    };

    await updateProperty(improvedProperty);
    await expectToExist(improvedProperty);

    log(green, 'And these changes are in database');

    log(green, 'Let\'s check if business rules are enforced');

    const malformed = generateMalformedProperties(carlosProperty);

    for(const [issue, prop] of malformed) {
        const redIssue = red(issue);
        log(green, `We expect issue "${redIssue}" to throw`);
        const result = await updateProperty(prop);
        expect(result).to.have.property('error');
        log(green, `${redIssue} generates an error!`);
    }

    log(green, 'Time to remove all properties from database!');

    await deleteProperty(elaineProperty);
    await deleteProperty(carlosProperty);

})().catch(err => {
    // eslint-disable-next-line
    console.error(err);
    process.exit(1);
});


function generateMalformedProperties(property) {
    const ret = [];
    ret.push([
        'Negative income', {
            ...property,
            incomeGenerated: -5
        }
    ]);
    ret.push([
        'Empty adress.line1', _.defaultsDeep({
            address: {
                line1: null
            }
        }, _.cloneDeep(property))
    ]);

    ret.push([
        'No bedrooms', {
            ...property,
            numberOfBathrooms: 0
        }
    ]);
    return ret;
}

async function createProperty(property) {
    const url = `${hostname}/property`;
    const result = await rp({
        url,
        json: true,
        simple: false,
        method: 'POST',
        body: property
    });
    await logOnVerbose('POST', url, result);

    expect(result).to.deep.equal(property);
}

async function expectNotToExist(property) {
    const url = `${hostname}/property/${property.airbnbId}`;
    const result = await rp({
        url,
        json: true,
        simple: false
    });
    await logOnVerbose('GET', url, result);

    expect(result.id).to.equal(property.airbnbId);
    expect(result.error).to.equal('Property not found!');
}

async function expectToExist(property) {
    const url = `${hostname}/property/${property.airbnbId}`;
    const result = await rp({
        url,
        json: true,
        simple: false,
        qs: {
            with_archived: 'true'
        }
    });
    await logOnVerbose('GET', url, result);

    expect(result).to.deep.include(property);
}

async function deleteProperty(property) {
    const url = `${hostname}/property/${property.airbnbId}`;
    const result = await rp({
        url,
        json: true,
        simple: false,
        method: 'DELETE'
    });
    await logOnVerbose('DELETE', url, result);

    expect(result.propertiesDeleted).to.equal(1);
    expect(result.message).to.equal(`Deleted property ${property.airbnbId}`);
}

async function updateProperty(property) {
    const url = `${hostname}/property/${property.airbnbId}`;
    const ret = await rp({
        url,
        json: true,
        simple: false,
        method: 'PUT',
        body: property
    });

    await logOnVerbose('PUT', url, ret);

    return ret;

}

async function logOnVerbose(method, url, response) {
    if (!isVerbose) {
        return;
    }

    console.log({
        message: `${method} request to URL ${url}`,
        response
    });

    // This delay is to show results one-by-one
    await Promise.delay(1000);
}