import { Project } from '../projects/models';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';

@Entity('organizations')
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'owner_id', nullable: false })
  ownerId: string;

  @OneToMany(() => Project, project => project.organization)
  projects: Project[];
}

export class OrganizationCreate {
  @Length(3, 100)
  name: string;
}
