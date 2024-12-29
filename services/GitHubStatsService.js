const axios = require('axios');
const MessageHelper = require('../utils/MessageHelper.js');
const Colors = require('../utils/Colors.js');

class GitHubStatsService {
    static async updateGitHubStats(apiInstance, username = 'TaylorOtwell', appName = 'gitHubStatsApp') {
        console.log('Updating GitHub stats...');
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            const stats = {
                repos: response.data.public_repos,
                gists: response.data.public_gists,
                followers: response.data.followers,
                following: response.data.following,
            };

            const payload = MessageHelper.createPayload([
                MessageHelper.formatText(`${stats.repos}`, stats.repos > 50 ? Colors.green["500"] : Colors.cyan["300"]),
                MessageHelper.formatText('Repos'),
                MessageHelper.formatText(`${stats.gists}`, stats.gists > 20 ? Colors.cyan["500"] : Colors.yellow["300"]),
                MessageHelper.formatText('Gists'),
                MessageHelper.formatText(`${stats.followers}`, stats.followers > 100 ? Colors.cyan["500"] : Colors.gray["200"]),
                MessageHelper.formatText('Followers'),
                MessageHelper.formatText(`${stats.following}`, stats.following > 50 ? Colors.cyan["500"] : Colors.gray["200"]),
                MessageHelper.formatText('Following'),
            ], { spacer: true });

            await apiInstance.sendHTTPRequest(`/api/custom?name=${appName}`, 'POST', payload);
            console.log(`GitHub stats updated for ${username}`);
        } catch (error) {
            console.error(`Error updating GitHub stats: ${error.message}`);
        }
    }
}

module.exports = GitHubStatsService;
