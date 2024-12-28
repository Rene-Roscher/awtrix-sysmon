import MessageHelper from '../utils/MessageHelper.js';
import { execSync } from 'child_process';
import Colors from '../utils/Colors.js';
import { formatBytes } from "../utils/Bytes.js";

export default class SystemMonitorService {
    static getSystemData() {
        try {
            const cpuLoad = parseFloat(execSync("grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {print usage}'").toString().trim()).toFixed(2);

            const ramUsage = parseFloat(execSync("free | grep Mem | awk '{print $3/$2 * 100.0}'").toString().trim()).toFixed(2);

            const uptimeOutput = execSync('uptime -p').toString().trim();
            const uptime = uptimeOutput.replace('up ', '');

            let gpuUsage = 'N/A';
            try {
                const gpuOutput = execSync('nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits').toString().trim();
                gpuUsage = parseFloat(gpuOutput).toFixed(2);
            } catch (gpuError) {
                console.warn('nvidia-smi not found, skipping GPU usage check.');
            }

            const diskUsageOutput = execSync("df -h --total | grep 'total' | awk '{print $5}'").toString().trim();
            const diskUsage = parseFloat(diskUsageOutput.replace('%', '')).toFixed(2);

            const networkInterface = 'enp39s0';
            const rxBytes = parseInt(execSync(`cat /sys/class/net/${networkInterface}/statistics/rx_bytes`).toString().trim());
            const txBytes = parseInt(execSync(`cat /sys/class/net/${networkInterface}/statistics/tx_bytes`).toString().trim());

            return { cpu: cpuLoad, ram: ramUsage, uptime, gpu: gpuUsage, disk: diskUsage, rxBytes, txBytes };
        } catch (error) {
            return { cpu: 'N/A', ram: 'N/A', uptime: 'N/A', gpu: 'N/A', disk: 'N/A', rxBytes: 'N/A', txBytes: 'N/A' };
        }
    }

    static async updateAllSystemMetrics(apiInstance, apps = {
        cpu: 'cpuApp',
        ram: 'ramApp',
        uptime: 'uptimeApp',
        gpu: 'gpuApp',
        disk: 'diskApp',
        network: 'networkApp'
    }) {
        console.log('Updating system metrics...');
        const data = this.getSystemData();

        for (const [metricType, appName] of Object.entries(apps)) {
            console.log(`Updating ${metricType} metric...`);
            await this.updateSystemMetric(apiInstance, appName, metricType, data);
            console.log(`${metricType} metric updated.`);
        }
    }

    static async updateSystemMetric(apiInstance, appName, metricType, data) {
        let metricValue, metricText, progressColor;

        switch (metricType) {
            case 'cpu':
                metricValue = parseFloat(data.cpu);
                metricText = 'CPU';
                progressColor = metricValue > 80 ? Colors.red['500'] : Colors.green['500'];
                break;
            case 'ram':
                metricValue = parseFloat(data.ram);
                metricText = 'RAM';
                progressColor = metricValue > 80 ? Colors.red['500'] : Colors.green['500'];
                break;
            case 'uptime':
                metricValue = data.uptime;
                metricText = 'Uptime';
                progressColor = Colors.cyan['500'];
                break;
            case 'gpu':
                metricValue = parseFloat(data.gpu);
                metricText = 'GPU';
                progressColor = metricValue > 80 ? Colors.red['500'] : Colors.green['500'];
                break;
            case 'disk':
                metricValue = parseFloat(data.disk);
                metricText = 'Disk';
                progressColor = metricValue > 80 ? Colors.red['500'] : Colors.green['500'];
                break;
            case 'network':
                const rxMB = formatBytes(data.rxBytes, 2);
                const txMB = formatBytes(data.txBytes, 2);
                metricValue = `${rxMB} RX, ${txMB} TX`;
                metricText = 'Network';
                progressColor = Colors.pink['500'];
                break;
            default:
                console.error(`Unbekannter Metriktyp: ${metricType}`);
                return;
        }

        const payload = MessageHelper.createPayload(
            [
                MessageHelper.formatText(`${metricValue}${['uptime', 'network'].includes(metricType) ? '' : '%'}`, progressColor),
                MessageHelper.formatText(` ${metricText}`)
            ],
            {
                progress: ['uptime', 'network'].includes(metricType) ? undefined : metricValue,
                progressC: progressColor,
                progressBC: Colors.gray['800']
            }
        );

        await apiInstance.sendHTTPRequest(`/api/custom?name=${appName}`, 'POST', payload);
    }
}
