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
    name: string;

  @ManyToOne(() => Position, (position) => position.title, { nullable: true, onDelete: 'SET NULL' })
    position: Position | null;

  @ManyToOne(() => Avatar, { nullable: true, onDelete: 'SET NULL' })
    avatar: Avatar | null;

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
}

export default Employee;
