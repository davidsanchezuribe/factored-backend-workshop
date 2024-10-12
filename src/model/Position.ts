import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import Employee from './Employee';

@Entity()
class Position {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column('text')
    title: string;

  @OneToMany(() => Employee, (employee) => employee.position)
    employees: Employee[] | undefined;

  constructor(title: string) {
    this.title = title;
  }

  setTitle(title: string) {
    this.title = title;
  }
}

export default Position;
