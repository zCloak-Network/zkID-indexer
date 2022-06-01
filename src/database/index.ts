import { DataSource } from "typeorm";
import { getIndexerDataSource } from "./data-source";
import * as log4js from "../utils/log4js";

let IndexerDataSource: DataSource;

export async function initDataSource(mysqlConfig: any) {
  IndexerDataSource = getIndexerDataSource(mysqlConfig);
  !IndexerDataSource.isInitialized && (await IndexerDataSource.initialize());
  log4js.info("MySQL Connected");
}

export async function destroyDataSource() {
  IndexerDataSource.isInitialized && (await IndexerDataSource.destroy());
}

export async function getTRepository(T) {
  checkInit();
  return await IndexerDataSource.getRepository(T);
}

function checkInit() {
  if (!IndexerDataSource.isInitialized) {
    throw new Error("Init database first!");
  }
}
