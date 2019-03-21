import ServerStats from '../services/stats/ServerStats';

const ServerStatsController = {};

ServerStatsController.get = async (request, response) => {
    return ServerStats.getData(request, response);
};

export default ServerStatsController;