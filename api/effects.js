import AwtrixAPI from "./awtrix.js";

export default class EffectService {
    constructor(apiInstance) {
        if (!(apiInstance instanceof AwtrixAPI)) {
            throw new Error('Invalid API instance provided.');
        }
        this.api = apiInstance;
    }

    /**
     * Retrieve the list of available effects from the device.
     * @returns {Promise<Array>} List of effect names.
     */
    async getAvailableEffects() {
        try {
            return await this.api.sendHTTPRequest('/api/effects', 'GET');
        } catch (error) {
            console.error('Error fetching available effects:', error.message);
            throw error;
        }
    }

    /**
     * Apply a specified effect with optional settings.
     * @param {string} effectName - Name of the effect to apply.
     * @param {Object} [effectSettings={}] - Optional settings for the effect.
     * @returns {Promise<void>}
     */
    async applyEffect(effectName, effectSettings = {}) {
        const payload = {
            effect: effectName,
            effectSettings
        };

        try {
            const a = await this.api.sendHTTPRequest('/api/custom', 'POST', payload);
            console.log(`Effect "${effectName}" applied successfully.`, a);
        } catch (error) {
            console.error(`Error applying effect "${effectName}":`, error.message);
            throw error;
        }
    }
}
