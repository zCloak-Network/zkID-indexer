import { Column, Entity } from "typeorm";
import { BaseBlockEntity } from "./BaseBlockEntity";

@Entity({ name: "raw_scan_canonical" })
export class CanonicalEntity extends BaseBlockEntity {
  @Column({ name: "data_owner" })
  cOwner: string;

  @Column({ name: "data_owner_hex" })
  cOwnerHex: string;

  @Column({ name: "request_hash" })
  requestHash: string;

  @Column({ name: "output_hash" })
  outputHash: string;
}
