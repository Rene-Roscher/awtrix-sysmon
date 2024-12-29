const SystemMonitorService = require('./SystemMonitorService.js');
// const SpeedTestService = require('./SpeedTestService.js');
const GitHubStatsService = require('./GitHubStatsService.js');

const { setImmediateInterval } = require('../utils/Timings.js');

module.exports = {
    init: async (apiInstance, services = {
        resourceMonitor: true,
        speedTest: false,
        githubStats: true,
    }) => {
        console.log('Starting services...');

        // Update system metrics
        if (services.resourceMonitor)
            setImmediateInterval(() => SystemMonitorService.updateAllSystemMetrics(apiInstance), 5 * 1000);

        // Run speed test
        // if (services.speedTest)
            // setImmediateInterval(() => SpeedTestService.runSpeedTest(apiInstance), 60 * 60 * 1000);

        // Update GitHub stats
        if (services.githubStats)
            setImmediateInterval(() => GitHubStatsService.updateGitHubStats(apiInstance, 'Rene-Roscher'), 20 * 60 * 1000);

        // Update GitHub contributions
        // setImmediateInterval(() => GitHubContributionsService.updateGitHubContributions(apiInstance, 'Rene-Roscher'), 20*60*1000);

        console.log('Services started.');
    }
}
