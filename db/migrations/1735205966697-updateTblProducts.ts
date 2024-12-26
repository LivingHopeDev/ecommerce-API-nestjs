import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTblProducts1735205966697 implements MigrationInterface {
    name = 'UpdateTblProducts1735205966697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
    }

}
