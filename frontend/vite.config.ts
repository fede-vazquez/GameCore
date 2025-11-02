import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'

const root = (dir: string = '') => path.resolve(__dirname, 'src', dir)

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': root()
		}
	}
})
