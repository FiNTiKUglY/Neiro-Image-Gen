import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1716729438446 implements MigrationInterface {
    name = 'Init1716729438446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "liked_images" ("image_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_668751124e24e357a2c9259bed5" PRIMARY KEY ("image_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b698fbae675a05de35f1053991" ON "liked_images" ("image_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dff93a50bcf7063c13dbbfe872" ON "liked_images" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "liked_images" ADD CONSTRAINT "FK_b698fbae675a05de35f10539918" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "liked_images" ADD CONSTRAINT "FK_dff93a50bcf7063c13dbbfe8721" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "liked_images" DROP CONSTRAINT "FK_dff93a50bcf7063c13dbbfe8721"`);
        await queryRunner.query(`ALTER TABLE "liked_images" DROP CONSTRAINT "FK_b698fbae675a05de35f10539918"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dff93a50bcf7063c13dbbfe872"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b698fbae675a05de35f1053991"`);
        await queryRunner.query(`DROP TABLE "liked_images"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
