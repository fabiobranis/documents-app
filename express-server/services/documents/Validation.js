import {check} from 'express-validator/check';
import Document from '../../models/Document';

/**
 * Validate if document exists
 * @type {ValidationChain}
 */
const checkDocumentExists = check('id')
    .custom(async value => {
        let document = await Document.findById(value)
        if (document) {
            return true;
        }
        return false;
    })
    .withMessage('Document does not exists');

/**
 * Validate if document is already blacklisted
 * @type {ValidationChain}
 */
const checkDocumentIsBlackListed = check('id')
    .custom(async value => {
        let document = await Document.findById(value)
        if (document) {
            return !document.blacklist;
        }
    })
    .withMessage('Document is already in blacklist');

/**
 * Validate if document is already out of blacklisted
 * @type {ValidationChain}
 */
const checkDocumentIsNotBlackListed = check('id')
    .custom(async value => {
        let document = await Document.findById(value)
        return document.blacklist;
    })
    .withMessage('Document is already out of blacklist');

/**
 * Validate if the name exists
 * @type {ValidationChain}
 */
const checkNameExists = check('name')
    .custom(async value => {
        let document = await Document.findOne({name: value})
        if (document) {
            return false;
        }
        return true;
    })
    .withMessage('Name is already in use');

/**
 * Validate if the number length matches with the document type
 * @type {ValidationChain}
 */
const checkNumberLength = check('number')
    .custom((value, {req}) => {
        const type = req.body.type;
        return (type === 'Person' && value.length === 11) || (type === 'Company' && value.length === 14);
    })
    .withMessage(
        'Document length must match the patterns (14 to type Company and 11 to type Person)'
    );


/**
 * Validate if the number does not exists
 * @type {ValidationChain}
 */
const checkNumberExists = check('number')
    .custom(async value => {
        let document = await Document.findOne({number: value})
        if (document) {
            return false;
        }
        return true;

    })
    .withMessage('Number is already in use');

/**
 * Validate if the type is in the allowed data
 * @type {ValidationChain}
 */
const checkTypeIn = check('type').isIn(['Person', 'Company']);

// constant that will hold the validations
const ValidatesDocument = {};

// create validators
ValidatesDocument.create = [
    checkNameExists,
    checkNumberLength,
    checkNumberExists,
    checkTypeIn
];

// update validators
ValidatesDocument.update = [
    checkNumberLength,
    checkTypeIn
];

// set to blacklist validators
ValidatesDocument.setBlacklisted = [
    checkDocumentExists,
    checkDocumentIsBlackListed
];

// remove from blacklist validators
ValidatesDocument.removeFromBlacklist = [
    checkDocumentExists,
    checkDocumentIsNotBlackListed
];

export default ValidatesDocument;
