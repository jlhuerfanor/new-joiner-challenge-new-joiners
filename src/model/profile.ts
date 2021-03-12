import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({ name: 'profile', schema: 'joiner' })
export class Profile {
    @PrimaryGeneratedColumn( { type: 'int4' })
    public id!: number;
    @Column({ name: 'id_number', type: 'bigint' })
    public idNumber!: number;
    @Column({ name: 'first_name', type: 'varchar', length: 100 })
    public firstName!: string;
    @Column({ name: 'last_name', type: 'varchar', length: 100 })
    public lastName!: string;
    @Column({ name: 'stack', type: 'varchar', length: 100 })
    public stack!: string;
    @Column({ name: 'role', type: 'varchar', length: 100 })
    public role!: string;
    @Column({ name: 'english_level', type: 'varchar', length: 50 })
    public englishLevel!: string;
    @Column({ name: 'domain_experience', type: 'text' })
    public domainExperience!: string;
    public filename!: string;
}
