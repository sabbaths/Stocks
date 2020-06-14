-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
--
-- Host: localhost    Database: wcc_scheduling
-- ------------------------------------------------------
-- Server version	5.7.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aircraft`
--

DROP TABLE IF EXISTS `aircraft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aircraft` (
  `aircraft_id` int(11) NOT NULL AUTO_INCREMENT,
  `registration` varchar(45) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `bew` varchar(45) DEFAULT NULL,
  `moment` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`aircraft_id`),
  UNIQUE KEY `aircraft_id_UNIQUE` (`aircraft_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircraft`
--

LOCK TABLES `aircraft` WRITE;
/*!40000 ALTER TABLE `aircraft` DISABLE KEYS */;
INSERT INTO `aircraft` VALUES (1,'RP-C3380',1,'1119','1119'),(2,'RP-C2589',1,'1119','1119'),(3,'RP-C2878',1,'1109','1109'),(8,'RP-C1123',1,'1123','1123'),(9,'RP-C4442',1,'4442','4442');
/*!40000 ALTER TABLE `aircraft` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flight_purpose`
--

DROP TABLE IF EXISTS `flight_purpose`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flight_purpose` (
  `purpose_id` int(11) NOT NULL AUTO_INCREMENT,
  `purpose` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`purpose_id`),
  UNIQUE KEY `purpose_id_UNIQUE` (`purpose_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight_purpose`
--

LOCK TABLES `flight_purpose` WRITE;
/*!40000 ALTER TABLE `flight_purpose` DISABLE KEYS */;
INSERT INTO `flight_purpose` VALUES (1,'LOCAL'),(2,'CROSS-COUNTRY'),(3,'ANY');
/*!40000 ALTER TABLE `flight_purpose` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ground_schedule`
--

