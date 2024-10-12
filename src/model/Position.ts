import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Position {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column('text')
    positionName: string;

  constructor(positionName: string) {
    this.positionName = positionName;
  }

  setPositionName(positionName: string) {
    this.positionName = positionName;
  }
}

export default Position;
