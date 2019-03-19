import { check } from 'express-validator/check';
import Document from '../../models/Document';

/**
 * Validate if the name exists
 * @type {ValidationChain}
 */
const checkNameExists = check('name')
    .custom(value => {
        Document.findOne({ name: value }).then(document => {
            if (document) {
                return false;
            }
            return true;
        });
    })
    .withMessage('Name is already in use');

/**
 * Validate if the number length matches with the document type
 * @type {ValidationChain}
 */
const checkNumberLength = check('number')
    .custom((value, { req }) => req.type === 'Person' && value.length !== 11)
    .withMessage(
        'When document type is Person, then the document number lenght must be equals to 11'
    )
    .custom((value, { req }) => req.type === 'Company' && value.length !== 14)
    .withMessage(
        'When document type is Company, then the document number lenght must be equals to 14'
    );

/**
 * Validate if the number does not exists
 * @type {ValidationChain}
 */
const checkNumberExists = check('number')
    .custom(value => {
        Document.findOne({ number: value }).then(document => {
            if (document) {
                return false;
            }
            return true;
        });
    })
    .withMessage('Number is already in use');

/**
 * Validate if the type is in the allowed data
 * @type {ValidationChain}
 */
const checkTypeIn = check('type').isIn(['Person', 'Company']);

const ValidatesDocument = {};

ValidatesDocument.create = [
    checkNameExists,
    checkNumberLength,
    checkNumberExists,
    checkTypeIn
];

ValidatesDocument.update = [
    checkNumberLength,
    checkTypeIn
];

export default ValidatesDocument;
