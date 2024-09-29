import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs'
import { defineConfig } from 'vite';
export default defineConfig({
	plugins: [
		sveltekit()
	],
	server: {
		headers: {
			'Cache-Control': 'no-store'
		},
		https: {
            key: fs.readFileSync('selfsigned_key.pem'),
            cert: fs.readFileSync('selfsigned.pem'),
        },
	}
});
