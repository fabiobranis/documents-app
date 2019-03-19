const os = require('os'); // to use node modules without the experimental modules

/**
 * This constant holds the decorator methods to return server status from os module
 * @type {{}}
 */
const serverStats = {};

/**
 *
 * @returns {Promise<number>}
 */
serverStats.getData = async (request, response) => {
    const uptime = await os.uptime();
    const totalMemory = await os.totalmem() / (1024 * 1024);
    const freeMemory = await os.freemem() / (1024 * 1024);


    return response.json({
        uptime,
        totalMemory,
        freeMemory
    });
};

export default serverStats;
