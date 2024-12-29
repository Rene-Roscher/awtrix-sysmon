import SystemMonitorService from './SystemMonitorService.js';
import SpeedTestService from './SpeedTestService.js';
import GitHubStatsService from './GitHubStatsService.js';
import { setImmediateInterval } from "../utils/Timings.js";

export default {
    init: async (apiInstance) => {
        console.log('Starting services...');

        // Update system metrics
        setImmediateInterval(() => SystemMonitorService.updateAllSystemMetrics(apiInstance), 10*1000);
        //
        // // Run speed test
        setImmediateInterval(() => SpeedTestService.runSpeedTest(apiInstance), 60*60*1000);
        //
        // // Update GitHub stats
        setImmediateInterval(() => GitHubStatsService.updateGitHubStats(apiInstance, 'Rene-Roscher'), 20*60*1000);

        // // Update GitHub contributions
        // setImmediateInterval(() => GitHubContributionsService.updateGitHubContributions(apiInstance, 'Rene-Roscher'), 20*60*1000);

        console.log('Services started.');
    }
}
