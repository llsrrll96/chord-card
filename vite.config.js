import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Windows + Docker 볼륨에서 파일 변경 감지를 위해 polling 사용
    watch: { usePolling: true },
  },
  test: {
    environment: 'node',
  },
})
