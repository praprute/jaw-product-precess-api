module.exports = {
  apps: [
    {
      name: "main api",
      script: "./src/app.ts",
      watch: true,
      autorestart: true,
      args: "run dev",
      env: {
        PORT: 1337,
        NODE_ENV: "development",
      },
    },
  ],
};
