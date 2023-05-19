[1;33m[0m[1;33m─────────────────────────────────────────────────────────────────────────────────────────────────────────[0m
[1;33mmodified: package.json
[1;33m─────────────────────────────────────────────────────────────────────────────────────────────────────────[0m
[1;35m[1;35m@ package.json:2 @[1m[0m
{[m
[32m[32m[m[32m  "homepage": "https://unclegabi.github.io/react-quiz-app",[m[0m
  "name": "react-quiz-app",[m
  "private": true,[m
  "version": "0.0.0",[m
[1;33m[0m[1;33m─────────────────────────────────────────────────────────────────────────────────────────────────────────[0m
[1;33mmodified: vite.config.ts
[1;33m─────────────────────────────────────────────────────────────────────────────────────────────────────────[0m
[1;35m[1;35m@ vite.config.ts:6 @[1m[1m[38;5;146m import react from "@vitejs/plugin-react";[0m
[m
// https://vitejs.dev/config/[m
export default defineConfig({[m
[31m[31m  base: "/[7munclegabi.github.io[27m",[m[0m
[32m[32m[m[32m  base: "/[7mreact-quiz-app/[27m",[m[0m
  plugins: [react()],[m
});[m
