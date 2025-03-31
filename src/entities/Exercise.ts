import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column()
  type!: number;

  @Column()
  muscleGroup!: string; //Ex: "machine", "poids libre", "polyarticulaire"

  @Column()
  equipment!: string; //Ex: "barre", "haltères", "cable", "machine"

  @Column()
  difficulty!: string; //Ex: "facile", "moyen", "difficile"
}
