/*
SQLyog Ultimate v8.55 
MySQL - 5.7.19 : Database - voyageplanner
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`voyageplanner` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `voyageplanner`;

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name_unique` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `categories` */

insert  into `categories`(`id`,`name`,`date_created`,`date_modified`) values (1,'Activity','2020-06-02 23:13:22','2020-06-02 23:13:22'),(2,'Transportation','2020-06-02 23:13:22','2020-06-02 23:13:22'),(3,'Info','2020-06-02 23:13:22','2020-06-02 23:13:22'),(4,'Accommodation','2020-06-02 23:13:22','2020-06-02 23:13:22'),(5,'Flight','2020-06-02 23:13:22','2020-06-02 23:13:22'),(6,'cruise','2020-06-02 23:13:22','2020-06-02 23:13:22');

/*Table structure for table `currencies` */

DROP TABLE IF EXISTS `currencies`;

CREATE TABLE `currencies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `currency_code_unique` (`code`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

/*Data for the table `currencies` */

insert  into `currencies`(`id`,`code`,`name`,`date_created`,`date_modified`) values (1,'AED','United Arab Emirates Dirham','2020-06-02 23:13:22','2020-06-02 23:13:22'),(2,'AUD','Australian Dollar','2020-06-02 23:13:22','2020-06-02 23:13:22'),(3,'CAD','Canadian Dollar','2020-06-02 23:13:22','2020-06-02 23:13:22'),(4,'CHF','Swiss Franc','2020-06-02 23:13:22','2020-06-02 23:13:22'),(5,'CNY','Chinese Yuan Renminbi','2020-06-02 23:13:22','2020-06-02 23:13:22'),(6,'EUR','Euro','2020-06-02 23:13:22','2020-06-02 23:13:22'),(7,'GBP','British Pound','2020-06-02 23:13:22','2020-06-02 23:13:22'),(8,'HKD','Hong Kong Dollar','2020-06-02 23:13:22','2020-06-02 23:13:22'),(9,'INR','Indian Rupee','2020-06-02 23:13:22','2020-06-02 23:13:22'),(10,'JPY','Japanese Yen','2020-06-02 23:13:22','2020-06-02 23:13:22'),(11,'MYR','Malaysian Ringgit','2020-06-02 23:13:22','2020-06-02 23:13:22'),(12,'NZD','New Zealand Dollar','2020-06-02 23:13:22','2020-06-02 23:13:22'),(13,'SGD','Singapore Dollar','2020-06-02 23:13:22','2020-06-02 23:13:22'),(14,'TWD','Taiwan New Dollar','2020-06-02 23:13:22','2020-06-02 23:13:22'),(15,'USD','US Dollar','2020-06-02 23:13:22','2020-06-02 23:13:22');

/*Table structure for table `events` */

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `trip_day_id` int(10) unsigned DEFAULT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `currency_id` int(10) unsigned DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `start_location` varchar(255) DEFAULT NULL,
  `end_location` varchar(255) DEFAULT NULL,
  `note` text,
  `tag` text,
  `cost` int(11) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `event_trip_day_id_foreign` (`trip_day_id`),
  KEY `event_category_id_foreign` (`category_id`),
  KEY `event_user_id_foreign` (`user_id`),
  KEY `event_currency_id_foreign` (`currency_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `events` */

/*Table structure for table `trip_days` */

DROP TABLE IF EXISTS `trip_days`;

CREATE TABLE `trip_days` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `trip_date` date NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `trip_id` int(10) unsigned NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `trip_day_trip_id_foreign` (`trip_id`),
  KEY `trip_day_user_id_foreign` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `trip_days` */

/*Table structure for table `trips` */

DROP TABLE IF EXISTS `trips`;

CREATE TABLE `trips` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `destination` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `timezone_id` int(10) unsigned DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `trip_user_id_foreign` (`user_id`),
  KEY `trip_timezone_id_foreign` (`timezone_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `trips` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `users` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
