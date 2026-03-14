import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const netlifyFunctionsPlugin = () => ({
  name: 'netlify-functions',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url.startsWith('/.netlify/functions/')) {
        const functionName = req.url.split('/')[3].split('?')[0];
        const funcPath = path.resolve(__dirname, 'netlify/functions', `${functionName}.js`);

        if (fs.existsSync(funcPath)) {
          try {
            delete require.cache[require.resolve(funcPath)];
            const func = require(funcPath);

            let body = '';
            if (req.method === 'POST' || req.method === 'PUT') {
              body = await new Promise(resolve => {
                let data = '';
                req.on('data', (chunk: any) => data += chunk.toString());
                req.on('end', () => resolve(data));
              });
            }

            const event = {
              path: req.url,
              httpMethod: req.method,
              queryStringParameters: {},
              body: body
            };

            const result = await func.handler(event, {});

            res.statusCode = result.statusCode || 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(result.body);
            return;
          } catch (e: any) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
            return;
          }
        }
      }
      next();
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    netlifyFunctionsPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
