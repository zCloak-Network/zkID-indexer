import { Column, Entity } from "typeorm";
import { BaseBlockEntity } from "./BaseBlockEntity";

@Entity({ name: "raw_scan_poap" })
export class PoapEntity extends BaseBlockEntity {
  @Column({ name: "poap_id" })
  poapId: string;

  @Column({ name: "who" })
  who: string;

  @Column({ name: "who_hex" })
  whoHex: string;

  @Column({ name: "nft_id" })
  nftId: string;
}
