import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExerciseTable1742849968973 implements MigrationInterface {
    name = 'CreateExerciseTable1742849968973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "type" integer NOT NULL, "muscleGroup" character varying NOT NULL, "equipment" character varying NOT NULL, "difficulty" character varying NOT NULL, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
