import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Employee {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column('text')
    name: string | null = null;

  constructor(name: string) {
    this.name = name;
  }

  setName(name: string) {
    this.name = name;
  }
}

export default Employee;
