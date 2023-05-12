module.exports = {
  apps: [
    {
      name: "main api",
      script: "yarn",
      watch: true,
      autorestart: true,
      args: "start",
      env: {
        PORT: 1337,
        NODE_ENV: "development",
      },
    },
  ],
};
