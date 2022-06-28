import "reflect-metadata";
import { DataSource } from "typeorm";

export function getIndexerDataSource(mysqlConfig) {
  return new DataSource({
    type: "mysql",
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    username: mysqlConfig.username,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    synchronize: false,
    logging: false,
    entities: ["src/database/entity/*.ts"],
    migrations: [],
    subscribers: [],
  });
}
