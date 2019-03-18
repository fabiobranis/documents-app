const documentValidator = {};

/**
 *
 */
documentValidator.validateDocumentLength = number => {
    // If it's a CPF/Person, then it must have 11 characters length
    if (this.type === 'Person') {
        return number.length === 11;
    }

    // if it' a CNPJ/Company, then it must have 14 charaters length
    if (this.type === 'Company') {
        return number.length === 14;
    }

    return false;
};

export default documentValidator;
