-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: vocab_note
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `definitions`
--

DROP TABLE IF EXISTS `definitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `definitions` (
  `def_id` bigint NOT NULL AUTO_INCREMENT,
  `word_desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `examples` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`def_id`)
) ENGINE=InnoDB AUTO_INCREMENT=103441 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `subcategory_id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `amount_of_word` int NOT NULL,
  `subcategory_type` varchar(10) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `word_list_id` bigint NOT NULL,
  PRIMARY KEY (`subcategory_id`),
  UNIQUE KEY `title_word_list_id` (`title`,`word_list_id`),
  KEY `word_list_id` (`word_list_id`),
  CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`word_list_id`) REFERENCES `word_list` (`word_list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subcategory_detail`
--

DROP TABLE IF EXISTS `subcategory_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory_detail` (
  `vocab_id` bigint NOT NULL,
  `def_id` bigint NOT NULL,
  `subcategory_id` bigint NOT NULL,
  PRIMARY KEY (`vocab_id`,`def_id`,`subcategory_id`),
  KEY `def_id` (`def_id`),
  KEY `subcategory_id` (`subcategory_id`),
  CONSTRAINT `subcategory_detail_ibfk_1` FOREIGN KEY (`vocab_id`) REFERENCES `vocab_def` (`vocab_id`),
  CONSTRAINT `subcategory_detail_ibfk_2` FOREIGN KEY (`def_id`) REFERENCES `vocab_def` (`def_id`),
  CONSTRAINT `subcategory_detail_ibfk_3` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`subcategory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `password` text NOT NULL,
  `image` text,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vocab_def`
--

DROP TABLE IF EXISTS `vocab_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vocab_def` (
  `vocab_id` bigint NOT NULL,
  `def_id` bigint NOT NULL,
  PRIMARY KEY (`vocab_id`,`def_id`),
  KEY `def_id` (`def_id`),
  CONSTRAINT `vocab_def_ibfk_1` FOREIGN KEY (`vocab_id`) REFERENCES `vocabularies` (`vocab_id`),
  CONSTRAINT `vocab_def_ibfk_2` FOREIGN KEY (`def_id`) REFERENCES `definitions` (`def_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vocab_leitner`
--

DROP TABLE IF EXISTS `vocab_leitner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vocab_leitner` (
  `user_id` bigint NOT NULL,
  `vocab_id` bigint NOT NULL,
  `def_id` bigint NOT NULL,
  `level` varchar(30) NOT NULL,
  `last_learning` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`vocab_id`,`user_id`,`def_id`),
  KEY `def_id` (`def_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `vocab_leitner_ibfk_1` FOREIGN KEY (`vocab_id`) REFERENCES `vocab_def` (`vocab_id`),
  CONSTRAINT `vocab_leitner_ibfk_2` FOREIGN KEY (`def_id`) REFERENCES `vocab_def` (`def_id`),
  CONSTRAINT `vocab_leitner_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vocabularies`
--

DROP TABLE IF EXISTS `vocabularies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vocabularies` (
  `vocab_id` bigint NOT NULL AUTO_INCREMENT,
  `word` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs NOT NULL,
  `pos` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phonetics_us` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phonetics_uk` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `audio_us` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `audio_uk` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `word_type` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`vocab_id`),
  UNIQUE KEY `head_pos` (`word`,`pos`),
  UNIQUE KEY `UKqu6kj4lt710nsj568gn507tld` (`word`,`pos`),
  KEY `index_word_type` (`word_type`)
) ENGINE=InnoDB AUTO_INCREMENT=147789 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `word_list`
--

DROP TABLE IF EXISTS `word_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_list` (
  `word_list_id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `list_desc` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`word_list_id`),
  UNIQUE KEY `title_userid` (`title`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `word_list_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-02 15:17:42
