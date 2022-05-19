import { DataSource } from "typeorm";
import { getIndexerDataSource } from "./data-source";
let IndexerDataSource: DataSource;

export async function initDataSource(mysqlConfig: any) {
  IndexerDataSource = getIndexerDataSource(mysqlConfig);
  !IndexerDataSource.isInitialized && (await IndexerDataSource.initialize());
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
