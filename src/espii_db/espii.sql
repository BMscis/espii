-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema results
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema results
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `results` DEFAULT CHARACTER SET utf8 ;
USE `results` ;

-- -----------------------------------------------------
-- Table `results`.`time_stamp`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `results`.`time_stamp` (
  `time_index` INT NOT NULL AUTO_INCREMENT,
  `timestamp` TIMESTAMP(6) NOT NULL,
  `played_duration` FLOAT NOT NULL,
  `score` INT NOT NULL,
  `acrid` VARCHAR(45) NOT NULL,
  UNIQUE INDEX `musiccol_UNIQUE` (`timestamp` ASC),
  UNIQUE INDEX `index_UNIQUE` (`time_index` ASC),
  PRIMARY KEY (`timestamp`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `results`.`album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `results`.`album` (
  `album_index` INT NOT NULL AUTO_INCREMENT,
  `album_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`album_name`),
  UNIQUE INDEX `idalbum_UNIQUE` (`album_index` ASC),
  UNIQUE INDEX `album_name_UNIQUE` (`album_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `results`.`artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `results`.`artist` (
  `artist_index` INT NOT NULL AUTO_INCREMENT,
  `artist_name` VARCHAR(255) NOT NULL,
  UNIQUE INDEX `idartist_UNIQUE` (`artist_index` ASC),
  PRIMARY KEY (`artist_name`),
  UNIQUE INDEX `artist_name_UNIQUE` (`artist_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `results`.`metadata`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `results`.`metadata` (
  `meta_index` INT NOT NULL AUTO_INCREMENT,
  `db_begin_time_offset` INT NOT NULL,
  `db_end_time_offset` INT NOT NULL,
  `duration` INT NOT NULL,
  `play_offset` INT NOT NULL,
  `sample_begin_time_offset` INT NOT NULL,
  `sample_end_time_offset` INT NOT NULL,
  `time_stamp` TIMESTAMP(6) NOT NULL,
  UNIQUE INDEX `index_UNIQUE` (`meta_index` ASC),
  PRIMARY KEY (`time_stamp`),
  UNIQUE INDEX `time_stamp_UNIQUE` (`time_stamp` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `results`.`contributors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `results`.`contributors` (
  `comt_index` INT NOT NULL AUTO_INCREMENT,
  `contributor_name` VARCHAR(255) NOT NULL,
  UNIQUE INDEX `comp_index_UNIQUE` (`comt_index` ASC),
  PRIMARY KEY (`contributor_name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `results`.`track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `results`.`track` (
  `track_index` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `genre` VARCHAR(255) NULL,
  `label` VARCHAR(255) NULL,
  `release_date` VARCHAR(255) NULL,
  `artist_name` VARCHAR(255) NOT NULL,
  `album_name` VARCHAR(255) NOT NULL,
  `contributor_name` VARCHAR(255) NOT NULL,
  `acrid` VARCHAR(45) NOT NULL,
  UNIQUE INDEX `idtrack_UNIQUE` (`track_index` ASC),
  PRIMARY KEY (`acrid`),
  UNIQUE INDEX `acrid_UNIQUE` (`acrid` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `results`.`acr_id`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS`acr_id` (
  `acr_index` INT NOT NULL AUTO_INCREMENT,
  `acrid` VARCHAR(45) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`acrid`),
  UNIQUE INDEX `track_idtrack_UNIQUE` (`acr_index` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
