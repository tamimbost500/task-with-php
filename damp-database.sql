-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-sktusher.alwaysdata.net
-- Generation Time: Feb 04, 2024 at 08:29 PM
-- Server version: 10.6.16-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sktusher_coding-challenge`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `sectorIds` varchar(200) NOT NULL,
  `isAgree` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sectors`
--

CREATE TABLE `sectors` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `parentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sectors`
--

INSERT INTO `sectors` (`id`, `name`, `parentId`) VALUES
(1, 'Manufacturing', NULL),
(2, 'Service', NULL),
(3, 'Other', NULL),
(5, 'Printing ', 1),
(6, 'Food and Beverage', 1),
(7, 'Textile and Clothing', 1),
(8, 'Wood', 1),
(9, 'Plastic and Rubber', 1),
(11, 'Metalworking', 1),
(12, 'Machinery', 1),
(13, 'Furniture', 1),
(18, 'Electronics and Optics', 1),
(19, 'Construction materials', 1),
(21, 'Transport and Logistics', 2),
(22, 'Tourism', 2),
(25, 'Business services', 2),
(28, 'Information Technology and Telecommunications', 2),
(29, 'Energy technology', 3),
(33, 'Environment', 3),
(35, 'Engineering', 2),
(37, 'Creative industries', 3),
(39, 'Milk dairy products', 6),
(40, 'Meat meat products', 6),
(42, 'Fish fish products', 6),
(43, 'Beverages', 6),
(44, 'Clothing', 7),
(45, 'Textile', 7),
(47, 'Wooden houses', 8),
(51, 'Wooden building materials', 8),
(53, 'Plastics welding and processing', 559),
(54, 'Packaging', 9),
(55, 'Blowing', 559),
(57, 'Moulding', 559),
(62, 'Forgings, Fasteners ', 542),
(66, 'MIG, TIG, Aluminum welding', 542),
(67, 'Construction of metal structures', 11),
(69, 'Gas, Plasma, Laser cutting', 542),
(75, 'CNC-machining', 542),
(91, 'Machinery equipment/tools', 12),
(93, 'Metal structures', 12),
(94, 'Machinery components', 12),
(97, 'Maritime', 12),
(98, 'Kitchen ', 13),
(99, 'Project furniture', 13),
(101, 'Living room', 13),
(111, 'Air', 21),
(112, 'Road', 21),
(113, 'Water', 21),
(114, 'Rail', 21),
(121, 'Software, Hardware', 28),
(122, 'Telecommunications', 28),
(141, 'Translation services', 2),
(145, 'Labelling and packaging printing', 5),
(148, 'Advertising', 5),
(150, 'Book/Periodicals printing', 5),
(224, 'Manufacture of machinery ', 12),
(227, 'Repair and maintenance service', 12),
(230, 'Ship repair and conversion', 97),
(263, 'Houses and buildings', 11),
(267, 'Metal products', 11),
(269, 'Boat/Yacht building', 97),
(271, 'Aluminium and steel workboats ', 97),
(337, 'Other (Wood)', 8),
(341, 'Outdoor ', 13),
(342, 'Bakery confectionery products', 6),
(378, 'Sweets snack food', 6),
(385, 'Bedroom', 13),
(389, 'Bathroom/sauna', 13),
(390, 'Children’s room', 13),
(392, 'Office', 13),
(394, 'Other (Furniture)', 13),
(437, 'Other (Food and Beverage)', 6),
(508, 'Other (Machinery)', 12),
(542, 'Metal works', 11),
(556, 'Plastic goods', 9),
(559, 'Plastic processing technology', 9),
(560, 'Plastic profiles', 9),
(576, 'Programming, Consultancy', 28),
(581, 'Data processing, Web portals, E-marketing', 28);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sectors`
--
ALTER TABLE `sectors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `sectors`
--
ALTER TABLE `sectors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=582;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
