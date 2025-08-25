-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: luxury_apartments_accra
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time_in` time DEFAULT NULL,
  `time_out` time DEFAULT NULL,
  `hours_worked` decimal(4,2) DEFAULT NULL,
  `status` enum('present','absent','late','half-day') DEFAULT 'present',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,1,'2025-08-19','08:00:00','17:00:00',NULL,'present',NULL,'2025-08-19 02:05:38'),(2,2,'2025-08-19','07:30:00','16:30:00',NULL,'present',NULL,'2025-08-19 02:05:38'),(3,3,'2025-08-19','06:00:00','18:00:00',NULL,'present',NULL,'2025-08-19 02:05:38'),(4,4,'2025-08-19','09:00:00','18:00:00',NULL,'present',NULL,'2025-08-19 02:05:38');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `guest_name` varchar(100) NOT NULL,
  `guest_email` varchar(100) NOT NULL,
  `guest_phone` varchar(20) DEFAULT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `guests_count` int(11) DEFAULT 1,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  `special_requests` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,1,NULL,'David Miller','david.miller@email.com','+233 20 777 8888','2024-02-15','2024-02-20',2,12500.00,'confirmed','Early check-in if possible','2025-08-19 02:05:38','2025-08-19 02:05:38'),(2,2,NULL,'Emma Thompson','emma.thompson@email.com','+233 24 999 0000','2024-02-25','2024-03-05',3,45000.00,'confirmed','Late check-out on departure day','2025-08-19 02:05:38','2025-08-19 02:08:24'),(3,4,NULL,'Frank Anderson','frank.anderson@email.com','+233 26 111 2222','2024-03-10','2024-03-15',4,30000.00,'confirmed','Extra cleaning supplies needed','2025-08-19 02:05:38','2025-08-19 02:05:38'),(4,1,NULL,'Freizy KenBrook','samenso@you.co','2343249233','2025-08-19','2025-08-28',1,22500.00,'confirmed','None','2025-08-19 02:08:01','2025-08-19 02:08:22');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_inquiries`
--

DROP TABLE IF EXISTS `contact_inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_inquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `property_id` int(11) DEFAULT NULL,
  `status` enum('new','read','replied','closed') DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_inquiries`
--

