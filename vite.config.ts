import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Very simple middleware that executes our local API mock scripts
const localApiPlugin = () => ({
  name: 'vercel-api-mock',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url.startsWith('/api/')) {
        const functionName = req.url.split('/')[2].split('?')[0];
        const funcPath = path.resolve(__dirname, 'api', `${functionName}.js`);

        if (fs.existsSync(funcPath)) {
          try {
            // For ES Modules, we usually have to dynamic import or transpile. 
            // In Vite dev server, we can just grab it dynamically:
            const moduleUrl = new URL(`file://${funcPath}`).href;
            const func = await import(`${moduleUrl}?update=${Date.now()}`);

            let body = '';
            if (req.method === 'POST' || req.method === 'PUT') {
              body = await new Promise(resolve => {
                let data = '';
                req.on('data', (chunk: any) => data += chunk.toString());
                req.on('end', () => resolve(data));
              });
            }

            const mockReq = {
              method: req.method,
              url: req.url,
              body: body
            };

            const mockRes = {
              status: (code: number) => ({
                json: (data: any) => {
                  res.statusCode = code;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                }
              })
            };

            await func.default(mockReq, mockRes);
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
    localApiPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