DROP TABLE IF EXISTS `ground_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ground_schedule` (
  `gs_id` int(11) NOT NULL,
  `gs_date` datetime DEFAULT NULL,
  `gs_a` varchar(350) DEFAULT NULL,
  `gs_b` varchar(350) DEFAULT NULL,
  PRIMARY KEY (`gs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ground_schedule`
--

LOCK TABLES `ground_schedule` WRITE;
/*!40000 ALTER TABLE `ground_schedule` DISABLE KEYS */;
INSERT INTO `ground_schedule` VALUES (1,NULL,'SUNDAY:\n\n7am\n8am DEEPAK','9pm\n10pmasdfs\nsafds'),(2,NULL,'MONDAY:','sdfs'),(3,NULL,'TUE:','7am'),(4,NULL,'WED:','9AM CPL C'),(5,NULL,'THU:',''),(6,NULL,'FRI:','test'),(7,NULL,'SAT:','');
/*!40000 ALTER TABLE `ground_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructors`
--

DROP TABLE IF EXISTS `instructors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instructors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(155) DEFAULT NULL,
  `middle_name` varchar(155) DEFAULT NULL,
  `last_name` varchar(155) DEFAULT NULL,
  `is_active` varchar(45) NOT NULL DEFAULT '1',
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructors`
--

LOCK TABLES `instructors` WRITE;
/*!40000 ALTER TABLE `instructors` DISABLE KEYS */;
INSERT INTO `instructors` VALUES (1,'jaycel','jaycel','abess','1'),(2,'deepak','deepak','mahla','1'),(3,'sampath','sampath','rathaniel','1'),(4,'aman','amans','aman','1');
/*!40000 ALTER TABLE `instructors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(45) NOT NULL,
  `is_admin` varchar(45) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_test`
--

DROP TABLE IF EXISTS `schedule_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule_test` (
  `schedule_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `slot` varchar(45) DEFAULT NULL,
  `RP-C3380` varchar(45) DEFAULT NULL,
  `RP-C2589` varchar(45) DEFAULT NULL,
  `RP-C2878` varchar(45) DEFAULT NULL,
  `RP-C1123` varchar(45) DEFAULT NULL,
  `RP-C4442` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  UNIQUE KEY `schedule_id_UNIQUE` (`schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_test`
--

LOCK TABLES `schedule_test` WRITE;
/*!40000 ALTER TABLE `schedule_test` DISABLE KEYS */;
INSERT INTO `schedule_test` VALUES (1,'2018-01-30 00:00:00','1','68','CANCELLED','CANCELLED',NULL,NULL),(2,'2018-01-30 00:00:00','4','CANCELLED','CANCELLED','CANCELLED',NULL,NULL),(3,'2018-01-31 00:00:00','4','CANCELLED','CANCELLED',NULL,NULL,NULL),(4,'2018-01-30 00:00:00','2','CANCELLED','CANCELLED',NULL,NULL,NULL),(5,'2018-02-03 00:00:00','1','19','18','20',NULL,NULL),(6,'2018-02-03 00:00:00','2','22','21',NULL,NULL,NULL),(7,'2018-02-03 00:00:00','3','23','24','63',NULL,NULL),(8,'2018-01-31 00:00:00','3','CANCELLED',NULL,NULL,NULL,NULL),(9,'2018-01-30 00:00:00','3','CANCELLED','CANCELLED','CANCELLED',NULL,NULL),(10,'2018-02-05 00:00:00','4','46','43',NULL,NULL,NULL),(11,'2018-02-05 00:00:00','3',NULL,'44','47',NULL,NULL),(12,'2018-02-05 00:00:00','2',NULL,'45','48',NULL,NULL),(13,'2018-02-04 00:00:00','1',NULL,'49',NULL,NULL,NULL),(14,'2018-02-02 00:00:00','3',NULL,'CANCELLED','CANCELLED',NULL,NULL),(15,'2018-02-02 00:00:00','4',NULL,NULL,'CANCELLED',NULL,NULL),(16,'2018-02-03 00:00:00','4',NULL,NULL,'64',NULL,NULL),(17,'2018-02-05 00:00:00','1','73','72',NULL,NULL,NULL),(18,'2018-07-02 00:00:00','1','76','77',NULL,NULL,NULL),(19,'2018-07-03 00:00:00','1','78',NULL,NULL,NULL,NULL),(20,'2018-07-05 00:00:00','1','79','CANCELLED',NULL,NULL,NULL),(21,'2018-07-05 00:00:00','2','83',NULL,NULL,NULL,NULL),(22,'2020-01-04 00:00:00','1','84',NULL,NULL,NULL,NULL),(23,'2020-05-19 00:00:00','1','86',NULL,NULL,NULL,NULL),(24,'2020-05-20 00:00:00','1','CANCELLED',NULL,NULL,NULL,NULL),(25,'2020-05-27 00:00:00','1','100','98',NULL,'96',NULL),(26,'2020-05-28 00:00:00','1',NULL,NULL,'89','90',NULL),(27,'2020-05-27 00:00:00','2','97',NULL,NULL,NULL,NULL),(28,'2020-05-29 00:00:00','1','CANCELLED',NULL,NULL,NULL,NULL),(29,'2020-06-04 00:00:00','1','102',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `schedule_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_test_ins`
--

DROP TABLE IF EXISTS `schedule_test_ins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule_test_ins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `instructor` int(11) DEFAULT NULL,
  `student` int(11) DEFAULT NULL,
  `purpose` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_test_ins`
--

LOCK TABLES `schedule_test_ins` WRITE;
/*!40000 ALTER TABLE `schedule_test_ins` DISABLE KEYS */;
INSERT INTO `schedule_test_ins` VALUES (1,1,1,1),(2,1,1,1),(3,1,1,1),(4,1,1,1),(5,1,1,1),(6,1,1,1),(7,1,1,1),(8,1,1,1),(9,1,1,1),(10,1,1,1),(11,1,1,1),(12,1,1,1),(13,1,1,1),(14,1,1,1),(15,1,2,3),(16,1,1,2),(17,2,2,2),(18,1,1,1),(19,1,1,1),(20,1,2,1),(21,1,1,1),(22,1,1,1),(23,1,1,2),(24,1,1,2),(25,1,1,1),(26,1,1,2),(27,1,1,1),(28,1,1,1),(29,1,1,1),(30,1,1,1),(31,1,1,1),(32,1,1,1),(33,1,1,1),(34,1,1,1),(35,1,1,1),(36,1,1,1),(37,1,1,1),(38,1,1,1),(39,1,1,1),(40,1,1,1),(41,1,1,1),(42,1,1,1),(43,1,1,1),(44,1,1,1),(45,1,1,1),(46,1,1,1),(47,1,1,1),(48,1,1,1),(49,1,1,1),(50,1,1,1),(51,1,1,1),(52,1,1,1),(53,1,1,1),(54,3,2,2),(55,2,2,1),(56,2,2,1),(57,1,1,1),(58,1,1,1),(59,1,1,1),(60,1,1,1),(61,1,1,1),(62,1,1,1),(63,1,1,1),(64,1,1,1),(65,2,2,2),(66,2,2,1),(67,1,1,1),(68,2,2,1),(69,2,1,1),(70,3,1,1),(71,2,1,1),(72,1,2,1),(73,2,2,1),(74,1,1,1),(75,1,2,1),(76,1,1,1),(77,1,1,1),(78,1,2,1),(79,1,2,1),(80,1,2,1),(81,1,2,1),(82,1,3,1),(83,1,2,1),(84,1,2,1),(85,1,2,1),(86,1,3,1),(87,3,2,1),(88,1,2,1),(89,1,2,1),(90,1,2,1),(91,1,2,1),(92,1,4,1),(93,1,2,1),(94,1,3,1),(95,2,3,1),(96,1,1,1),(97,1,2,1),(98,1,3,1),(99,1,1,1),(100,1,1,1),(101,4,2,1),(102,4,2,1);
/*!40000 ALTER TABLE `schedule_test_ins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slots`
--

DROP TABLE IF EXISTS `slots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `slots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slot_time` varchar(45) NOT NULL,
  `slot_id` int(11) NOT NULL,
  `active` varchar(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slot_id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slots`
--

LOCK TABLES `slots` WRITE;
/*!40000 ALTER TABLE `slots` DISABLE KEYS */;
INSERT INTO `slots` VALUES (1,'0600-0900',1,'1'),(2,'0900-1230',2,'1'),(3,'1200-1500',3,'1'),(4,'1500-1800',4,'1'),(5,'2000',5,'0');
/*!40000 ALTER TABLE `slots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_info`
--

DROP TABLE IF EXISTS `stock_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock_info` (
  `stock_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `stock_id` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `text` varchar(2555) DEFAULT NULL,
  `shares` float DEFAULT NULL,
  `entry` float DEFAULT NULL,
  `stock_exit` float DEFAULT NULL,
  `be` float DEFAULT NULL,
  `p1` float DEFAULT NULL,
  `p2` float DEFAULT NULL,
  `p5` float DEFAULT NULL,
  `p10` float DEFAULT NULL,
  `alert` float DEFAULT '0',
  `alerted` int(11) DEFAULT '0',
  `risk_entry` float DEFAULT NULL,
  `risk_exit` float DEFAULT NULL,
  `risk_capital` float DEFAULT NULL,
  `risk_perc` float DEFAULT NULL,
  `risk_shares` float DEFAULT NULL,
  `current_price` varchar(225) NOT NULL DEFAULT '0',
  `change_perc` varchar(225) NOT NULL DEFAULT '0',
  PRIMARY KEY (`stock_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1951 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_info`
--

LOCK TABLES `stock_info` WRITE;
/*!40000 ALTER TABLE `stock_info` DISABLE KEYS */;
INSERT INTO `stock_info` VALUES (1290,'3','none','Bias hard to reach >50 since resitance at 50 and last 50 price is 2018\n\nIf Price reach >50 start buy\n',500,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,'<span id=\"lblStockLatestLastPrice\" class=\"mr-2\"> 46.40 </span>','<span id=\"lblStockLatestChangePerc\" class=\"ml-1\"> (0.00%) </span>'),(1300,'19','none','Good for Long Term',0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,'<span id=\"lblStockLatestLastPrice\" class=\"mr-2\"> 490.00 </span>','<span id=\"lblStockLatestChangePerc\" class=\"ml-1\"> (-2.58%) </span>'),(1517,'8','none','test',0,0,0,0,0,0,0,0,50,0,NULL,NULL,NULL,NULL,NULL,'<span id=\"lblStockLatestLastPrice\" class=\"mr-2\"> 7.15 </span>','<span id=\"lblStockLatestChangePerc\" class=\"ml-1\"> (0.56%) </span>'),(1803,'22','none','',0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,'<span id=\"lblStockLatestLastPrice\" class=\"mr-2\"> 2.72 </span>','<span id=\"lblStockLatestChangePerc\" class=\"ml-1\"> (-2.16%) </span>'),(1840,'7','none','MEGAWORLD\n\nwait for 2.85 then check for bounce play',0,0,0,0,0,0,0,0,2.85,0,NULL,NULL,NULL,NULL,NULL,'<span id=\"lblStockLatestLastPrice\" class=\"mr-2\"> 3.39 </span>','<span id=\"lblStockLatestChangePerc\" class=\"ml-1\"> (4.95%) </span>'),(1860,'26','none','',0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,'<span id=\"lblStockLatestLastPrice\" class=\"mr-2\"> 49.00 </span>','<span id=\"lblStockLatestChangePerc\" class=\"ml-1\"> (-0.20%) </span>'),(1889,'28','none','',3000,18.3,17,18.6,18.7,18.9,19.5,20.4,0,0,NULL,NULL,NULL,NULL,NULL,'<span id=\"lblStockLatestLastPrice\" class=\"mr-2\"> 20.00 </span>','<span id=\"lblStockLatestChangePerc\" class=\"ml-1\"> (11.11%) </span>'),(1890,'36','none','0',0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,'<span id=\"lblStockLatestLastPrice\" class=\"mr-2\"> 11.14 </span>','<span id=\"lblStockLatestChangePerc\" class=\"ml-1\"> (-3.13%) </span>'),(1898,'37','none','0',0,0,0,0,0,0,0,0,0,0,NULL,NULL,NULL,NULL,NULL,'<span id=\"lblStockLatestLastPrice\" class=\"mr-2\"> 6.55 </span>','<span id=\"lblStockLatestChangePerc\" class=\"ml-1\"> (-2.38%) </span>'),(1916,'38','none','BPI',1000,15,0,15.2,15.4,15.5,16,16.7,0,0,NULL,NULL,NULL,NULL,NULL,'<span id=\"lblStockLatestLastPrice\" class=\"mr-2\"> 73.50 </span>','<span id=\"lblStockLatestChangePerc\" class=\"ml-1\"> (-2.91%) </span>'),(1948,'1','none','ALI',1000,38,0,38.6,39,39.4,40.5,42.4,0,0,NULL,NULL,NULL,NULL,NULL,'<span id=\"lblStockLatestLastPrice\" class=\"mr-2\"> 37.40 </span>','<span id=\"lblStockLatestChangePerc\" class=\"ml-1\"> (2.75%) </span>'),(1950,'14','none','',300,63.6,70,64.6,65.3,65.9,67.8,71.1,66,0,NULL,NULL,NULL,NULL,NULL,'<span id=\"lblStockLatestLastPrice\" class=\"mr-2\"> 70.00 </span>','<span id=\"lblStockLatestChangePerc\" class=\"ml-1\"> (0.00%) </span>');
/*!40000 ALTER TABLE `stock_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
INSERT INTO `stocks` VALUES (1,'ALI','Ayala land'),(3,'PGOLD','Puregold'),(7,'MEG','MEG'),(8,'PAL','PAL'),(14,'FB','FB'),(19,'GTCAP','GTCAP'),(22,'DITO','DITO'),(26,'CEB','CEB'),(28,'DD','DD'),(36,'2GO','2GO'),(37,'MAC','MAC'),(38,'BPI','BPI');
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `middle_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `telephone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'goldy','goldy','goldyy',1,NULL,NULL),(2,'dyava','dyava','dyava',1,NULL,NULL),(3,'eccel','eccel','eccel',1,NULL,NULL),(4,'isaac','isaac','lim',1,NULL,NULL);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(400) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `middle_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `role_id` varchar(45) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `student_id` int(11) DEFAULT NULL,
  `instructor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','password','admin','admin','admin','1',1,1,NULL,NULL),(2,'scheduler','scheduler','scheduler','scheduler','scheduler',NULL,0,1,NULL,NULL),(3,'scheduler1','scheduler','scheduler','scheduler','scheduler',NULL,0,1,NULL,NULL),(4,'scheduler2','scheduler2','scheduler2','scheduler2','scheduler2',NULL,0,1,NULL,NULL),(5,'student','student','student','student','student',NULL,0,1,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-14 20:05:19
