import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import Employee from './Employee';
// eslint-disable-next-line import/no-cycle
import Skill from './Skill';

@Entity()
class EmployeeSkill {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @ManyToOne(() => Employee, (employee) => employee.employeeSkills)
    employee: Employee;

  @ManyToOne(() => Skill, (skill) => skill.employeeSkills)
    skill: Skill;

  @Column()
    expertise: number;

  constructor(employee: Employee, skill: Skill, expertise: number) {
    this.employee = employee;
    this.skill = skill;
    this.expertise = expertise;
  }

  setExpertise(expertise: number) {
    this.expertise = expertise;
  }
}

export default EmployeeSkill;
