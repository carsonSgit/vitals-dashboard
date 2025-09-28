import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class VitalEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    patient_id: string;

    @Column()
    heart_rate: number;

    @Column()
    bp: string;

    @CreateDateColumn()
    created_at: Date;
}