LOCK TABLES `contact_inquiries` WRITE;
/*!40000 ALTER TABLE `contact_inquiries` DISABLE KEYS */;
INSERT INTO `contact_inquiries` VALUES (1,'Alice Smith','alice.smith@email.com','+233 20 111 2222','Availability Inquiry','I am interested in the 2-bedroom apartment. Can you provide more information about availability?',1,'new','2025-08-19 02:05:38','2025-08-19 02:05:38'),(2,'Bob Wilson','bob.wilson@email.com','+233 24 333 4444','Rental Terms','Looking for a long-term rental. What are the terms for the penthouse?',2,'new','2025-08-19 02:05:38','2025-08-19 02:05:38'),(3,'Carol Davis','carol.davis@email.com','+233 26 555 6666','Short-term Stay','Is the studio apartment available for short-term stays?',3,'new','2025-08-19 02:05:38','2025-08-19 02:05:38'),(4,'Freizy KenBrook','konfigns@gmail.com','+23354093322','','how tf are you',NULL,'new','2025-08-19 02:23:46','2025-08-19 02:23:46');
/*!40000 ALTER TABLE `contact_inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `min_quantity` int(11) NOT NULL DEFAULT 0,
  `last_updated` datetime DEFAULT NULL,
  `unit` varchar(20) NOT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `min_stock_level` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,'Cleaning Supplies',NULL,'Housekeeping',50,10,NULL,'units',NULL,NULL,NULL,0,'2025-08-19 02:05:38','2025-08-19 02:05:38'),(2,'Towels',NULL,'Linen',100,20,NULL,'pieces',NULL,NULL,NULL,0,'2025-08-19 02:05:38','2025-08-19 02:05:38'),(3,'Bed Sheets',NULL,'Linen',80,15,NULL,'sets',NULL,NULL,NULL,0,'2025-08-19 02:05:38','2025-08-19 02:05:38'),(4,'Toilet Paper',NULL,'Bathroom',200,30,NULL,'rolls',NULL,NULL,NULL,0,'2025-08-19 02:05:38','2025-08-19 02:05:38'),(5,'Soap',NULL,'Bathroom',150,25,NULL,'bars',NULL,NULL,NULL,0,'2025-08-19 02:05:38','2025-08-19 02:05:38'),(6,'Light Bulbs',NULL,'Maintenance',75,10,NULL,'pieces',NULL,NULL,NULL,0,'2025-08-19 02:05:38','2025-08-19 02:05:38'),(7,'Air Fresheners',NULL,'Housekeeping',60,15,NULL,'units',NULL,NULL,NULL,0,'2025-08-19 02:05:38','2025-08-19 02:05:38'),(8,'Napkins',NULL,'Kitchen',4,1,NULL,'sets',NULL,NULL,NULL,0,'2025-08-19 02:06:42','2025-08-19 02:06:42');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `location` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `bathrooms` int(11) NOT NULL,
  `area` decimal(8,2) DEFAULT NULL,
  `type` enum('apartment','penthouse','studio') DEFAULT 'apartment',
  `status` enum('available','rented','maintenance') DEFAULT 'available',
  `available` tinyint(1) DEFAULT 1,
  `featured` tinyint(1) DEFAULT 0,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amenities`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,'Luxury 2-Bedroom Apartment','Spacious and modern 2-bedroom apartment with stunning city views. Features high-end finishes, gourmet kitchen, and private balcony.',2500.00,'East Legon, Accra','123 Luxury Avenue, East Legon, Accra',2,2,1200.00,'apartment','available',1,1,'[\"/uploads/property1-1.jpg\", \"/uploads/property1-2.jpg\", \"/uploads/property1-3.jpg\"]','[\"WiFi\", \"Air Conditioning\", \"Balcony\", \"Gym Access\", \"Pool\", \"Security\", \"Parking\"]','2025-08-19 02:05:38','2025-08-19 02:05:38'),(2,'Premium 3-Bedroom Penthouse','Exclusive penthouse with panoramic views of Accra. Features luxury amenities, private terrace, and 24/7 concierge service.',4500.00,'Airport Residential Area, Accra','456 Premium Heights, Airport Residential Area, Accra',3,3,1800.00,'penthouse','available',1,1,'[\"/uploads/property2-1.jpg\", \"/uploads/property2-2.jpg\", \"/uploads/property2-3.jpg\"]','[\"WiFi\", \"Air Conditioning\", \"Private Terrace\", \"Gym Access\", \"Pool\", \"Security\", \"Parking\", \"Concierge\", \"Elevator\"]','2025-08-19 02:05:38','2025-08-19 02:05:38'),(3,'Modern 1-Bedroom Studio','Contemporary studio apartment perfect for professionals. Features modern design, smart home technology, and convenient location.',1500.00,'Osu, Accra','789 Modern Street, Osu, Accra',1,1,800.00,'studio','available',1,0,'[\"/uploads/property3-1.jpg\", \"/uploads/property3-2.jpg\"]','[\"WiFi\", \"Air Conditioning\", \"Smart Home\", \"Security\", \"Parking\"]','2025-08-19 02:05:38','2025-08-19 02:05:38'),(4,'Family 4-Bedroom Villa','Spacious family villa with garden and pool. Perfect for families seeking luxury and space in a secure environment.',6000.00,'Trasacco Valley, Accra','321 Family Villa Road, Trasacco Valley, Accra',4,4,2500.00,'apartment','available',0,1,'[\"/uploads/property4-1.jpg\", \"/uploads/property4-2.jpg\", \"/uploads/property4-3.jpg\"]','[\"WiFi\", \"Air Conditioning\", \"Garden\", \"Pool\", \"Security\", \"Parking\", \"Playground\", \"BBQ Area\"]','2025-08-19 02:05:38','2025-08-19 02:05:38'),(5,'Executive 2-Bedroom Apartment','Executive apartment in the heart of Accra\'s business district. Features premium finishes and business amenities.',3000.00,'Ridge, Accra','654 Executive Plaza, Ridge, Accra',2,2,1400.00,'apartment','available',0,0,'[\"/uploads/property5-1.jpg\", \"/uploads/property5-2.jpg\"]','[\"WiFi\", \"Air Conditioning\", \"Business Center\", \"Gym Access\", \"Security\", \"Parking\", \"Conference Room\"]','2025-08-19 02:05:38','2025-08-19 02:05:38');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `position` varchar(100) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `hire_date` date NOT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `status` enum('active','inactive','terminated') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'John Doe','john.doe@luxuryapartmentsaccra.com','+233 20 123 4567','Property Manager','Management','2023-01-10',3500.00,'active','2025-08-19 02:05:38','2025-08-19 02:05:38'),(2,'Sarah Johnson','sarah.johnson@luxuryapartmentsaccra.com','+233 24 987 6543','Maintenance Supervisor','Maintenance','2022-05-15',2800.00,'active','2025-08-19 02:05:38','2025-08-19 02:05:38'),(3,'Michael Chen','michael.chen@luxuryapartmentsaccra.com','+233 26 555 1234','Security Officer','Security','2021-09-01',2200.00,'active','2025-08-19 02:05:38','2025-08-19 02:05:38'),(4,'Lisa Brown','lisa.brown@luxuryapartmentsaccra.com','+233 27 777 8888','Housekeeping Manager','Housekeeping','2023-03-20',2500.00,'active','2025-08-19 02:05:38','2025-08-19 02:05:38');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','user','superadmin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@westburyhomes.com','$2a$10$CwTycUXWue0Thq9StjUM0uJ8iF1rQb6pF6Qb6pF6Qb6pF6Qb6pF6Qb','admin','2025-08-19 02:05:38','2025-08-19 02:05:38'),(2,'superadmin','superadmin@westburyhomes.com','$2a$10$CwTycUXWue0Thq9StjUM0uJ8iF1rQb6pF6Qb6pF6Qb6pF6Qb6pF6Qb','superadmin','2025-08-19 02:05:38','2025-08-19 02:05:38');
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

-- Dump completed on 2025-08-25  3:36:29
