/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50738
 Source Host           : localhost:3306
 Source Schema         : zkID-service

 Target Server Type    : MySQL
 Target Server Version : 50738
 File Encoding         : 65001

 Date: 10/06/2022 14:39:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for block_record
-- ----------------------------
DROP TABLE IF EXISTS `block_record`;
CREATE TABLE `block_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block_number` int(11) NOT NULL,
  `block_type` varchar(255) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for contract_config
-- ----------------------------
DROP TABLE IF EXISTS `contract_config`;
CREATE TABLE `contract_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chain_id` int(11) NOT NULL,
  `contract_address` varchar(255) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for raw_scan_canonical
-- ----------------------------
DROP TABLE IF EXISTS `raw_scan_canonical`;
CREATE TABLE `raw_scan_canonical` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block_number` int(11) NOT NULL,
  `block_hash` varchar(255) NOT NULL,
  `block_type` varchar(255) NOT NULL,
  `block_time` int(11) NOT NULL,
  `transaction_hash` varchar(255) NOT NULL,
  `version_id` int(11) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `data_owner` varchar(255) NOT NULL,
  `request_hash` varchar(255) NOT NULL,
  `output_hash` varchar(255) NOT NULL,
  `data_owner_hex` varchar(160) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for raw_scan_poap
-- ----------------------------
DROP TABLE IF EXISTS `raw_scan_poap`;
CREATE TABLE `raw_scan_poap` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block_number` int(11) NOT NULL,
  `block_hash` varchar(255) NOT NULL,
  `block_type` varchar(255) NOT NULL,
  `block_time` int(11) NOT NULL,
  `transaction_hash` varchar(255) NOT NULL,
  `version_id` int(11) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `poap_id` varchar(255) NOT NULL,
  `who` varchar(255) NOT NULL,
  `nft_id` varchar(255) NOT NULL,
  `who_hex` varchar(160) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for raw_scan_proof
-- ----------------------------
DROP TABLE IF EXISTS `raw_scan_proof`;
CREATE TABLE `raw_scan_proof` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block_number` int(11) NOT NULL,
  `block_hash` varchar(255) NOT NULL,
  `block_type` varchar(255) NOT NULL,
  `block_time` int(11) NOT NULL,
  `transaction_hash` varchar(255) NOT NULL,
  `version_id` int(11) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `data_owner` varchar(255) NOT NULL,
  `attester` varchar(255) NOT NULL,
  `ctype_hash` varchar(255) NOT NULL,
  `program_hash` varchar(255) NOT NULL,
  `field_names` json NOT NULL,
  `proof_cid` varchar(255) NOT NULL,
  `request_hash` varchar(255) NOT NULL,
  `root_hash` varchar(255) NOT NULL,
  `expect_result` json NOT NULL,
  `data_owner_hex` varchar(160) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for raw_scan_verifying
-- ----------------------------
DROP TABLE IF EXISTS `raw_scan_verifying`;
CREATE TABLE `raw_scan_verifying` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `block_number` int(11) NOT NULL,
  `block_hash` varchar(255) NOT NULL,
  `block_type` varchar(255) NOT NULL,
  `block_time` int(11) NOT NULL,
  `transaction_hash` varchar(255) NOT NULL,
  `version_id` int(11) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `data_owner` varchar(255) NOT NULL,
  `request_hash` varchar(255) NOT NULL,
  `worker` varchar(255) NOT NULL,
  `output_hash` varchar(255) NOT NULL,
  `root_hash` varchar(255) NOT NULL,
  `attester` varchar(255) NOT NULL,
  `is_passed` tinyint(4) NOT NULL,
  `calc_result` json NOT NULL,
  `data_owner_hex` varchar(160) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
