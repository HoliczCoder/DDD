import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export type AggregateId = string;

@Exclude()
export abstract class BaseIdentityEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'Id',
  })
  @ApiProperty()
  @Expose()
  id: string;

  @CreateDateColumn({
    name: 'CreatedAt',
    type: 'datetime',
  })
  @ApiHideProperty()
  @Exclude()
  createAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'datetime' })
  @ApiHideProperty()
  @Exclude()
  updatedAt: Date;

  @ApiHideProperty()
  @Exclude()
  @DeleteDateColumn({
    name: 'DeletedAt',
    type: 'datetime',
  })
  deletedAt?: Date;
}
