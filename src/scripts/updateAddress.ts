import Web3 from "web3";
import { getTRepository } from "../database";
import { ProofEntity } from "../database/entity/Proof";
import { initTask, loadConfigFile } from "../utils/task";
import * as log4js from "../utils/log4js";
import { VerifyingEntity } from "../database/entity/Verifying";
import { CanonicalEntity } from "../database/entity/Canonical";
import { PoapEntity } from "../database/entity/Poap";

async function updateProofAddress() {
  const proofRepository = await getTRepository(ProofEntity);
  const proofs = await proofRepository.find();
  for (let i = 0; i < proofs.length; i++) {
    const item = proofs[i] as ProofEntity;
    if (item.dataOwnerHex === null) {
      item.dataOwnerHex = item.dataOwner.toLowerCase();
      await proofRepository
        .save(item)
        .then((res) => {
          log4js.info(`${JSON.stringify(res)} update success`);
        })
        .catch((error) => {
          log4js.error(`${JSON.stringify(item)} save error\n ${error}`);
        });
    }
  }
}
async function updateVerifyingAddress() {
  const verifyingRepository = await getTRepository(VerifyingEntity);
  const verifyings = await verifyingRepository.find();
  for (let i = 0; i < verifyings.length; i++) {
    const item = verifyings[i] as VerifyingEntity;
    if (item.cOwnerHex === null) {
      item.cOwnerHex = item.cOwner.toLowerCase();
      await verifyingRepository
        .save(item)
        .then((res) => {
          log4js.info(`${JSON.stringify(res)} update success`);
        })
        .catch((error) => {
          log4js.error(`${JSON.stringify(item)} save error\n ${error}`);
        });
    }
  }
}

async function updateCanonicalAddress() {
  const canonicalRepository = await getTRepository(CanonicalEntity);
  const canonicals = await canonicalRepository.find();
  for (let i = 0; i < canonicals.length; i++) {
    const item = canonicals[i] as CanonicalEntity;
    if (item.cOwnerHex === null) {
      item.cOwnerHex = item.cOwner.toLowerCase();
      await canonicalRepository
        .save(item)
        .then((res) => {
          log4js.info(`${JSON.stringify(res)} update success`);
        })
        .catch((error) => {
          log4js.error(`${JSON.stringify(item)} save error\n ${error}`);
        });
    }
  }
}

async function updatePoapAddress() {
  const PoapRepository = await getTRepository(PoapEntity);
  const poaps = await PoapRepository.find();
  for (let i = 0; i < poaps.length; i++) {
    const item = poaps[i] as PoapEntity;
    if (item.whoHex === null) {
      item.whoHex = item.who.toLowerCase();
      await PoapRepository.save(item)
        .then((res) => {
          log4js.info(`${JSON.stringify(res)} update success`);
        })
        .catch((error) => {
          log4js.error(`${JSON.stringify(item)} save error\n ${error}`);
        });
    }
  }
}
async function main() {
  const config = loadConfigFile(process.argv);
  await initTask(config);
  await updateProofAddress();
  await updateVerifyingAddress();
  await updateCanonicalAddress();
  await updatePoapAddress();
  log4js.info("Completed the upgrade address.");
  process.exit(1);
}

main();
