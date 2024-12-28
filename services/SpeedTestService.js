import MessageHelper from '../utils/MessageHelper.js';
import speedTest from 'speedtest-net';
import Colors from "../utils/Colors.js";

export default class SpeedTestService {
    static async runSpeedTest(apiInstance, appName = 'speedTestApp') {
        console.log('Running speed test...');
        try {
            const testResults = await speedTest({ acceptLicense: true, acceptGdpr: true });
            const downloadSpeed = (testResults.download.bandwidth / 125000).toFixed(0);
            const uploadSpeed = (testResults.upload.bandwidth / 125000).toFixed(0);
            const ping = testResults.ping.latency;

            const payload = MessageHelper.createPayload([
                MessageHelper.formatText(`${downloadSpeed}`, downloadSpeed > 50 ? Colors.green["500"] : Colors.red["500"]), // DL Speed
                MessageHelper.formatText('Down'), // DL suffix
                MessageHelper.formatText(`${uploadSpeed}`, uploadSpeed > 20 ? Colors.green["500"] : Colors.red["500"]),
                MessageHelper.formatText('Up'), // UL suffix
                MessageHelper.formatText(`${ping.toFixed(0)}ms`, ping < 50 ? Colors.teal["500"] : Colors.yellow["500"]),
                // MessageHelper.formatText(`${testResults.interface.externalIp}`, Colors.green["500"]),
            ], { spacer: true });

            await apiInstance.sendHTTPRequest(`/api/custom?name=${appName}`, 'POST', payload);
            console.log(`Speedtest updated - Download: ${downloadSpeed} Mbps, Upload: ${uploadSpeed} Mbps, Ping: ${ping} ms`);
        } catch (error) {
            console.error("Error during speed test:", error.message);
        }
    }
}
