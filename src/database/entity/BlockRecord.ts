import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "block_record" })
export class BlockRecordEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "block_number" })
  blockNumber: number;

  @Column({ name: "block_type" })
  blockType: string;

  // ===default column
  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
