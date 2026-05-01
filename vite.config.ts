import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 시 레포 이름으로 변경 (예: '/my-repo/')
  // 커스텀 도메인 사용 시 '/'로 설정
  base: process.env.VITE_BASE_PATH ?? '/',
})
