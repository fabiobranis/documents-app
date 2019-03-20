/**
 * Formats the document number according to the document type
 * @param string
 * @param type
 * @returns {*}
 */
export default (string, type = null) => {
    if (type === 'Person') {
        return string.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    }

    if (type === 'Company') {
        return string.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
    }
    return string;
}