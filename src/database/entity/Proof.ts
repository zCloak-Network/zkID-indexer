import { Column, Entity } from "typeorm";
import { BaseBlockEntity } from "./BaseBlockEntity";

@Entity({ name: "raw_scan_proof" })
export class ProofEntity extends BaseBlockEntity {
  @Column({ name: "data_owner" })
  dataOwner: string;

  @Column({ name: "attester" })
  attester: string;

  @Column({ name: "ctype_hash" })
  cType: string;

  @Column({ name: "program_hash" })
  programHash: string;

  @Column({ name: "field_names", type: "json" })
  fieldNames: string[];

  @Column({ name: "proof_cid" })
  proofCid: string;

  @Column({ name: "request_hash" })
  requestHash: string;

  @Column({ name: "root_hash" })
  rootHash: string;

  @Column({ name: "expect_result", type: "json" })
  expectResult: number[];
}
