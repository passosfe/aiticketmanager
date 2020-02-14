import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDB1581639908059 implements MigrationInterface {
  name = 'InitialDB1581639908059';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(254) NOT NULL, "password_hash" character varying(60) NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "last_login" TIMESTAMP NOT NULL, "deprovisioned_at" TIMESTAMP NOT NULL, "token" character varying(255) NOT NULL, "token_created_at" TIMESTAMP NOT NULL, "group_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "ticket_id" uuid NOT NULL, "author_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TYPE "tickets_priority_enum" AS ENUM('1', '2', '3')`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TYPE "tickets_status_enum" AS ENUM('uncategorized', 'categorized', 'assigned', 'accepted', 'rejected', 'on_hold', 'answered', 'done')`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "priority" "tickets_priority_enum" NOT NULL DEFAULT '2', "status" "tickets_status_enum" NOT NULL DEFAULT 'uncategorized', "description" text NOT NULL, "answer" text NOT NULL, "categorized_at" TIMESTAMP NOT NULL, "assigned_at" TIMESTAMP NOT NULL, "answered_at" TIMESTAMP NOT NULL, "solved_at" TIMESTAMP NOT NULL, "category_id" uuid NOT NULL, "group_id" uuid NOT NULL, "requester_id" uuid NOT NULL, "support_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6b70c09fbdab1399c207d91f410" UNIQUE ("title"), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "group_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_aa79448dc3e959720ab4c13651d" UNIQUE ("title"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_b8d62b3714f81341caa13ab0ff0" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_be8180d9b44a05e449b85f5b773" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "FK_32a7f0e4e32a46a094b55f7c25c" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "FK_6c7c96226788b4ce372cb982db9" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "FK_2a06f5cdaf003ceaa9fcf08be77" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "FK_48a2bb88b1e5151c8c21bb727dc" FOREIGN KEY ("support_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_9cb2a5ee5d6a59afa025f3b96d7" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_9cb2a5ee5d6a59afa025f3b96d7"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" DROP CONSTRAINT "FK_48a2bb88b1e5151c8c21bb727dc"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" DROP CONSTRAINT "FK_2a06f5cdaf003ceaa9fcf08be77"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" DROP CONSTRAINT "FK_6c7c96226788b4ce372cb982db9"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" DROP CONSTRAINT "FK_32a7f0e4e32a46a094b55f7c25c"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_be8180d9b44a05e449b85f5b773"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_b8d62b3714f81341caa13ab0ff0"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "categories"`, undefined);
    await queryRunner.query(`DROP TABLE "groups"`, undefined);
    await queryRunner.query(`DROP TABLE "tickets"`, undefined);
    await queryRunner.query(`DROP TYPE "tickets_status_enum"`, undefined);
    await queryRunner.query(`DROP TYPE "tickets_priority_enum"`, undefined);
    await queryRunner.query(`DROP TABLE "comments"`, undefined);
    await queryRunner.query(`DROP TABLE "users"`, undefined);
  }
}
