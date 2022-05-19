import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "contract_config" })
export class ContractConfigEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "chain_id" })
  chainId: number;

  @Column({ name: "contract_address" })
  contractAddress: string;

  // ===default column
  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
