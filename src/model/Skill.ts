import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import EmployeeSkill from './EmployeeSkill';

@Entity()
class Skill {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column()
    name: string;

  @OneToMany(() => EmployeeSkill, (employeeSkill) => employeeSkill.skill, {
    cascade: true,
  })
    employeeSkills!: EmployeeSkill[];

  constructor(name: string) {
    this.name = name;
  }

  setName(name: string) {
    this.name = name;
  }
}

export default Skill;
