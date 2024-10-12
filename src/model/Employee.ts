import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import Position from './Position';
import Avatar from './Avatar';

@Entity()
class Employee {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column('text')
    name: string | null = null;

  @ManyToOne(() => Position, (position) => position.positionName)
    position: Position;

  @ManyToOne(() => Avatar, (avatar) => avatar.fileName)
    avatar: Avatar;

  // @Column('simple-json')
  //   skills: { skill: string, expertise: number }[];

  constructor(
    name: string,
    position: Position,
    avatar: Avatar,
    // skills: { skill: string, expertise: number }[],
  ) {
    this.name = name;
    this.position = position;
    this.avatar = avatar;
    // this.skills = skills;
  }

  setName(name: string) {
    this.name = name;
  }

  setPosition(position: Position) {
    this.position = position;
  }
}

export default Employee;
