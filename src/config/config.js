const fs = require('fs');
const path = require('path');

let config;
try {
    const configPath = path.join(__dirname, 'config.json'); // Ensure correct path
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
    console.error('Error loading config.json:', error.message);
    process.exit(1); // Exit the app if the config is critical
}
