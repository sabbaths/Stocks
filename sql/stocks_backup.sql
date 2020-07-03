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
  PRIMARY KEY (`stock_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1067 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_info`
--

LOCK TABLES `stock_info` WRITE;
/*!40000 ALTER TABLE `stock_info` DISABLE KEYS */;
INSERT INTO `stock_info` VALUES (386,'12','asdfsa','wala nga\n\nas',1000,335,0,340.7,344,347.4,357.6,374.5),(411,'13','asdfsa','',1000,23,0,23.3,23.6,23.8,24.5,25.7),(618,'3','asdfsa','Bias hard to reach >50 since resitance at 50 and last 50 price is 2018\n\nIf Price reach >50 start buy\n',500,0,0,0,0,0,0,0),(892,'19','none','Good for Long Term',0,0,0,0,0,0,0,0),(893,'2','none','JFC. dont buy yet',2000,106,0,107.8,108.8,109.9,113.1,118.5),(954,'4','none','',0,0,0,0,0,0,0,0),(1023,'6','none','',1000,100,0,101.7,102.7,103.7,106.7,111.7),(1055,'14','none','bias to hold for months since bias is strong on the uptrend.\n\nresistance at 40\nMA20: above \nMA50: above\nMA200: almost at MA200\nMACD: OVERBOUGHT\nRSI: CONVERGING',300,63.6,75,64.6,65.3,65.9,67.8,71.1),(1058,'8','none','DONT BUY',1000,10,0,10.1,10.2,10.3,10.6,11.1),(1066,'1','none','We will just wait until sell signal test\nalways monitor since sudden drop might happen. ali is not doing well.\n\nresistance at 40\nMA20: above \nMA50: above\nMACD: OVERBOUGHT\nRSI: CONVERGING',1000,33.6,38.5,34.1,34.5,34.8,35.8,37.5);
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
INSERT INTO `stocks` VALUES (1,'ALI','Ayala land'),(2,'JFC','Jollibee'),(3,'PGOLD','Puregold'),(4,'AC','AC'),(6,'MAC','MAC'),(7,'MEG','MEG'),(8,'PAL','PAL'),(14,'FB','FB'),(19,'GTCAP','GTCAP');
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-09 10:07:46
