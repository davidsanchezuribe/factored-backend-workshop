import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Employee from './Employee';

@Entity()
class Position {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column()
    title: string;

  @OneToMany(() => Employee, (employee) => employee.position)
    employees!: Employee[];

  constructor(title: string) {
    this.title = title;
  }

  setTitle(title: string) {
    this.title = title;
  }
}

export default Position;
