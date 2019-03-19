import Document from '../../models/Document';

/**
 * Returns the index of documents
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
export default async (request, response) => {

    try {
        const queryStrings = request.query;
        const filters = {};
        const protectedKeys = ['__v']; // fields that wont be used to filter

        // find the available fields
        const fields = Object.keys(Document.schema.paths).filter(f => !(protectedKeys.indexOf(f) > -1) );

        for (let field in queryStrings) {
            if (fields.indexOf(field) >= 0) {
                filters[field] = new RegExp(queryStrings[field]);
            }
        }

        /**
         * Set the options to the query
         * page is the actual page - default 1
         * limit is the page length - default 5
         * sort is field to sort - default -created_at (follows the mongoose commands)
         * select is the set of fields to return - I use the available fields (filtering the __v)
         * @type {{select: string, limit: number, page: number, sort: (*|string)}}
         */
        const options = {
            page: parseInt(queryStrings.page) || 1,
            limit: parseInt(queryStrings.pageLength) || 5,
            sort: queryStrings.sort || '-created_at',
            select: fields.join(' ')
        };

        await Document.paginate(filters,options,(error, result) => {
            if (error) {
                return response.status(500).send(error);
            }
            return response.json({result});
        });

    } catch (error) {
        response.send(error);
    }
};
