#
# SQL Export
# Created by Querious (1064)
# Created: 26 January 2017 at 13:25:20 GMT+1
# Encoding: Unicode (UTF-8)
#


CREATE DATABASE IF NOT EXISTS `election` DEFAULT CHARACTER SET latin1 DEFAULT COLLATE latin1_swedish_ci;
USE `election`;




SET @PREVIOUS_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;


DROP TABLE IF EXISTS `votes`;
DROP TABLE IF EXISTS `electors`;
DROP TABLE IF EXISTS `candidates`;


CREATE TABLE `candidates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(128) NOT NULL,
  `lastname` varchar(128) NOT NULL,
  `age` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


CREATE TABLE `electors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `firstname` varchar(128) NOT NULL,
  `lastname` varchar(128) NOT NULL,
  `age` int(11) NOT NULL,
  `adress` varchar(128) NOT NULL,
  `ip` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;


CREATE TABLE `votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elector_id` int(11) NOT NULL DEFAULT '0',
  `candidate_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_elector_id` (`elector_id`) USING BTREE,
  KEY `candidate_id` (`candidate_id`),
  CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`),
  CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`elector_id`) REFERENCES `electors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;




SET FOREIGN_KEY_CHECKS = @PREVIOUS_FOREIGN_KEY_CHECKS;


SET @PREVIOUS_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;


LOCK TABLES `candidates` WRITE;
ALTER TABLE `candidates` DISABLE KEYS;
INSERT INTO `candidates` (`id`, `firstname`, `lastname`, `age`) VALUES 
	(1,'nicolas','sarkozy','50'),
	(2,'françois','fillon','60'),
	(3,'marine','le pen','48');
ALTER TABLE `candidates` ENABLE KEYS;
UNLOCK TABLES;


LOCK TABLES `electors` WRITE;
ALTER TABLE `electors` DISABLE KEYS;
INSERT INTO `electors` (`id`, `email`, `firstname`, `lastname`, `age`, `adress`, `ip`) VALUES 
	(1,'arthurmeyer12@gmail.com','arthur','meyer',20,'7 avenue de la marguerite','::1'),
	(2,'francoisdupont@gmail.com','françois','dupont',35,'18 rue de pastelle','::1'),
	(3,'patrick.ma54@hotmail.fr','patrick','marty',54,'4 rue lupo','::1'),
	(9,'nico.ven@gmail.com','Nicolas','Vendam',22,'10 rue pastelle','::1'),
	(11,'jerem@gmail.com','Jeremy','Chaussemy',22,'Ta mère','::1'),
	(12,'test','test','test',2,'test','undefined');
ALTER TABLE `electors` ENABLE KEYS;
UNLOCK TABLES;


LOCK TABLES `votes` WRITE;
ALTER TABLE `votes` DISABLE KEYS;
INSERT INTO `votes` (`id`, `elector_id`, `candidate_id`) VALUES 
	(11,1,3),
	(12,2,1),
	(13,3,2),
	(15,9,1),
	(16,11,3),
	(17,12,3);
ALTER TABLE `votes` ENABLE KEYS;
UNLOCK TABLES;




SET FOREIGN_KEY_CHECKS = @PREVIOUS_FOREIGN_KEY_CHECKS;


