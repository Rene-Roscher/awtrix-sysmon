import axios from "axios";

export default class AwtrixAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    /**
     * Send an HTTP request
     * @param {string} endpoint - API endpoint
     * @param {string} method - HTTP method
     * @param {Object} [data] - Request payload
     * @returns {Promise}
     */
    async sendHTTPRequest(endpoint, method, data = null) {
        try {
            const response = await axios({
                url: `${this.baseURL}${endpoint}`,
                method,
                data,
            });
            return response.data;
        } catch (error) {
            console.error(`HTTP Error: ${error.message}`);
            throw error;
        }
    }
}
