const express = require('express');
const cors = require('cors');
const { Octokit } = require("@octokit/rest");
const dgram = require('dgram'); 
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // PENTING: Agar req.body tidak undefined

const server = http.createServer(app);
const io = new Server(server, { 
    cors: { origin: "*" } 
});

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const syslogServer = dgram.createSocket('udp4');

// --- 1. MONITORING: Syslog Listener (MikroTik) ---
syslogServer.on('message', (msg, rinfo) => {
    const logRaw = msg.toString();
    
    // Log ke Konsol Backend (Nuansa Telkom Monitor)
    console.log(`[TELKOM-SYS] Packet from ${rinfo.address} | Message: ${logRaw}`);

    // Klasifikasi Alert sederhana
    let alertType = "INFO";
    if (logRaw.includes("logged in") || logRaw.includes("changed by") || logRaw.includes("critical")) {
        alertType = "SECURITY";
        console.log("🎯 ALERT: Security Activity Detected!");
    }

    // Kirim ke Svelte via Socket.io
    io.emit('network-alert', {
        type: alertType,
        message: logRaw,
        source: rinfo.address,
        time: new Date().toLocaleTimeString('id-ID')
    });
});

syslogServer.bind(5514, '0.0.0.0', () => {
    console.log("📡 [TELKOM] Syslog Listener Active on Port 5514");
});

// --- 2. PROVISIONING: Save & Deploy API ---
app.post('/api/save-and-deploy', async (req, res) => {
    const { hosts, yaml } = req.body;
    const owner = 'farahmyfz';
    const repo = 'zero-touch-branch-network-provisioning';

    try {
        console.log("🛠️ [TELKOM-OPS] Syncing Configuration to GitHub...");
        
        const updateFile = async (path, content, message) => {
            const { data: file } = await octokit.repos.getContent({ owner, repo, path });
            return octokit.repos.createOrUpdateFileContents({
                owner, repo, path,
                message,
                content: Buffer.from(content).toString('base64'),
                sha: file.sha
            });
        };

        await updateFile('hosts.ini', hosts, 'Update via Telkom Control Center');
        await updateFile('setup_sistem.yml', yaml, 'Update via Telkom Control Center');

        console.log(" [TELKOM-OPS] Triggering GitHub Actions Pipeline...");
        await octokit.actions.createWorkflowDispatch({
            owner, repo,
            workflow_id: 'deploy.yml',
            ref: 'main',
            inputs: { target_router: 'R1' }
        });

        res.json({ status: "success", message: "Deployment Pipeline Started!" });
    } catch (error) {
        console.error("❌ [ERROR]", error.message);
        res.status(500).json({ status: "error", message: error.message });
    }
});

server.listen(5000, () => {
    console.log("🔴 [TELKOM] Control Center Backend Running on Port 5000");
});