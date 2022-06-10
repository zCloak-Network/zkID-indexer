import { getTRepository } from "../database";
import { PoapEntity } from "../database/entity/Poap";
import { IMintPoapProcessor } from "./processorsInterface";
import * as log4js from "../utils/log4js";
import { BLOCKTYPE } from "../utils/task";

export default class MintPoapProcessors implements IMintPoapProcessor {
  async updateFinalized(transactionHash: string, versionId: number): Promise<void> {
    const PoapRepository = await getTRepository(PoapEntity);
    await PoapRepository.update(
      { transactionHash: transactionHash, versionId: versionId },
      { blockType: BLOCKTYPE.FINALIZED }
    ).then((res) => {
      if (res.affected === 1) log4js.info(`update poap(${transactionHash}) to finalized`);
    });
  }

  async isExisted(transactionHash: string, versionId: number, blockType: string): Promise<boolean> {
    const PoapRepository = await getTRepository(PoapEntity);
    const result = await PoapRepository.findOneBy({
      versionId: versionId,
      blockType: blockType,
      transactionHash: transactionHash,
    });
    return result === null ? false : true;
  }

  async saveBest(receiptLogData: PoapEntity, versionId: number, blockType: string): Promise<void> {
    try {
      const PoapRepository = await getTRepository(PoapEntity);
      receiptLogData.versionId = versionId;
      receiptLogData.blockType = blockType;
      receiptLogData.whoHex = receiptLogData.who.toLowerCase();
      await PoapRepository.save(receiptLogData as unknown as PoapEntity).then((res) =>
        log4js.info(`mysql save ${PoapRepository.metadata.tableName}\n${JSON.stringify(res)}`)
      );
    } catch (error) {
      log4js.error("The error occurs in saving Poap.");
      throw new Error(error + "");
    }
  }

  isAdapt(eventType: string): boolean {
    if (eventType === "MintPoap") {
      return true;
    }
    return false;
  }
}
