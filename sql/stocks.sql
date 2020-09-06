-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 06, 2020 at 11:07 AM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `localhost`
--

-- --------------------------------------------------------

--
-- Table structure for table `aircraft`
--

CREATE TABLE `aircraft` (
  `aircraft_id` int(11) NOT NULL,
  `registration` varchar(45) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `bew` varchar(45) DEFAULT NULL,
  `moment` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `aircraft`
--

INSERT INTO `aircraft` (`aircraft_id`, `registration`, `is_active`, `bew`, `moment`) VALUES
(1, 'RP-C3380', 1, '1119', '1119'),
(2, 'RP-C2589', 1, '1119', '1119'),
(3, 'RP-C2878', 1, '1109', '1109'),
(8, 'RP-C1123', 1, '1123', '1123'),
(9, 'RP-C4442', 1, '4442', '4442');

-- --------------------------------------------------------

--
-- Table structure for table `flight_purpose`
--

CREATE TABLE `flight_purpose` (
  `purpose_id` int(11) NOT NULL,
  `purpose` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `flight_purpose`
--

INSERT INTO `flight_purpose` (`purpose_id`, `purpose`) VALUES
(1, 'LOCAL'),
(2, 'CROSS-COUNTRY'),
(3, 'ANY');

-- --------------------------------------------------------

--
-- Table structure for table `ground_schedule`
--

CREATE TABLE `ground_schedule` (
  `gs_id` int(11) NOT NULL,
  `gs_date` datetime DEFAULT NULL,
  `gs_a` varchar(350) DEFAULT NULL,
  `gs_b` varchar(350) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ground_schedule`
--

INSERT INTO `ground_schedule` (`gs_id`, `gs_date`, `gs_a`, `gs_b`) VALUES
(1, NULL, 'SUNDAY:\n\n7am\n8am DEEPAK', '9pm\n10pmasdfs\nsafds'),
(2, NULL, 'MONDAY:', 'sdfs'),
(3, NULL, 'TUE:', '7am'),
(4, NULL, 'WED:', '9AM CPL C'),
(5, NULL, 'THU:', ''),
(6, NULL, 'FRI:', 'test'),
(7, NULL, 'SAT:', '');

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `id` int(11) NOT NULL,
  `first_name` varchar(155) DEFAULT NULL,
  `middle_name` varchar(155) DEFAULT NULL,
  `last_name` varchar(155) DEFAULT NULL,
  `is_active` varchar(45) NOT NULL DEFAULT '1',
  `user_id` tinyint(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`id`, `first_name`, `middle_name`, `last_name`, `is_active`, `user_id`) VALUES
(7, 'aman', 'aman', 'aman', '1', 3),
(8, 'nico', 'nico', 'nico', '1', 4),
(9, 'aljen', 'aljen', 'aljen', '1', 5);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(45) NOT NULL,
  `is_admin` varchar(45) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `schedule_test`
--

CREATE TABLE `schedule_test` (
  `schedule_id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `slot` varchar(45) DEFAULT NULL,
  `RP-C3380` varchar(45) DEFAULT NULL,
  `RP-C2589` varchar(45) DEFAULT NULL,
  `RP-C2878` varchar(45) DEFAULT NULL,
  `RP-C1123` varchar(45) DEFAULT NULL,
  `RP-C4442` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule_test`
--

INSERT INTO `schedule_test` (`schedule_id`, `date`, `slot`, `RP-C3380`, `RP-C2589`, `RP-C2878`, `RP-C1123`, `RP-C4442`) VALUES
(31, '2020-07-04 00:00:00', '1', '104', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `schedule_test_ins`
--

CREATE TABLE `schedule_test_ins` (
  `id` int(11) NOT NULL,
  `instructor` int(11) DEFAULT NULL,
  `student` int(11) DEFAULT NULL,
  `purpose` int(11) DEFAULT NULL,
  `is_requiest` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule_test_ins`
--

INSERT INTO `schedule_test_ins` (`id`, `instructor`, `student`, `purpose`, `is_requiest`) VALUES
(1, 1, 1, 1, 0),
(2, 1, 1, 1, 0),
(3, 1, 1, 1, 0),
(4, 1, 1, 1, 0),
(5, 1, 1, 1, 0),
(6, 1, 1, 1, 0),
(7, 1, 1, 1, 0),
(8, 1, 1, 1, 0),
(9, 1, 1, 1, 0),
(10, 1, 1, 1, 0),
(11, 1, 1, 1, 0),
(12, 1, 1, 1, 0),
(13, 1, 1, 1, 0),
(14, 1, 1, 1, 0),
(15, 1, 2, 3, 0),
(16, 1, 1, 2, 0),
(17, 2, 2, 2, 0),
(18, 1, 1, 1, 0),
(19, 1, 1, 1, 0),
(20, 1, 2, 1, 0),
(21, 1, 1, 1, 0),
(22, 1, 1, 1, 0),
(23, 1, 1, 2, 0),
(24, 1, 1, 2, 0),
(25, 1, 1, 1, 0),
(26, 1, 1, 2, 0),
(27, 1, 1, 1, 0),
(28, 1, 1, 1, 0),
(29, 1, 1, 1, 0),
(30, 1, 1, 1, 0),
(31, 1, 1, 1, 0),
(32, 1, 1, 1, 0),
(33, 1, 1, 1, 0),
(34, 1, 1, 1, 0),
(35, 1, 1, 1, 0),
(36, 1, 1, 1, 0),
(37, 1, 1, 1, 0),
(38, 1, 1, 1, 0),
(39, 1, 1, 1, 0),
(40, 1, 1, 1, 0),
(41, 1, 1, 1, 0),
(42, 1, 1, 1, 0),
(43, 1, 1, 1, 0),
(44, 1, 1, 1, 0),
(45, 1, 1, 1, 0),
(46, 1, 1, 1, 0),
(47, 1, 1, 1, 0),
(48, 1, 1, 1, 0),
(49, 1, 1, 1, 0),
(50, 1, 1, 1, 0),
(51, 1, 1, 1, 0),
(52, 1, 1, 1, 0),
(53, 1, 1, 1, 0),
(54, 3, 2, 2, 0),
(55, 2, 2, 1, 0),
(56, 2, 2, 1, 0),
(57, 1, 1, 1, 0),
(58, 1, 1, 1, 0),
(59, 1, 1, 1, 0),
(60, 1, 1, 1, 0),
(61, 1, 1, 1, 0),
(62, 1, 1, 1, 0),
(63, 1, 1, 1, 0),
(64, 1, 1, 1, 0),
(65, 2, 2, 2, 0),
(66, 2, 2, 1, 0),
(67, 1, 1, 1, 0),
(68, 2, 2, 1, 0),
(69, 2, 1, 1, 0),
(70, 3, 1, 1, 0),
(71, 2, 1, 1, 0),
(72, 1, 2, 1, 0),
(73, 2, 2, 1, 0),
(74, 1, 1, 1, 0),
(75, 1, 2, 1, 0),
(76, 1, 1, 1, 0),
(77, 1, 1, 1, 0),
(78, 1, 2, 1, 0),
(79, 1, 2, 1, 0),
(80, 1, 2, 1, 0),
(81, 1, 2, 1, 0),
(82, 1, 3, 1, 0),
(83, 1, 2, 1, 0),
(84, 1, 2, 1, 0),
(85, 1, 2, 1, 0),
(86, 1, 3, 1, 0),
(87, 3, 2, 1, 0),
(88, 1, 2, 1, 0),
(89, 1, 2, 1, 0),
(90, 1, 2, 1, 0),
(91, 1, 2, 1, 0),
(92, 1, 4, 1, 0),
(93, 1, 2, 1, 0),
(94, 1, 3, 1, 0),
(95, 2, 3, 1, 0),
(96, 1, 1, 1, 0),
(97, 1, 2, 1, 0),
(98, 1, 3, 1, 0),
(99, 1, 1, 1, 0),
(100, 1, 1, 1, 0),
(101, 4, 2, 1, 0),
(102, 4, 2, 1, 0),
(103, 4, 2, 1, 0),
(104, 4, 2, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `slots`
--

CREATE TABLE `slots` (
  `id` int(11) NOT NULL,
  `slot_time` varchar(45) NOT NULL,
  `slot_id` int(11) NOT NULL,
  `active` varchar(45) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `slots`
--

INSERT INTO `slots` (`id`, `slot_time`, `slot_id`, `active`) VALUES
(1, '0600-0900', 1, '0'),
(2, '0900-1230', 2, '1'),
(3, '1200-1500', 3, '1'),
(4, '1500-1800', 4, '1'),
(5, '2000', 5, '0'),
(8, '2100', 6, '1');

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `page_id` int(11) NOT NULL DEFAULT '1',
  `is_active` varchar(45) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`id`, `name`, `text`, `user_id`, `page_id`, `is_active`) VALUES
(1, 'ALI', 'Ayala land', 1, 1, '0'),
(3, 'PGOLD', 'Puregold', 1, 1, '0'),
(7, 'MEG', 'MEG', 1, 1, '1'),
(8, 'PAL', 'PAL', 1, 1, '1'),
(14, 'FB', 'FB', 1, 1, '0'),
(19, 'GTCAP', 'GTCAP', 1, 1, '0'),
(22, 'DITO', 'DITO', 1, 1, '0'),
(26, 'CEB', 'CEB', 1, 1, '0'),
(28, 'DD', 'DD', 1, 1, '0'),
(36, '2GO', '2GO', 1, 1, '0'),
(37, 'MAC', 'MAC', 1, 2, '1'),
(38, 'BPI', 'BPI', 1, 2, '1'),
(39, 'MPI', 'MPI', 1, 3, '1'),
(40, 'MPI', 'MPI', 1, 4, '1'),
(41, 'CEB', 'CEB', 1, 5, '1'),
(42, 'APVI', 'APVI', 1, 1, '0'),
(44, 'PGOLD', 'PGOLD', 1, 2, '1'),
(45, 'MEG', 'MEG', 1, 3, '1'),
(47, 'MPI', 'MPI', 1, 1, '1'),
(48, 'JFC', 'JFC', 1, 1, '1'),
(50, 'AC', 'AC', 1, 1, '0'),
(51, 'NIKL', 'NIKL', 1, 1, '0'),
(52, 'MPI', 'MPI', 1, 1, '0'),
(53, 'MM', 'MM', 1, 1, '1'),
(54, 'TEST', 'TEST', 1, 1, '0'),
(55, 'PGOLD', 'PGOLD', 1, 1, '1'),
(56, 'PGOLDS', 'PGOLDS', 1, 1, '0'),
(57, 'PGOLDS', 'PGOLDS', 1, 1, '0'),
(58, 'DONE', 'DONE', 1, 1, '0'),
(59, 'DONE', 'DONE', 1, 1, '0'),
(60, 'LTG', 'LTG', 1, 1, '1'),
(61, 'LTG', 'LTG', 1, 1, '0'),
(62, 'MM', 'MM', 1, 1, '0'),
(63, 'MEG', 'MEG', 1, 1, '0'),
(64, 'FNI', 'FNI', 1, 1, '1');

-- --------------------------------------------------------

--
-- Table structure for table `stocks_user`
--

CREATE TABLE `stocks_user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stocks_user`
--

INSERT INTO `stocks_user` (`user_id`, `username`, `password`, `is_active`) VALUES
(1, 'admin', 'password', 1);

-- --------------------------------------------------------

--
-- Table structure for table `stock_info`
--

CREATE TABLE `stock_info` (
  `stock_info_id` int(11) NOT NULL,
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
  `change_perc` varchar(225) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stock_info`
--

INSERT INTO `stock_info` (`stock_info_id`, `stock_id`, `name`, `text`, `shares`, `entry`, `stock_exit`, `be`, `p1`, `p2`, `p5`, `p10`, `alert`, `alerted`, `risk_entry`, `risk_exit`, `risk_capital`, `risk_perc`, `risk_shares`, `current_price`, `change_perc`) VALUES
(1290, '3', 'none', 'Bias hard to reach >50 since resistance at 50 and last 50 price is 2018\n\nIf Price reach >50 start buy\n', 500, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P46.70 (-2.71%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P48.00</a> </div>'),
(1300, '19', 'none', 'Good for Long Term', 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P400.00 (-1.23%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P405.00</a> </div>'),
(1517, '8', 'none', 'test', 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P5.80 (-1.69%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P5.90</a> </div>'),
(1803, '22', 'none', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P2.66 (-2.21%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P2.72</a> </div>'),
(1840, '7', 'none', 'MEGAWORLD\n\nwait for 2.85 then check for bounce play', 0, 0, 0, 0, 0, 0, 0, 0, 2.85, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P2.91 (-3.32%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P3.01</a> </div>'),
(1860, '26', 'none', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P37.05 (-3.52%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P38.40</a> </div>'),
(1889, '28', 'none', '', 3000, 18.3, 17, 18.6, 18.7, 18.9, 19.5, 20.4, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#18C718\">P15.00 (0.54%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#18C718\">P14.92</a> </div>'),
(1890, '36', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P8.34 (-0.12%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P8.35</a> </div>'),
(1898, '37', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P5.25 (-0.19%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P5.26</a> </div>'),
(1916, '38', 'none', 'BPI', 1000, 15, 0, 15.2, 15.4, 15.5, 16, 16.7, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#18C718\">P70.85 (1.21%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#18C718\">P70.00</a> </div>'),
(1948, '1', 'none', 'ALI', 1000, 38, 0, 38.6, 39, 39.4, 40.5, 42.4, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P31.90 (-1.85%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P32.50</a> </div>'),
(1950, '14', 'none', '/Last Log: 31/8/2020 @ 8:58:45\n\n/Last Log: 31/8/2020 @ 8:59:11', 300, 63.6, 70, 64.6, 65.3, 65.9, 67.8, 71.1, 66, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P63.95 (-0.08%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P64.00</a> </div>'),
(1951, '39', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1952, '40', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1953, '41', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1954, '42', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P12.66 (-5.80%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P13.44</a> </div>'),
(1956, '44', 'none', 'test', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1957, '45', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1959, '47', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P3.36 (-1.47%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P3.41</a> </div>'),
(1960, '48', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P135.10 (-2.60%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P138.70</a> </div>'),
(1962, '50', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1963, '51', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1964, '52', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1965, '53', 'none', '/Last Log: 31/8/2020 @ 16:11:53\n\n/Last Log: 31/8/2020 @ 16:11:56\n', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P2.94 (-5.77%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P3.12</a> </div>'),
(1966, '54', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1967, '55', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#18C718\">P54.00 (5.47%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#18C718\">P51.20</a> </div>'),
(1968, '56', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1969, '57', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1970, '58', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1971, '59', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1972, '60', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#18C718\">P8.42 (1.94%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#18C718\">P8.26</a> </div>'),
(1973, '61', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0'),
(1974, '62', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P2.94 (-5.77%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P3.12</a> </div>'),
(1975, '63', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P2.91 (-3.32%)</a> </div>', '<div class=\"large-3 columns\"> <span style=\"color:#FF4C4C\">P3.01</a> </div>'),
(1976, '64', 'none', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `middle_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `telephone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `user_id` tinyint(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `first_name`, `middle_name`, `last_name`, `is_active`, `telephone`, `email`, `user_id`) VALUES
(7, 'eccel', 'eccel', 'eccel', 1, NULL, NULL, 6),
(8, 'sherwin', 'sherwin', 'sherwin', 1, NULL, NULL, 7),
(10, 'jl', 'jl', 'jl', 1, NULL, NULL, 8),
(11, 'earl', 'earl', 'earl', 1, NULL, NULL, 11),
(13, 'patrick', 'patrick', 'patrick', 1, NULL, NULL, 12);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(400) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `middle_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `role_id` varchar(45) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `student_id` int(11) DEFAULT NULL,
  `instructor_id` int(11) DEFAULT NULL,
  `user_type` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `first_name`, `middle_name`, `last_name`, `role_id`, `is_admin`, `is_active`, `student_id`, `instructor_id`, `user_type`) VALUES
(1, 'admin', 'password', 'admin', 'admin', 'admin', '1', 1, 1, NULL, NULL, 1),
(2, 'scheduler', 'scheduler', 'scheduler', 'scheduler', 'scheduler', NULL, 0, 1, NULL, NULL, 2),
(3, 'aman', 'aman', 'aman', 'aman', 'aman', NULL, 0, 1, NULL, NULL, 2),
(4, 'nico', 'nico', 'nico', 'nico', 'nico', NULL, 0, 1, NULL, NULL, 2),
(5, 'aljen', 'aljen', 'aljen', 'aljen', 'aljen', NULL, 0, 1, NULL, NULL, 2),
(6, 'eccel', 'eccel', 'eccel', 'eccel', 'eccel', NULL, 0, 1, NULL, NULL, 3),
(7, 'sherwin', 'sherwin', 'sherwin', 'sherwin', 'sherwin', NULL, 0, 1, NULL, NULL, 3),
(8, 'jl', 'jl', 'jl', 'jl', 'jl', NULL, 0, 1, NULL, NULL, 3),
(9, 'test', 'test', 'test', 'test', 'test2', NULL, 0, 0, NULL, NULL, 3),
(10, 'jr', 'jr', 'jr', 'jr', 'jr', NULL, 0, 1, NULL, NULL, 2),
(11, 'earl', 'earl', 'earl', 'earl', 'earl', NULL, 0, 1, NULL, NULL, 3),
(12, 'patrick', 'patrick', 'patrick', 'patrick', 'patrick', NULL, 0, 1, NULL, NULL, 3),
(13, 'jp', 'jp', 'jp', 'jp', 'jp', NULL, 0, 0, NULL, NULL, 3),
(14, 'scheduler', 'scheduler', 'scheduler', 'scheduler', 'scheduler', NULL, 0, 0, NULL, NULL, 3),
(15, 'jayceljayceljayc', 'jayceljayceljayc', 'asdasdasdsadsadsadsa', 'asdadsadsadsadsadsad', 'asdfsfdsafasdfdsafas', NULL, 0, 0, NULL, NULL, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aircraft`
--
ALTER TABLE `aircraft`
  ADD PRIMARY KEY (`aircraft_id`),
  ADD UNIQUE KEY `aircraft_id_UNIQUE` (`aircraft_id`);

--
-- Indexes for table `flight_purpose`
--
ALTER TABLE `flight_purpose`
  ADD PRIMARY KEY (`purpose_id`),
  ADD UNIQUE KEY `purpose_id_UNIQUE` (`purpose_id`);

--
-- Indexes for table `ground_schedule`
--
ALTER TABLE `ground_schedule`
  ADD PRIMARY KEY (`gs_id`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `schedule_test`
--
ALTER TABLE `schedule_test`
  ADD PRIMARY KEY (`schedule_id`),
  ADD UNIQUE KEY `schedule_id_UNIQUE` (`schedule_id`);

--
-- Indexes for table `schedule_test_ins`
--
ALTER TABLE `schedule_test_ins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `slots`
--
ALTER TABLE `slots`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slot_id_UNIQUE` (`id`);

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stocks_user`
--
ALTER TABLE `stocks_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id_UNIQUE` (`user_id`);

--
-- Indexes for table `stock_info`
--
ALTER TABLE `stock_info`
  ADD PRIMARY KEY (`stock_info_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aircraft`
--
ALTER TABLE `aircraft`
  MODIFY `aircraft_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `flight_purpose`
--
ALTER TABLE `flight_purpose`
  MODIFY `purpose_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `schedule_test`
--
ALTER TABLE `schedule_test`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `schedule_test_ins`
--
ALTER TABLE `schedule_test_ins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `slots`
--
ALTER TABLE `slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `stocks_user`
--
ALTER TABLE `stocks_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `stock_info`
--
ALTER TABLE `stock_info`
  MODIFY `stock_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1977;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
