import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseBlockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'block_number'})
  blockNumber: number;

  @Column({name: 'block_hash'})
  blockHash: string;

  @Column({name: 'block_time'})
  blockTime: number;

  @Column({name: 'transaction_hash'})
  transactionHash: string;

  @Column({name: 'version_id'})
  versionId: number;

  // ===default column
  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
