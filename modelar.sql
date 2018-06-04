/*
 Navicat Premium Data Transfer

 Source Server         : postgres
 Source Server Type    : PostgreSQL
 Source Server Version : 90605
 Source Host           : localhost:5432
 Source Catalog        : modelar
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 90605
 File Encoding         : 65001

 Date: 04/06/2018 13:43:07
*/


-- ----------------------------
-- Sequence structure for articles2_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."articles2_id_seq";
CREATE SEQUENCE "public"."articles2_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for articles3_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."articles3_id_seq";
CREATE SEQUENCE "public"."articles3_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for regions_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."regions_id_seq";
CREATE SEQUENCE "public"."regions_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for roles4_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."roles4_id_seq";
CREATE SEQUENCE "public"."roles4_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tags2_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tags2_id_seq";
CREATE SEQUENCE "public"."tags2_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users2_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users2_id_seq";
CREATE SEQUENCE "public"."users2_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users3_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users3_id_seq";
CREATE SEQUENCE "public"."users3_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users4_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users4_id_seq";
CREATE SEQUENCE "public"."users4_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for articles2
-- ----------------------------
DROP TABLE IF EXISTS "public"."articles2";
CREATE TABLE "public"."articles2" (
  "id" int4 NOT NULL DEFAULT nextval('articles2_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "content" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "user_id" int4 DEFAULT NULL
)
;

-- ----------------------------
-- Table structure for articles3
-- ----------------------------
DROP TABLE IF EXISTS "public"."articles3";
CREATE TABLE "public"."articles3" (
  "id" int4 NOT NULL DEFAULT nextval('articles3_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "content" text COLLATE "pg_catalog"."default" DEFAULT NULL,
  "user_id" int4 DEFAULT NULL
)
;

-- ----------------------------
-- Table structure for regions
-- ----------------------------
DROP TABLE IF EXISTS "public"."regions";
CREATE TABLE "public"."regions" (
  "id" int4 NOT NULL DEFAULT nextval('regions_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;

-- ----------------------------
-- Table structure for roles4
-- ----------------------------
DROP TABLE IF EXISTS "public"."roles4";
CREATE TABLE "public"."roles4" (
  "id" int4 NOT NULL DEFAULT nextval('roles4_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL
)
;

-- ----------------------------
-- Table structure for tags2
-- ----------------------------
DROP TABLE IF EXISTS "public"."tags2";
CREATE TABLE "public"."tags2" (
  "id" int4 NOT NULL DEFAULT nextval('tags2_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT NULL,
  "taggable_id" int4 DEFAULT NULL,
  "type" varchar(255) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying
)
;

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_role";
CREATE TABLE "public"."user_role" (
  "user_id" int4 NOT NULL DEFAULT NULL,
  "role_id" int4 NOT NULL DEFAULT NULL,
  "activated" int4 DEFAULT NULL
)
;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "name" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "email" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "password" varchar(64) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "age" int4 DEFAULT NULL,
  "score" int4 DEFAULT NULL
)
;

-- ----------------------------
-- Table structure for users2
-- ----------------------------
DROP TABLE IF EXISTS "public"."users2";
CREATE TABLE "public"."users2" (
  "id" int4 NOT NULL DEFAULT nextval('users2_id_seq'::regclass),
  "name" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "email" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying
)
;

-- ----------------------------
-- Table structure for users3
-- ----------------------------
DROP TABLE IF EXISTS "public"."users3";
CREATE TABLE "public"."users3" (
  "id" int4 NOT NULL DEFAULT nextval('users3_id_seq'::regclass),
  "name" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "email" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "region_id" int4 DEFAULT NULL
)
;

-- ----------------------------
-- Table structure for users4
-- ----------------------------
DROP TABLE IF EXISTS "public"."users4";
CREATE TABLE "public"."users4" (
  "id" int4 NOT NULL DEFAULT nextval('users4_id_seq'::regclass),
  "name" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "email" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying
)
;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."articles2_id_seq"
OWNED BY "public"."articles2"."id";
SELECT setval('"public"."articles2_id_seq"', 89, true);
ALTER SEQUENCE "public"."articles3_id_seq"
OWNED BY "public"."articles3"."id";
SELECT setval('"public"."articles3_id_seq"', 28, true);
ALTER SEQUENCE "public"."regions_id_seq"
OWNED BY "public"."regions"."id";
SELECT setval('"public"."regions_id_seq"', 28, true);
ALTER SEQUENCE "public"."roles4_id_seq"
OWNED BY "public"."roles4"."id";
SELECT setval('"public"."roles4_id_seq"', 211, true);
ALTER SEQUENCE "public"."tags2_id_seq"
OWNED BY "public"."tags2"."id";
SELECT setval('"public"."tags2_id_seq"', 76, true);
ALTER SEQUENCE "public"."users2_id_seq"
OWNED BY "public"."users2"."id";
SELECT setval('"public"."users2_id_seq"', 60, true);
ALTER SEQUENCE "public"."users3_id_seq"
OWNED BY "public"."users3"."id";
SELECT setval('"public"."users3_id_seq"', 28, true);
ALTER SEQUENCE "public"."users4_id_seq"
OWNED BY "public"."users4"."id";
SELECT setval('"public"."users4_id_seq"', 197, true);
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 2814, true);

-- ----------------------------
-- Primary Key structure for table articles2
-- ----------------------------
ALTER TABLE "public"."articles2" ADD CONSTRAINT "articles2_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table articles3
-- ----------------------------
ALTER TABLE "public"."articles3" ADD CONSTRAINT "articles3_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table regions
-- ----------------------------
ALTER TABLE "public"."regions" ADD CONSTRAINT "regions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table roles4
-- ----------------------------
ALTER TABLE "public"."roles4" ADD CONSTRAINT "roles4_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tags2
-- ----------------------------
ALTER TABLE "public"."tags2" ADD CONSTRAINT "tags2_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table users2
-- ----------------------------
ALTER TABLE "public"."users2" ADD CONSTRAINT "users2_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table users3
-- ----------------------------
ALTER TABLE "public"."users3" ADD CONSTRAINT "users3_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table users4
-- ----------------------------
ALTER TABLE "public"."users4" ADD CONSTRAINT "users4_pkey" PRIMARY KEY ("id");
