#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8080;
const URL = `http://localhost:${PORT}`;

console.log('🚀 Starting Crypto Treasury Companies Preview...\n');

// 检查项目文件是否存在
const requiredFiles = ['index.html', 'script.js', 'db/MNAV.csv'];
const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));

if (missingFiles.length > 0) {
    console.error('❌ Missing required files:');
    missingFiles.forEach(file => console.error(`   - ${file}`));
    process.exit(1);
}

console.log('✅ All required files found');
console.log('📊 Data file: db/MNAV.csv');
console.log(`🌐 Preview URL: ${URL}`);
console.log('📱 The website will automatically open in your browser\n');

// 获取文件MIME类型
function getMimeType(filename) {
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
        '.svg': 'image/svg+xml',
        '.csv': 'text/csv',
        '.txt': 'text/plain'
    };
    return mimeTypes[ext] || 'application/octet-stream';
}

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    let filePath = path.join(process.cwd(), req.url === '/' ? 'index.html' : req.url);

    // 安全检查：防止目录遍历攻击
    const normalizedPath = path.normalize(filePath);
    if (!normalizedPath.startsWith(process.cwd())) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }

    // 检查文件是否存在
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                <head><title>404 Not Found</title></head>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                    <h1>🚫 404 - File Not Found</h1>
                    <p>The requested file <code>${req.url}</code> was not found.</p>
                    <p><a href="/">← Back to Home</a></p>
                </body>
                </html>
            `);
            console.log(`❌ 404: ${req.url}`);
            return;
        }

        // 读取并返回文件
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                console.error(`❌ Error reading file ${filePath}:`, err.message);
                return;
            }

            const mimeType = getMimeType(filePath);
            res.writeHead(200, {
                'Content-Type': mimeType,
                'Access-Control-Allow-Origin': '*'  // 允许跨域访问
            });
            res.end(data);
            console.log(`✅ Served: ${req.url} (${mimeType})`);
        });
    });
});

// 跨平台打开浏览器
function openBrowser(url) {
    const platform = process.platform;
    let command;

    switch (platform) {
        case 'darwin':  // macOS
            command = 'open';
            break;
        case 'win32':   // Windows
            command = 'start';
            break;
        default:        // Linux and others
            command = 'xdg-open';
            break;
    }

    exec(`${command} ${url}`, (error) => {
        if (error) {
            console.log(`💡 Please manually open: ${url}`);
        } else {
            console.log('🌐 Browser opened automatically');
        }
    });
}

// 启动服务器
function startPreviewServer() {
    console.log('⚡ Starting Node.js HTTP server...');

    server.listen(PORT, () => {
        console.log('🎉 Preview server is running!');
        console.log(`🌟 Visit: ${URL}`);
        console.log('⏹️  Press Ctrl+C to stop the server\n');

        // 延迟2秒后打开浏览器
        setTimeout(() => {
            openBrowser(URL);
        }, 2000);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`❌ Port ${PORT} is already in use!`);
            console.error('Please close other servers or use a different port');
        } else {
            console.error(`❌ Server error: ${err.message}`);
        }
        process.exit(1);
    });
}

// 处理进程退出
process.on('SIGINT', () => {
    console.log('\n🛑 Stopping preview server...');
    server.close(() => {
        console.log('👋 Preview server stopped');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0);
    });
});

// 启动预览服务器
startPreviewServer();
