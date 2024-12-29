const SystemMonitorService = require('./SystemMonitorService.js');
// const SpeedTestService = require('./SpeedTestService.js');
const GitHubStatsService = require('./GitHubStatsService.js');

const { setImmediateInterval } = require('../utils/Timings.js');

module.exports = {
    init: async (apiInstance) => {
        console.log('Starting services...');

        // Update system metrics
        setImmediateInterval(() => SystemMonitorService.updateAllSystemMetrics(apiInstance), 5 * 1000);

        // Run speed test
        // setImmediateInterval(() => SpeedTestService.runSpeedTest(apiInstance), 60 * 60 * 1000);

        // Update GitHub stats
        setImmediateInterval(() => GitHubStatsService.updateGitHubStats(apiInstance, 'Rene-Roscher'), 20 * 60 * 1000);

        // Update GitHub contributions
        // setImmediateInterval(() => GitHubContributionsService.updateGitHubContributions(apiInstance, 'Rene-Roscher'), 20*60*1000);

        console.log('Services started.');
    }
}
