==========================================================
Setup from scratch
==========================================================
VS Code
git
npm init -y - selec all default option to init repo
npm install -D @playwright/test typescript - packages to appear in repo devDependencies
npx playwright install - command to install the necessary browser binaries and their system dependencies required for Playwright to function.
npx tsc --init - initialize a TypeScript project by generating a tsconfig.json

=============================
run test
npx playwright test
=============================
