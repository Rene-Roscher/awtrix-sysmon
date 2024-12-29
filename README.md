
![PVM Banner](resources/img.png)

# AWTRIX - System Monitor for Linux

![Version](https://img.shields.io/github/v/release/rene-roscher/awtrix-sysmon)
![License](https://img.shields.io/github/license/rene-roscher/awtrix-sysmon)
![Issues](https://img.shields.io/github/issues/rene-roscher/awtrix-sysmon)

---
AWTRIX System Monitor is a developer-focused tool that periodically sends **system metrics** from a **Linux machine** to a **Pixel Clock** via the **AWTRIX HTTP API**.
It is designed to run as a service and provides real-time insights into system performance directly on your Pixel Clock.

## Features

- **System Metrics Monitoring:** Collects and transmits CPU usage, memory usage, disk usage, and more.
- **Interval-Based Reporting:** Sends metrics at regular intervals to ensure up-to-date information.
- **Future Enhancements:** Plans to include integrations for Spotify playback information and internet speed tests.

## Installation

### 1. **Create Directory, Download the Binary and Make it Executable**
```bash
sudo mkdir /opt/awtrix-sysmon
sudo wget https://github.com/Rene-Roscher/awtrix-sysmon/releases/download/main/app-linux -O /opt/awtrix-sysmon/awtrix-sysmon
sudo chmod +x /opt/awtrix-sysmon/awtrix-sysmon
```

### 2. **Create a systemd service file:**
```bash
sudo nano /etc/systemd/system/awtrix-sysmon.service
```

Add the following configuration:

```ini
[Unit]
Description=AWTRIX System Monitor Service
After=network.target

[Service]
ExecStart=/opt/awtrix-sysmon/awtrix-sysmon
Restart=always
User=root
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

### 3. **Reload systemd and enable the service:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable awtrix-sysmon.service
```

### 4. **Start the service:**
```bash
sudo systemctl start awtrix-sysmon.service
```

### 5. **Verify the service status:**
```bash
sudo systemctl status awtrix-sysmon.service
```
