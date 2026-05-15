const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync('gemini_output.txt', 'utf8');

const parts = raw.split(/^=== FILE: (.+?) ===/m);
parts.shift();

let created = 0;
for (let i = 0; i < parts.length; i += 2) {
    const filePath = parts[i].trim();
    const content = parts[i + 1].replace(/^\n/, '').replace(/\n$/, '');
    const dir = path.dirname(filePath);
    if (dir !== '.') fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, content);
    console.log('✓', filePath);
    created++;
}
console.log(`\nDone — ${created} files created.`);