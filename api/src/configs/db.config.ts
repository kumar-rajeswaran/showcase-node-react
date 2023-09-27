import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PORT, DB_PWD, DB_USER } from "./env.config";

export const dbConfig = new DataSource({
  type: "postgres",
  host: `${DB_HOST}`,
  port: Number(DB_PORT),
  username: `${DB_USER}`,
  password: `${DB_PWD}`,
  database: `${DB_NAME}`,
  entities: ["src/entities/*.ts"],
  migrations:["migrations/*.ts"],
  logging: true,
  synchronize: true,
});
