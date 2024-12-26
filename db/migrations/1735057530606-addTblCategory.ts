import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTblCategory1735057530606 implements MigrationInterface {
    name = 'AddTblCategory1735057530606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_aac16ea42355037fe8d9c5eeca4"`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "addeById" TO "addedById"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_f98c5a74d02c74694392026011f" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_f98c5a74d02c74694392026011f"`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "addedById" TO "addeById"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_aac16ea42355037fe8d9c5eeca4" FOREIGN KEY ("addeById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
