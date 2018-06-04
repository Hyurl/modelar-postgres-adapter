-- ----------------------------
-- Table structure for articles2
-- ----------------------------
DROP TABLE IF EXISTS "public"."articles2";
CREATE TABLE "public"."articles2" (
  "id" serial,
  "title" varchar(255) NOT NULL,
  "content" text DEFAULT NULL,
  "user_id" int4 DEFAULT NULL,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Table structure for articles3
-- ----------------------------
DROP TABLE IF EXISTS "public"."articles3";
CREATE TABLE "public"."articles3" (
  "id" serial,
  "title" varchar(255) NOT NULL,
  "content" text DEFAULT NULL,
  "user_id" int4 DEFAULT NULL,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Table structure for regions
-- ----------------------------
DROP TABLE IF EXISTS "public"."regions";
CREATE TABLE "public"."regions" (
  "id" serial,
  "name" varchar(255) NOT NULL,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Table structure for roles4
-- ----------------------------
DROP TABLE IF EXISTS "public"."roles4";
CREATE TABLE "public"."roles4" (
  "id" serial,
  "name" varchar(255) NOT NULL,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Table structure for tags2
-- ----------------------------
DROP TABLE IF EXISTS "public"."tags2";
CREATE TABLE "public"."tags2" (
  "id" serial,
  "name" varchar(255) NOT NULL,
  "taggable_id" int4 DEFAULT NULL,
  "type" varchar(255) DEFAULT NULL,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_role";
CREATE TABLE "public"."user_role" (
  "user_id" int4 NOT NULL,
  "role_id" int4 NOT NULL,
  "activated" int4 DEFAULT NULL
);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" serial,
  "name" varchar(32) DEFAULT NULL,
  "email" varchar(32) DEFAULT NULL,
  "password" varchar(64) DEFAULT NULL,
  "age" int4 DEFAULT NULL,
  "score" int4 DEFAULT NULL,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Table structure for users2
-- ----------------------------
DROP TABLE IF EXISTS "public"."users2";
CREATE TABLE "public"."users2" (
  "id" serial,
  "name" varchar(32) DEFAULT NULL,
  "email" varchar(32) DEFAULT NULL,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Table structure for users3
-- ----------------------------
DROP TABLE IF EXISTS "public"."users3";
CREATE TABLE "public"."users3" (
  "id" serial,
  "name" varchar(32) DEFAULT NULL,
  "email" varchar(32) DEFAULT NULL,
  "region_id" int4 DEFAULT NULL,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Table structure for users4
-- ----------------------------
DROP TABLE IF EXISTS "public"."users4";
CREATE TABLE "public"."users4" (
  "id" serial,
  "name" varchar(32) DEFAULT NULL,
  "email" varchar(32) DEFAULT NULL,
  PRIMARY KEY ("id")
);