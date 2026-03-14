import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiDir = path.join(__dirname, 'api');
const files = fs.readdirSync(apiDir).filter(f => f.endsWith('.js') && !f.includes('['));

let switchBody = '';

for (const file of files) {
    const endpointName = file.replace('.js', '');
    const content = fs.readFileSync(path.join(apiDir, file), 'utf8');

    const match = content.match(/export default async function handler\(req, res\) \{([\s\S]+?)\n\}/);
    if (match) {
        let fnBody = match[1];
        switchBody += `    case '${endpointName}': {\n${fnBody}\n    }\n`;
    }
}

const finalFileContent = `
export default async function handler(req, res) {
  let endpoint = req.query?.endpoint;
  if (!endpoint) {
    endpoint = req.url.split('?')[0].split('/').pop();
  }
  
  switch (endpoint) {
${switchBody}
    default:
      return res.status(404).json({ error: 'Not found' });
  }
}
`;

fs.writeFileSync(path.join(apiDir, '[endpoint].js'), finalFileContent);

for (const file of files) {
    fs.unlinkSync(path.join(apiDir, file));
}
console.log('Consolidated API routes successfully.');
