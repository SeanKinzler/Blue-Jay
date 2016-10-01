-- ---
-- Globals
-- ---

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(255) NULL DEFAULT NULL,
  `firstname` VARCHAR(255) NULL DEFAULT NULL,
  `lastname` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`username`)
);

-- ---
-- Table 'classes'
-- 
-- ---

DROP TABLE IF EXISTS `classes`;
    
CREATE TABLE `classes` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `classname` VARCHAR(255) NULL DEFAULT NULL,
  `access` VARCHAR(255) NULL DEFAULT NULL,
  `keywords` VARCHAR(255) NULL DEFAULT NULL,
  `instructorid` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users_classes'
-- 
-- ---

DROP TABLE IF EXISTS `users_classes`;
    
CREATE TABLE `users_classes` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `classid` INTEGER NULL DEFAULT NULL,
  `userid` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'schedules'
-- 
-- ---

DROP TABLE IF EXISTS `schedules`;
    
CREATE TABLE `schedules` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `dayofweek` INTEGER NULL DEFAULT NULL,
  `starttime` TIME NULL DEFAULT NULL,
  `endtime` TIME NULL DEFAULT NULL,
  `classid` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `classes` ADD FOREIGN KEY (instructorid) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `users_classes` ADD FOREIGN KEY (classid) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `users_classes` ADD FOREIGN KEY (userid) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `schedules` ADD FOREIGN KEY (classid) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `classes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users_classes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `schedules` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`username`,`firstname`,`lastname`,`email`) VALUES
-- ('','','','','');
-- INSERT INTO `classes` (`id`,`classname`,`access`,`keywords`,`instructorid`) VALUES
-- ('','','','','');
-- INSERT INTO `users_classes` (`id`,`classid`,`userid`) VALUES
-- ('','','');
-- INSERT INTO `schedules` (`id`,`dayofweek`,`starttime`,`endtime`,`classid`) VALUES
-- ('','','','','');