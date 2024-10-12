import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Skill {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column('text')
    name: string;

  constructor(name: string) {
    this.name = name;
  }

  setName(name: string) {
    this.name = name;
  }
}

export default Skill;
