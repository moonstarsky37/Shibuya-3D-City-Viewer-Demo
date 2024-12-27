const fs = require('fs');
const path = require('path');

// 根目錄和伺服器基礎 URL
const baseUrl = "http://192.168.3.54:8080";
const publicDir = path.join(__dirname, 'public');

// 遞歸查找 tileset.json 文件
function getTilesetUrls(dir) {
    let urls = [];
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            urls = urls.concat(getTilesetUrls(fullPath));
        } else if (file.name === 'tileset.json') {
            const relativePath = path.relative(publicDir, fullPath);
            urls.push(`${baseUrl}/${relativePath.replace(/\\/g, '/')}`);
        }
    }
    return urls;
}

const tilesets = getTilesetUrls(publicDir);
console.log(JSON.stringify(tilesets, null, 2));

