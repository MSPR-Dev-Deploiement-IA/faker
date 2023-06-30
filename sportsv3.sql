USE sports;

CREATE TABLE `club` (
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` varchar(50),
  `home_stadium_id` int
);

CREATE TABLE `staff_type` (
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `type` varchar(50)
);

CREATE TABLE `staff` (
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `first_name` varchar(50),
  `last_name` varchar(50),
  `type` int,
  `club_id` int
);

CREATE TABLE `statistics` (
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `lifetime_goals` INT,
  `lifetime_matches` INT,
  `first_match` DATE
);

CREATE TABLE `player` (
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `first_name` varchar(50),
  `last_name` varchar(50),
  `sex` enum('', 'male', 'female'),
  `club_id` int,
  `sponsor_id` int,
  `statistics_id` int
);

CREATE TABLE `competition_type` (
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` varchar(50)
);

CREATE TABLE `competition` (
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` varchar(50),
  `type` int,
  `importance` enum('low', 'medium', 'high')
);

CREATE TABLE `sponsor` (
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` varchar(50)
);

CREATE TABLE `competition_instance` (
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `year` varchar(4),
  `nb_club_participants` int,
  `competition_id` int
);

CREATE TABLE `competition_clubs` (
  `competition_instance_id` int,
  `club_id` int
);

CREATE TABLE `stadium` (
  `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` varchar(200)
);

ALTER TABLE club ADD CONSTRAINT fk1 FOREIGN KEY (home_stadium_id) REFERENCES stadium (id);
ALTER TABLE `staff` ADD CONSTRAINT fk2 FOREIGN KEY (`type`) REFERENCES `staff_type` (`id`);
ALTER TABLE `staff` ADD CONSTRAINT fk3 FOREIGN KEY (`club_id`) REFERENCES  club(id);
ALTER TABLE `player` ADD CONSTRAINT fk4 FOREIGN KEY (`statistics_id`) REFERENCES  statistics(id);
ALTER TABLE `player` ADD CONSTRAINT fk5 FOREIGN KEY (`club_id`) REFERENCES `club` (`id`);
ALTER TABLE `player` ADD CONSTRAINT fk6 FOREIGN KEY (`sponsor_id`) REFERENCES `sponsor` (`id`);
ALTER TABLE `competition` ADD CONSTRAINT fk7 FOREIGN KEY (`type`) REFERENCES `competition_type` (`id`);
ALTER TABLE `competition_instance` ADD CONSTRAINT fk8 FOREIGN KEY (`competition_id`) REFERENCES `competition` (`id`);
ALTER TABLE `competition_clubs` ADD CONSTRAINT fk9 FOREIGN KEY (`competition_instance_id`) REFERENCES `competition_instance` (`id`);
ALTER TABLE `competition_clubs` ADD CONSTRAINT fk10 FOREIGN KEY (`club_id`) REFERENCES `club` (`id`);