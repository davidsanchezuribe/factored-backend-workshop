import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Position from './Position';
import Avatar from './Avatar';
// eslint-disable-next-line import/no-cycle
import EmployeeSkill from './EmployeeSkill';

@Entity()
class Employee {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column()
    name: string;

  @ManyToOne(() => Position, (position) => position.title, { nullable: true, onDelete: 'SET NULL' })
    position: Position | null;

  @ManyToOne(() => Avatar, { nullable: true, onDelete: 'SET NULL' })
    avatar: Avatar | null;

  @OneToMany(() => EmployeeSkill, (employeeSkill) => employeeSkill.employee, {
    cascade: true,
  })
    employeeSkills!: EmployeeSkill[];

  constructor(
    name: string,
    position: Position | null,
    avatar: Avatar | null,
  ) {
    this.name = name;
    this.position = position;
    this.avatar = avatar;
  }

  setName(name: string) {
    this.name = name;
  }

  setPosition(position: Position | null) {
    this.position = position;
  }

  setAvatar(avatar: Avatar | null) {
    this.avatar = avatar;
  }

  setSkills(employeeSkills: EmployeeSkill[]) {
    this.setSkills(employeeSkills);
  }
}

export default Employee;
