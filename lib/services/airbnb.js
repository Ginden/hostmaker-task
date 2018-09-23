'use strict';

const rp = require('request-promise');
const NodeCache = require('node-cache');
const _rp = Symbol('AirbnbChecker#requestLibrary');
const _cache = Symbol('AirbnbChecker#cache');
const Promise = require('bluebird');

class AirbnbChecker {
    constructor(requestLibrary = rp) {
        this[_rp] = requestLibrary;
        this[_cache] = new NodeCache({
            stdTTL: 60 * 60 // One hour cache
        });
    }

    /**
     * This methods checks for presence of given ID on Airbnb site
     * @param {number} id Airbnb ID
     * @returns {Promise.<Boolean>} Promise indicating if
     */
    isValidId(id) {
        if (this[_cache].get(id) !== undefined) {
            return Promise.resolve(this[_cache].get(id));
        }
        return Promise.resolve(this[_rp]({
            method: 'GET',
            followRedirect: false,
            url: `https://www.airbnb.co.uk/rooms/${id}`,
            simple: false,
            resolveWithFullResponse: true,
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:62.0) Gecko/20100101 Firefox/62.0'
            }
        }))
            .then(({statusCode}) => {
                if (statusCode === 200) {
                    return true;
                } else if (statusCode === 302) {
                    return false;
                }
                throw new Error(`Airbnb returned statusCode=${statusCode}. It should be either 200 or 302`);
            })
            .tap(isValid => this[_cache].set(id, isValid));
    }
}

module.exports = AirbnbChecker;