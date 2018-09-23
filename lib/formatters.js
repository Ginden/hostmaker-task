'use strict';



/**
 * This function convers Property instance to nice object to be returned to user.
 * This could be implemented as Property#toJson method
 * @param {Property} prop Sequelize instance of Property
 * @return {object} Plain JS object
 */
function propertyToJson(prop) {
    const ret = {
        owner: prop.Host,
        address: stripEmptyAddressLines({
            line1: prop.AdressLine1,
            line2: prop.AdressLine2,
            line3: prop.AdressLine3,
            line4: prop.AdressLine4,
            postCode: prop.Postcode,
            city: prop.City,
            country: prop.Country
        }),
        airbnbId: prop.id,
        numberOfBedrooms: prop.numberOfBedrooms,
        numberOfBathrooms: prop.numberOfBathrooms,
        incomeGenerated: Number(prop.incomeGenerated)
    };

    return ret;
}

/**
 * Builds instance of Property
 * @param {class} Property Sequelize model
 * @param {object} json Plain JS object
 * @return {Model|Model[]|*} Built instance
 */
function propertyFromJson(Property, json) {

    return Property.build(propertyLiteralFromJson(json));
}

/**
 * Creates literal used by Sequlize .update method
 * @param {object} json Plain JSON object
 * @return {object} Object ready to use by Sequelize methods
 *
 */
function propertyLiteralFromJson(json) {
    const {
        line1: AdressLine1,
        line2: AdressLine2 = '',
        line3: AdressLine3 = '',
        line4: AdressLine4,
        postCode: Postcode,
        city: City,
        country: Country
    } = json.address;
    return {
        id: json.airbnbId,
        numberOfBedrooms: json.numberOfBedrooms,
        numberOfBathrooms: json.numberOfBathrooms,
        incomeGenerated: json.incomeGenerated,
        Host: json.owner,
        AdressLine1,
        AdressLine2,
        AdressLine3,
        AdressLine4,
        Postcode,
        City,
        Country
    };
}


function stripEmptyAddressLines(obj) {
    const ret = {...obj};
    if (!ret.line2) Reflect.deleteProperty(ret, 'line2');
    if (!ret.line3) Reflect.deleteProperty(ret, 'line3');
    return ret;
}

module.exports.propertyToJson = propertyToJson;
module.exports.propertyFromJson = propertyFromJson;
module.exports.propertyLiteralFromJson = propertyLiteralFromJson;