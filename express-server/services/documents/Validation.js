import { check } from 'express-validator/check';

const ValidatesDocument = {};

ValidatesDocument.create = () => {
    return [
        check('name', 'Name already exists').exists(),
        check('number', 'Document already exists').custom(
            (value, { request }) => {
                if (request.type === 'Person' && value.length !== 11) {
                    throw new Error(
                        'When document type is Person, then the document number lenght must be equals to 11'
                    );
                }

                if (request.type === 'Company' && value.length !== 14) {
                    throw new Error(
                        'When document type is Company, then the document number lenght must be equals to 14'
                    );
                }
            }
        ),
        check('type').isIn(['Person', 'Company'])
    ];
};
