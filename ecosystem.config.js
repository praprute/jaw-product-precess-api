module.exports = {
  apps: [
    {
      name: "main api",
      // script: "dist/src/app.js",
      script: "yarn",
      watch: true,
      autorestart: true,
      // args: "shivkumarscript",
      args: "shivkumarscript",
      env: {
        PORT: 1337,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 1337,
        NODE_ENV: "production",
      },
    },
  ],
};
