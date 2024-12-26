import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTblOrdersOpShipping1735218436365 implements MigrationInterface {
    name = 'AddTblOrdersOpShipping1735218436365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "shippedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "delivereddAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "delivereddAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "shippedAt" SET NOT NULL`);
    }

}
