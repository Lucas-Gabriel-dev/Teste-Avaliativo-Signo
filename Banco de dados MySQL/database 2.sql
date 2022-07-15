-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: signo
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.21.10.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `poll`
--

DROP TABLE IF EXISTS `poll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poll` (
  `id_poll` varchar(36) NOT NULL,
  `title_poll` varchar(45) NOT NULL,
  `startDate_poll` date NOT NULL,
  `endDate_poll` date NOT NULL,
  `createdAt_poll` date NOT NULL,
  `id_user_created` varchar(36) DEFAULT NULL,
  `response_created` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_poll`),
  KEY `fk_id_user_idx` (`id_user_created`),
  CONSTRAINT `fk_id_user` FOREIGN KEY (`id_user_created`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll`
--

LOCK TABLES `poll` WRITE;
/*!40000 ALTER TABLE `poll` DISABLE KEYS */;
INSERT INTO `poll` VALUES ('2abb0ab5-6a5d-4bdb-8968-18f68d1cf00a','Você vai votar em quem?','2022-07-14','2022-07-20','2022-07-14','4d0b599c-542d-46cf-9dc6-db435a10c5cd',1),('bab9859a-4b3c-45c6-a5cd-03ccd5a0060f','Qual cor voce prefere','2022-07-15','2022-07-29','2022-07-15','cc4786c2-34eb-4ccc-8ab9-a66e173c57ed',1);
/*!40000 ALTER TABLE `poll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poll_response`
--

DROP TABLE IF EXISTS `poll_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poll_response` (
  `id_poll_response` int NOT NULL AUTO_INCREMENT,
  `id_poll` varchar(36) NOT NULL,
  `poll_response` varchar(200) NOT NULL,
  `vote_poll` int DEFAULT NULL,
  PRIMARY KEY (`id_poll_response`),
  KEY `fk_id_poll_idx` (`id_poll`),
  CONSTRAINT `fk_id_poll` FOREIGN KEY (`id_poll`) REFERENCES `poll` (`id_poll`)
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll_response`
--

LOCK TABLES `poll_response` WRITE;
/*!40000 ALTER TABLE `poll_response` DISABLE KEYS */;
INSERT INTO `poll_response` VALUES (173,'2abb0ab5-6a5d-4bdb-8968-18f68d1cf00a','Aecio Neves',1),(174,'2abb0ab5-6a5d-4bdb-8968-18f68d1cf00a','Marina Silva',NULL),(176,'2abb0ab5-6a5d-4bdb-8968-18f68d1cf00a','Bolsonaro',1),(181,'bab9859a-4b3c-45c6-a5cd-03ccd5a0060f','Rosa',NULL),(182,'bab9859a-4b3c-45c6-a5cd-03ccd5a0060f','Azul',NULL),(183,'bab9859a-4b3c-45c6-a5cd-03ccd5a0060f','Preto',NULL);
/*!40000 ALTER TABLE `poll_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` varchar(36) NOT NULL,
  `name_user` varchar(45) NOT NULL,
  `email_user` varchar(45) NOT NULL,
  `password_user` varchar(95) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('4d0b599c-542d-46cf-9dc6-db435a10c5cd','Lucas','lucas.silva_444@hotmail.com','$2a$08$/klZcWwtkMEhWA1kFXRhX.GQzSDciAuxzTJxSSBKlO/Vo4EyzOfa.'),('cc4786c2-34eb-4ccc-8ab9-a66e173c57ed','Solange Silva','lucas.silva_555@hotmail.com','$2a$08$UGkD2zPoQ1V2mvhzacb3FeG2EiIJcDhIY9ikKoCtbxU4F9zUSNEH6'),('fe782ea4-d967-459c-96cc-1fcefc344495','Lucas Silva','lucas.silva_9090@hotmail.com','$2a$08$70m3pyhRadntFMNQm12UAO2GyCB2bfgq2qp8oHCSDudVwDYNZar/O');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_vote`
--

DROP TABLE IF EXISTS `user_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_vote` (
  `id_user` varchar(36) NOT NULL,
  `id_poll` varchar(36) NOT NULL,
  `id_poll_response` int NOT NULL,
  `created_at` date NOT NULL,
  `id_user_vote` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_user_vote`),
  KEY `fk_user_id_idx` (`id_user`),
  KEY `fk_poll_id_idx` (`id_poll`),
  KEY `fk_poll_response_idx` (`id_poll_response`),
  CONSTRAINT `fk_poll_id` FOREIGN KEY (`id_poll`) REFERENCES `poll` (`id_poll`),
  CONSTRAINT `fk_poll_response` FOREIGN KEY (`id_poll_response`) REFERENCES `poll_response` (`id_poll_response`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_vote`
--

LOCK TABLES `user_vote` WRITE;
/*!40000 ALTER TABLE `user_vote` DISABLE KEYS */;
INSERT INTO `user_vote` VALUES ('4d0b599c-542d-46cf-9dc6-db435a10c5cd','2258899d-a387-471e-a33f-cef1138abc10',170,'2022-07-14',11),('4d0b599c-542d-46cf-9dc6-db435a10c5cd','2abb0ab5-6a5d-4bdb-8968-18f68d1cf00a',173,'2022-07-15',12),('cc4786c2-34eb-4ccc-8ab9-a66e173c57ed','2abb0ab5-6a5d-4bdb-8968-18f68d1cf00a',176,'2022-07-15',13);
/*!40000 ALTER TABLE `user_vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'signo'
--

--
-- Dumping routines for database 'signo'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-15  2:58:32
