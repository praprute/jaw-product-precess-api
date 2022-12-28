import dotenv from "dotenv";
dotenv.config();

export default {
  port: 1337,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  db_port: process.env.DB_PORT,
  dateStrings: true,
  ssl_mode: "REQUIRED",
  dialect: "mysql",
  logging: true,
  force: true,
  timezone: "+07:00",
  secret_jwt: process.env.SECRET_JWT,
};
