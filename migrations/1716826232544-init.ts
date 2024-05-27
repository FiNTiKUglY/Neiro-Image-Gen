import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1716826232544 implements MigrationInterface {
    name = 'Init1716826232544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "liked_images" DROP CONSTRAINT "FK_b698fbae675a05de35f10539918"`);
        await queryRunner.query(`ALTER TABLE "liked_images" DROP CONSTRAINT "FK_dff93a50bcf7063c13dbbfe8721"`);
        await queryRunner.query(`ALTER TABLE "images" ADD "status" character varying NOT NULL DEFAULT 'generating'`);
        await queryRunner.query(`ALTER TABLE "liked_images" ADD CONSTRAINT "FK_b698fbae675a05de35f10539918" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "liked_images" ADD CONSTRAINT "FK_dff93a50bcf7063c13dbbfe8721" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "liked_images" DROP CONSTRAINT "FK_dff93a50bcf7063c13dbbfe8721"`);
        await queryRunner.query(`ALTER TABLE "liked_images" DROP CONSTRAINT "FK_b698fbae675a05de35f10539918"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "liked_images" ADD CONSTRAINT "FK_dff93a50bcf7063c13dbbfe8721" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "liked_images" ADD CONSTRAINT "FK_b698fbae675a05de35f10539918" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
