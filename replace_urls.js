const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'client', 'src');

function findAndReplace(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            findAndReplace(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('http://localhost:5000/api')) {
                let replaced = content.replace(/http:\/\/localhost:5000\/api/g, "https://e-commerce-2e5z.onrender.com/api");
                fs.writeFileSync(fullPath, replaced, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

findAndReplace(directoryPath);

// Also fix server passport config
const serverPassport = path.join(__dirname, 'server', 'config', 'passport.js');
if (fs.existsSync(serverPassport)) {
    let content = fs.readFileSync(serverPassport, 'utf8');
    content = content.replace(/http:\/\/localhost:5000\/api/g, 'https://e-commerce-2e5z.onrender.com/api');
    fs.writeFileSync(serverPassport, content, 'utf8');
    console.log(`Updated ${serverPassport}`);
}
