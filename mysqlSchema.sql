-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(255) NULL DEFAULT NULL,
  `firstName` VARCHAR(255) NULL DEFAULT NULL,
  `lastName` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `avatarUrl` VARCHAR(255) NULL DEFAULT NULL,
  `mobileNumber` VARCHAR(255) NOT NULL,
  `avatarThumbUrl` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `googleId` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`username`)
);

-- ---
-- Table 'streams'
-- 
-- ---

DROP TABLE IF EXISTS `streams`;
    
CREATE TABLE `streams` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `online` VARCHAR(255) NOT NULL,
  `creatorId` INTEGER NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `subscriberCount` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`title`)
);

-- ---
-- Table 'subscriptions'
-- 
-- ---

DROP TABLE IF EXISTS `subscriptions`;
    
CREATE TABLE `subscriptions` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `streamId` INTEGER NOT NULL,
  `userId` INTEGER NOT NULL,
  `phoneNotifications` VARCHAR(255) NOT NULL,
  `emailNotifications` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'schedules'
-- 
-- ---

DROP TABLE IF EXISTS `schedules`;
    
CREATE TABLE `schedules` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `dayOfWeek` INTEGER NULL DEFAULT NULL,
  `startTime` TIME NULL DEFAULT NULL,
  `endTime` TIME NULL DEFAULT NULL,
  `streamId` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'streams_keywords'
-- 
-- ---

DROP TABLE IF EXISTS `streams_keywords`;
    
CREATE TABLE `streams_keywords` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `streamId` INTEGER NOT NULL,
  `keywordId` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'keywords'
-- 
-- ---

DROP TABLE IF EXISTS `keywords`;
    
CREATE TABLE `keywords` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `text` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`text`)
);

-- ---
-- Table 'streams_categories'
-- 
-- ---

DROP TABLE IF EXISTS `streams_categories`;
    
CREATE TABLE `streams_categories` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `streamId` INTEGER NULL DEFAULT NULL,
  `categoryId` INTEGER NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'categories'
-- 
-- ---

DROP TABLE IF EXISTS `categories`;
    
CREATE TABLE `categories` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `text` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`text`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `streams` ADD FOREIGN KEY (creatorId) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `subscriptions` ADD FOREIGN KEY (streamId) REFERENCES `streams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `subscriptions` ADD FOREIGN KEY (userId) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `schedules` ADD FOREIGN KEY (streamId) REFERENCES `streams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `streams_keywords` ADD FOREIGN KEY (streamId) REFERENCES `streams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `streams_keywords` ADD FOREIGN KEY (keywordId) REFERENCES `keywords` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `streams_categories` ADD FOREIGN KEY (id) REFERENCES `streams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `streams_categories` ADD FOREIGN KEY (categoryId) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `streams` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `subscriptions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `schedules` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `streams_keywords` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `keywords` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `streams_categories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `categories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`username`,`firstName`,`lastName`,`email`,`avatarUrl`,`mobileNumber`,`avatarThumbUrl`,`createdAt`,`updatedAt`,`googleId`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `streams` (`id`,`title`,`online`,`creatorId`,`description`,`subscriberCount`,`createdAt`,`updatedAt`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `subscriptions` (`id`,`streamId`,`userId`,`phoneNotifications`,`emailNotifications`,`createdAt`,`updatedAt`) VALUES
-- ('','','','','','','');
-- INSERT INTO `schedules` (`id`,`dayOfWeek`,`startTime`,`endTime`,`streamId`,`createdAt`,`updatedAt`) VALUES
-- ('','','','','','','');
-- INSERT INTO `streams_keywords` (`id`,`streamId`,`keywordId`,`createdAt`,`updatedAt`) VALUES
-- ('','','','','');
-- INSERT INTO `keywords` (`id`,`text`,`createdAt`,`updatedAt`) VALUES
-- ('','','','');
-- INSERT INTO `streams_categories` (`id`,`streamId`,`categoryId`,`createdAt`,`updatedAt`) VALUES
-- ('','','','','');
-- INSERT INTO `categories` (`id`,`text`,`createdAt`,`updatedAt`) VALUES
-- ('','','','');