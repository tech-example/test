import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // <-- 1. import เข้ามา
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(), // <-- 2. เพิ่ม react() เข้าไปใน list (แนะนำให้อยู่ตัวแรก)
    tailwindcss(), 
    reactRouter(), 
    tsconfigPaths()
  ],
  base: '/',
});