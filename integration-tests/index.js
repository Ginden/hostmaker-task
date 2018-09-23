'use strict';
/* eslint no-console: 0 */
const rp = require('request-promise');
const {expect} = require('chai');
const _ = require('lodash');

const port = process.env.PORT || 8432;
const hostname = `http://localhost:${port}`;

const ankurProperty = require('./fixtures/ankur-prop');
const carlosProperty = require('./fixtures/carlos-prop');
const elaineProperty = require('./fixtures/elaine-prop');


(async () => {

    console.log('We check if getting non-existant property returns error');
    await expectNotToExist(ankurProperty);
    await expectNotToExist(carlosProperty);
    await expectNotToExist(elaineProperty);
    console.log('These 3 properties (owned by Ankur, Carlos and Elaine couldn\'t be found');

    console.log('Now we will create these 3 properties');

    await createProperty(ankurProperty);
    await createProperty(carlosProperty);
    await createProperty(elaineProperty);

    console.log('Succesfully created all properties');

    console.log('Now we check if these properties can be returned from API');

    await expectToExist(ankurProperty);
    await expectToExist(carlosProperty);
    await expectToExist(elaineProperty);

    console.log('All these properties exist!');

    console.log('Ankur removed his property from our site - deleting it');
    await deleteProperty(ankurProperty);


    await expectNotToExist(ankurProperty);

    console.log('And now, his property is not in DB anymore');

    console.log('Elaine made some changes to her property');
    const improvedProperty = {
        ...elaineProperty,
        incomeGenerated: 1543.2,
        numberOfBedrooms: 3
    };

    await updateProperty(improvedProperty);
    await expectToExist(improvedProperty);

    console.log('And these changes are in database');

    console.log('Let\'s check if business rules are enforced');

    const malformed = generateMalformedProperties(carlosProperty);

    for(const [issue, prop] of malformed) {
        const result = await updateProperty(prop);
        expect(result).to.have.property('error');
        console.log(`${issue} generates error!`);
    }

    console.log('Time to remove all properties from database!');

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
    const reactionToCreatedProperty = await rp({
        url: `${hostname}/property`,
        json: true,
        simple: false,
        method: 'POST',
        body: property
    });
    expect(reactionToCreatedProperty).to.deep.equal(property);
}

async function expectNotToExist(property) {
    const reactionToNonExistingProperty = await rp({
        url: `${hostname}/property/${property.airbnbId}`,
        json: true,
        simple: false
    });
    expect(reactionToNonExistingProperty.id).to.equal(property.airbnbId);
    expect(reactionToNonExistingProperty.error).to.equal('Property not found!');
}

async function expectToExist(property) {
    const reactionToExistingProperty = await rp({
        url: `${hostname}/property/${property.airbnbId}`,
        json: true,
        simple: false,
        qs: {
            with_archived: 'true'
        }
    });
    expect(reactionToExistingProperty).to.deep.include(property);
}

async function deleteProperty(property) {
    const reactionToDeletingProperty = await rp({
        url: `${hostname}/property/${property.airbnbId}`,
        json: true,
        simple: false,
        method: 'DELETE'
    });
    expect(reactionToDeletingProperty.propertiesDeleted).to.equal(1);
    expect(reactionToDeletingProperty.message).to.equal(`Deleted property ${property.airbnbId}`);
}

async function updateProperty(property) {
    return rp({
        url: `${hostname}/property/${property.airbnbId}`,
        json: true,
        simple: false,
        method: 'PUT',
        body: property
    });

}