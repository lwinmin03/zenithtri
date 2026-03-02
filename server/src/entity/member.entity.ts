import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from './core/audit.entity';

export enum MemberStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
}

@Entity('members')
export class Member extends AuditEntity {
    @PrimaryGeneratedColumn('identity')
    id: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'insurance_id', unique: true })
    insuranceId: string;

    @Column({ name: 'date_of_birth', type: 'date' })
    dateOfBirth: Date;

    @Column({
        type: 'enum',
        enum: MemberStatus,
        default: MemberStatus.ACTIVE,
    })
    status: MemberStatus;
}