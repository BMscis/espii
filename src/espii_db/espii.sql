-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema monitor_results
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema monitor_results
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `monitor_results` DEFAULT CHARACTER SET utf8 ;
USE `monitor_results` ;

-- -----------------------------------------------------
-- Table `monitor_results`.`time_stamp`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `monitor_results`.`time_stamp` (
  `timestamp` TIMESTAMP(6) NOT NULL,
  `played_duration` INT NOT NULL,
  `acrid` VARCHAR(45) NOT NULL,
  `score` INT NOT NULL,
  PRIMARY KEY (`timestamp`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `musiccol_UNIQUE` ON `monitor_results`.`time_stamp` (`timestamp` ASC);


-- -----------------------------------------------------
-- Table `monitor_results`.`artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `monitor_results`.`artist` (
  `idartist` INT NOT NULL AUTO_INCREMENT,
  `artist_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idartist`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `idartist_UNIQUE` ON `monitor_results`.`artist` (`idartist` ASC);

CREATE UNIQUE INDEX `artist_name_UNIQUE` ON `monitor_results`.`artist` (`artist_name` ASC);


-- -----------------------------------------------------
-- Table `monitor_results`.`album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `monitor_results`.`album` (
  `idalbum` INT NOT NULL AUTO_INCREMENT,
  `album_name` VARCHAR(45) NOT NULL,
  `artist_idartist` INT NOT NULL,
  PRIMARY KEY (`idalbum`),
  CONSTRAINT `fk_album_artist`
    FOREIGN KEY (`artist_idartist`)
    REFERENCES `monitor_results`.`artist` (`idartist`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `idalbum_UNIQUE` ON `monitor_results`.`album` (`idalbum` ASC);

CREATE UNIQUE INDEX `album_name_UNIQUE` ON `monitor_results`.`album` (`album_name` ASC);

CREATE INDEX `fk_album_artist_idx` ON `monitor_results`.`album` (`artist_idartist` ASC);


-- -----------------------------------------------------
-- Table `monitor_results`.`metadata`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `monitor_results`.`metadata` (
  `db_begin_time_offset` INT NOT NULL,
  `db_end_time_offset` INT NOT NULL,
  `duration` INT NOT NULL,
  `play_offset` INT NOT NULL,
  `sample_begin_time_offset` INT NOT NULL,
  `sample_end_time_offset` INT NOT NULL,
  `time_stamp_timestamp` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`time_stamp_timestamp`),
  CONSTRAINT `fk_metadata_time_stamp1`
    FOREIGN KEY (`time_stamp_timestamp`)
    REFERENCES `monitor_results`.`time_stamp` (`timestamp`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `monitor_results`.`track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `monitor_results`.`track` (
  `idtrack` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `genre` VARCHAR(45) NOT NULL,
  `label` VARCHAR(45) NOT NULL,
  `release_date` DATE NOT NULL,
  `album_idalbum` INT NOT NULL,
  PRIMARY KEY (`idtrack`),
  CONSTRAINT `fk_track_album1`
    FOREIGN KEY (`album_idalbum`)
    REFERENCES `monitor_results`.`album` (`idalbum`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `idtrack_UNIQUE` ON `monitor_results`.`track` (`idtrack` ASC);

CREATE INDEX `fk_track_album1_idx` ON `monitor_results`.`track` (`album_idalbum` ASC);


-- -----------------------------------------------------
-- Table `monitor_results`.`acrid`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `monitor_results`.`acrid` (
  `acrid` VARCHAR(45) NOT NULL,
  `track_idtrack` INT NOT NULL,
  PRIMARY KEY (`track_idtrack`),
  CONSTRAINT `fk_acrid_track1`
    FOREIGN KEY (`track_idtrack`)
    REFERENCES `monitor_results`.`track` (`idtrack`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `acrid_UNIQUE` ON `monitor_results`.`acrid` (`acrid` ASC);


-- -----------------------------------------------------
-- Table `monitor_results`.`composers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `monitor_results`.`composers` (
  `composer_name` VARCHAR(45) NOT NULL,
  `acrid_track_idtrack` INT NOT NULL,
  PRIMARY KEY (`acrid_track_idtrack`),
  CONSTRAINT `fk_composers_acrid1`
    FOREIGN KEY (`acrid_track_idtrack`)
    REFERENCES `monitor_results`.`acrid` (`track_idtrack`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
