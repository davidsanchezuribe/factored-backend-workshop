import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Avatar {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column('text')
    fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  setFileName(fileName: string) {
    this.fileName = fileName;
  }
}

export default Avatar;
