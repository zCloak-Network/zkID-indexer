import { Column, Entity } from "typeorm";
import { BaseBlockEntity } from "./BaseBlockEntity";

@Entity({ name: "raw_scan_verifying" })
export class VerifyingEntity extends BaseBlockEntity {
  @Column({ name: "data_owner" })
  cOwner: string;

  @Column({ name: "request_hash" })
  requestHash: string;

  @Column({ name: "worker" })
  worker: string;

  @Column({ name: "output_hash" })
  outputHash: string;

  @Column({ name: "root_hash" })
  rootHash: string;

  @Column({ name: "attester" })
  attester: string;

  @Column({ name: "is_passed" })
  isPassed: boolean;

  @Column({ name: "calc_result", type: "json" })
  calcResult: number[];
}
