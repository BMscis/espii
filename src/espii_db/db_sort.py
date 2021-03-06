import os
import json
import time
import logging
import platform
import threading
import mysql.connector
from datetime import datetime
from datetime import timedelta
from multiprocessing import Process
from mysql.connector import errorcode
from mysql.connector import errorcode

logging.basicConfig(filename='/var/log/espii/espii_db.log',level=10, format='%(asctime)s %(levelname)s %(message)s')
class Espii:

    def __init__(self, user,password,channel_id):
        """
        This is a database logger, given a user name, password and DB_NAME,
        Create DB if not exists.
        Create table if not exist
        Commit json data into mysql
        """
        self.user = user
        self.password = password
        self.channel_id = channel_id
        self.cnx = mysql.connector.connect(user=self.user, password=self.password,host='127.0.0.1')
        self.cursor = self.cnx.cursor(buffered=True)

        if platform.platform()[0:7] == 'Windows':
            self.data = open('C:/Users/melvi/{}.json'.format(self.channel_id))
            self.json_data = json.load(self.data)

        elif platform.platform()[0:5] == 'Linux':
            self.data = open('/var/www/html/espii/src/espii_db/stations/station_data/{}.json'.format(self.channel_id))
            self.json_data = json.load(self.data)
        
        self.run()
    def run(self):
            self.create_database()
            self.send_acr_id()
            self.send_album_name()
            self.send_timestamp_data()
            self.send_track_data()
            self.send_artist_names()
            self.send_metadata()
            self.send_contributor_data()
            self.commit()
    def create_database (self):
        DB_NAME = str(self.channel_id)
        TABLES = {}
        TABLES['time_stamp'] = (
            "CREATE TABLE IF NOT EXISTS `time_stamp` ("
            "`time_index` INT NOT NULL AUTO_INCREMENT,"
            "`timestamp` TIMESTAMP(6) NOT NULL,"
            "`played_duration` FLOAT NOT NULL,"
            "`score` INT NOT NULL,"
            "`acrid` VARCHAR(45) NOT NULL,"
            "UNIQUE INDEX `musiccol_UNIQUE` (`timestamp` ASC),"
            "UNIQUE INDEX `index_UNIQUE` (`time_index` ASC),"
            "PRIMARY KEY (`timestamp`)"
            ")ENGINE = InnoDB;"
        )
        TABLES['album']=(
            "CREATE TABLE IF NOT EXISTS `album` ("
            "`album_index` INT NOT NULL AUTO_INCREMENT,"
            "`album_name` VARCHAR(255) NOT NULL,"
            "PRIMARY KEY (`album_name`),"
            "UNIQUE INDEX `idalbum_UNIQUE` (`album_index` ASC),"
            "UNIQUE INDEX `album_name_UNIQUE` (`album_name` ASC)"
            ")ENGINE = InnoDB;"
        )
        TABLES['artist']=(
            "CREATE TABLE IF NOT EXISTS `artist` ("
            "`artist_index` INT NOT NULL AUTO_INCREMENT,"
            "`artist_name` VARCHAR(255) NOT NULL,"
            "UNIQUE INDEX `idartist_UNIQUE` (`artist_index` ASC),"
            "PRIMARY KEY (`artist_name`),"
            "UNIQUE INDEX `artist_name_UNIQUE` (`artist_name` ASC)"
            ")ENGINE = InnoDB;"
        )
        TABLES['metadata']=(
            "CREATE TABLE IF NOT EXISTS `metadata` ("
            "`meta_index` INT NOT NULL AUTO_INCREMENT,"
            "`db_begin_time_offset` INT NOT NULL,"
            "`db_end_time_offset` INT NOT NULL,"
            "`duration` INT NOT NULL,"
            "`play_offset` INT NOT NULL,"
            "`sample_begin_time_offset` INT NOT NULL,"
            "`sample_end_time_offset` INT NOT NULL,"
            "`time_stamp` TIMESTAMP(6) NOT NULL,"
            "UNIQUE INDEX `index_UNIQUE` (`meta_index` ASC),"
            "PRIMARY KEY (`time_stamp`),"
            "UNIQUE INDEX `time_stamp_UNIQUE` (`time_stamp` ASC)"
            ")ENGINE = InnoDB;"
        )
        TABLES['contributors']=(
            "CREATE TABLE IF NOT EXISTS `contributors` ("
            "`comt_index` INT NOT NULL AUTO_INCREMENT,"
            "`contributor_name` VARCHAR(255) NOT NULL,"
            "UNIQUE INDEX `comp_index_UNIQUE` (`comt_index` ASC),"
            "PRIMARY KEY (`contributor_name`)"
            ")ENGINE = InnoDB;"
        )
        TABLES['track']=(
            "CREATE TABLE IF NOT EXISTS `track` ("
            "`track_index` INT NOT NULL AUTO_INCREMENT,"
            "`title` VARCHAR(255) NOT NULL,"
            "`genre` VARCHAR(255) NULL,"
            "`label` VARCHAR(255) NULL,"
            "`release_date` VARCHAR(255) NULL,"
            "`artist_name` VARCHAR(255) NOT NULL,"
            "`album_name` VARCHAR(255) NOT NULL,"
            "`contributor_name` VARCHAR(255) NOT NULL,"
            "`acrid` VARCHAR(45) NOT NULL,"
            "UNIQUE INDEX `idtrack_UNIQUE` (`track_index` ASC),"
            "PRIMARY KEY (`acrid`),"
            "UNIQUE INDEX `acrid_UNIQUE` (`acrid` ASC)"
            ")ENGINE = InnoDB;"
        )
        TABLES['acr_id']=(
            "CREATE TABLE IF NOT EXISTS `acr_id` ("
            "`acr_index` INT NOT NULL AUTO_INCREMENT,"
            "`acrid` VARCHAR(45) NOT NULL,"
            "`title` VARCHAR(255) NOT NULL,"
            "PRIMARY KEY (`acrid`),"
            "UNIQUE INDEX `track_idtrack_UNIQUE` (`acr_index` ASC)"
            ")ENGINE = InnoDB;"
        )
        create_database = "CREATE SCHEMA IF NOT EXISTS `{}` DEFAULT CHARACTER SET utf8".format(DB_NAME)
        
        try:
            self.cursor.execute(create_database)
            logging.info('{} created successfuly'.format(DB_NAME))

        except mysql.connector.IntegrityError as err:
            logging.error('{}: failed creating DataBase  {}'.format(DB_NAME,err))
            exit(1)

        #use_database = "USE {}".format(DB_NAME)
        try:
            self.cnx = mysql.connector.connect(user=self.user, password=self.password,host='127.0.0.1',database=DB_NAME)
            self.cursor = self.cnx.cursor(buffered=True)
            logging.info('{} connected successfuly'.format(DB_NAME))
        except mysql.connector.Error as err:
            logging.error('{}: failed to connect to table: {}'.format(err))
            exit(1)

        for table_name in TABLES:
            table_description = TABLES[table_name]
            try:
                logging.info('Creating table {}'.format(table_name))
                self.cursor.execute(table_description)
            except mysql.connector.Error as err:
                if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                    logging.debug('already exists')
                else:
                    logging.error('{} failed to create table: {}'.format(table_name,err.msg))
            else:
                logging.info('{} table created successfuly'.format(table_name))
    def execute_mysql (self,i,table_name, columns,values,cursor):
        if type(values) == tuple :
            add_data="INSERT INTO {}({}) VALUES{}".format(table_name,columns,values)
        if type(values) == str :
            add_data="INSERT INTO %s(%s) VALUES(%s)" %(table_name,columns,values)
        cursor.execute(add_data)
        #cursor = 0
        #logging.info('{} OK {}'.format(i,add_data))
    def search_mysql (self,query_column,table_name, anchor_column, value,cursor):
        search_data="SELECT %s FROM %s WHERE %s = \"%s\"" % (query_column,table_name,anchor_column,value)
        #val = "%s" % value
        #print(search_data)
        cursor.execute(search_data)
        result = cursor.fetchall()
        #checker = int(len(result))
        #print(result)
    def get_acrid_data(self,i,x):
        acrid = self.json_data[i]['metadata']['music'][x]['acrid']
        acrid_ = json.dumps(acrid)

        return acrid_
    def get_album_data(self,i,x):
        album = self.json_data[i]['metadata']['music'][x]['album']['name']
        album_ = json.dumps(album)
        """
        xa = '\''
        xb = '\"'
        xz = '\\'
        if album_[0] == xa or xb:
            album_ = album_[:0] +'\\'+ album_[0:]
        for y in range(len(album_)-1,0,-1):
            if album_[y] == xa and album_[y-1] != xz:
                album_ = album_[:y] +'\\'+ album_[y:]
            elif album_[y] == xb and album_[y-1] != xz:
                album_ = album_[:y] +'\\'+ album_[y:]
        """        
        return album_
    def get_title_data(self,i,x):
        try:
            title = self.json_data[i]['metadata']['music'][x]['title']
            title_ = json.dumps(title)
        except KeyError:
            title_ = json.dumps('none')

        return title_
    def get_genre_data(self,i,x):
        try:
            genre = self.json_data[i]['metadata']['music'][x]['genres'][0]['name']
            genre_ = json.dumps(genre)
        except KeyError:
            genre_ = json.dumps('none')

        return genre_
    def get_label_data(self,i,x):
            try:
                label = self.json_data[i]['metadata']['music'][x]['label']
                label_ = json.dumps(label)
            except KeyError:
                label_ = json.dumps('none')

            return label_
    def get_release_date_data(self,i,x):
            try:
                release_date = self.json_data[i]['metadata']['music'][x]['release_date']
                release_date_ = json.dumps(release_date)
            except KeyError:
                release_date_ = json.dumps('none')

            return release_date_
    def get_all_contributors_data(self,i,x):
        contributors = ''
        try:
            for lyricists in self.json_data[i]['metadata']['music'][x]['contributors']['lyricists']:
                contributors += lyricists
            contributors_ = json.dumps(contributors)
        except KeyError:
            contributors_ = json.dumps('none')

        return contributors_
    def get_each_contributors_data(self,i,x,y):
        try:
            contributor =  self.json_data[i]['metadata']['music'][x]['contributors']['lyricists'][y]
            contributors_ = json.dumps(contributor)
        except KeyError:
            contributors_ = json.dumps('none')

        return contributors_
    def get_timestamp(self,i,x):
        get_timestamp = self.json_data[i]['metadata']['timestamp_utc']
        timestamp_date = datetime.strptime(str(get_timestamp), '%Y-%m-%d %H:%M:%S')+timedelta(hours=3)
        timestamp_ = timestamp_date + timedelta(seconds=x)
        #timestamp = datetime.strftime(timestamp_change, '%Y-%m-%d %H:%M:%S')
        return timestamp_
    def get_played_duration(self,i,x):
        get_played_duration = self.json_data[i]['metadata']['played_duration']*1000
        played_duration_ = json.dumps(get_played_duration + x)

        return played_duration_
    def get_score_data(self,i,x):
        score= self.json_data[i]['metadata']['music'][x]['score']
        score_ = json.dumps(score)

        return score_
    def get_db_begin_time_offset(self,i,x):
        db_begin_time = self.json_data[i]['metadata']['music'][x]['db_begin_time_offset_ms']
        db_begin_time_ = json.dumps(db_begin_time)
        return db_begin_time_
    def get_db_end_time_offset(self,i,x):
        db_end_time = self.json_data[i]['metadata']['music'][x]['db_end_time_offset_ms']
        db_end_time_ = json.dumps(db_end_time)
        return db_end_time_
    def get_duration(self,i,x):
        duration = self.json_data[i]['metadata']['music'][x]['duration_ms']
        duration_ = json.dumps(duration)
        return duration_
    def get_play_offset(self,i,x):
        play_offset = self.json_data[i]['metadata']['music'][x]['play_offset_ms']
        play_offset_ = json.dumps(play_offset)
        return play_offset_
    def get_sample_begin_time_offset(self,i,x):
        sample_begin_time = self.json_data[i]['metadata']['music'][x]['sample_begin_time_offset_ms']
        sample_begin_time_ = json.dumps(sample_begin_time)
        return sample_begin_time_
    def get_sample_end_time_offset(self,i,x):
        sample_end_time = self.json_data[i]['metadata']['music'][x]['sample_end_time_offset_ms']
        sample_end_time_ = json.dumps(sample_end_time)
        return sample_end_time_
    def get_artist_name(self,i,x,y):
        artist_name = self.json_data[i]['metadata']['music'][x]['artists'][y]['name']
        artist_name_ = json.dumps(artist_name)

        return artist_name_
    def send_acr_id (self):
        for i in range(0, len(self.json_data)):
            try:
                for x in range(0, len(self.json_data[i]['metadata']['music'])):
                    try:
                        acrid = self.get_acrid_data(i,x)
                        title = self.get_title_data(i,x)
                        self.execute_mysql(i,'acr_id','acrid, title',(acrid,title),self.cursor)
                    except Exception as w:
                        logging.error('SACRID: {}:{}-->{}'.format(i,x,w))
                        continue
            except Exception as e:
                logging.error('SACRID: {}-->{}'.format(i,e))
                continue
    def send_album_name (self):
        for i in range(0, len(self.json_data)):
            try:
                for x in range(0, len(self.json_data[i]['metadata']['music'])):
                    try:
                        album = self.get_album_data(i,x)
                        self.execute_mysql(i,'album','album_name',album,self.cursor)
                    except Exception as w:
                        logging.error('SALBUM: {}:{}-->{}'.format(i,x,w))
                        continue
            except Exception as e:
                logging.error('SALBUM: {}-->{}'.format(i,e))                  
                continue
    def send_timestamp_data (self):
        for i in range(0, len(self.json_data)):
            try:
                for x in range(0, len(self.json_data[i]['metadata']['music'])):
                    try:
                        timestamp = self.get_timestamp(i,x)
                        played_duration = self.get_played_duration(i,x)
                        score = self.get_score_data(i,x)
                        acrid = self.get_acrid_data(i,x)
                        self.execute_mysql(i,'time_stamp','timestamp, played_duration, score, acrid',(str(timestamp),played_duration,score,acrid),self.cursor)
                    except Exception as w:
                        logging.error('STS: {}:{}-->{}'.format(i,x,w))
                        continue
            except Exception as e:
                logging.error('STS: {}-->{}'.format(i,e))
                continue
    def send_metadata (self):
        for i in range(0, len(self.json_data)):
            try:
                for x in range(0, len(self.json_data[i]['metadata']['music'])):
                    try:
                        timestamp = self.get_timestamp(i,x)
                        db_begin_time = self.get_db_begin_time_offset(i,x)
                        db_end_time = self.get_db_end_time_offset(i,x)
                        duration = self.get_duration(i,x)
                        play_offset = self.get_play_offset(i,x)
                        sample_begin_time = self.get_sample_begin_time_offset(i,x)
                        sample_end_time = self.get_sample_end_time_offset(i,x)
                        self.execute_mysql(i,'metadata','db_begin_time_offset,db_end_time_offset, duration, play_offset,sample_begin_time_offset,sample_end_time_offset,time_stamp',
                    (db_begin_time,db_end_time,duration,play_offset,sample_begin_time,sample_end_time,str(timestamp)),self.cursor)
                    except Exception as w:
                        logging.error('SMT: {}:{}-->{}'.format(i,x,w))
            except Exception as e:
                logging.error('SMT: {}-->{}'.format(i,e))
                continue
    def send_artist_names (self):
        for i in range(0, len(self.json_data)):
            try:
                for x in range(0, len(self.json_data[i]['metadata']['music'])):
                    try:
                        for y in range(0,len(self.json_data[i]['metadata']['music'][x]['artists'])):
                            try:
                                artist = self.get_artist_name(i,x,y)
                                self.execute_mysql(i,'artist','artist_name',artist,self.cursor)
                            except Exception as v:
                                logging.error('SAR: {}:{}:{}-->{}'.format(i,x,y,v))
                                continue
                    except Exception as w:
                        logging.error('SAR: {}:{}-->{}'.format(i,x,w))
                        continue
            except Exception as e:
                logging.error('SAR: {}-->{}'.format(i,e))
                continue
    def send_track_data (self):
        for i in range(0, len(self.json_data)):
            try:
                for x in range(0, len(self.json_data[i]['metadata']['music'])):

                    try:
                        title = self.get_title_data(i,x)
                        genre = self.get_genre_data(i,x)
                        label = self.get_label_data(i,x)
                        release_date = self.get_release_date_data(i,x)
                        acrid = self.get_acrid_data(i,x)
                        artist= self.get_artist_name(i,x,0)
                        album = self.get_album_data(i,x)
                        contributor = self.get_all_contributors_data(i,x)                        
                        self.execute_mysql(i,'track','title, genre, label, release_date, artist_name, album_name, contributor_name, acrid',(title,genre,label,release_date,artist,album,contributor,acrid),self.cursor)
                    except Exception as w:
                        logging.error('STR: {}:{}-->{}'.format(i,x,w))
                        continue
            except Exception as e:
                logging.error('STR: {}-->{}'.format(i,e))
                continue
    def send_contributor_data (self):
        for i in range(len(self.json_data)):
            try:
                for x in range(len(self.json_data[i]['metadata']['music'])):
                    try:
                        for y in range(len(self.json_data[i]['metadata']['music'][x]['contributors']['lyricists'])):
                            try:
                                contributor = self.get_each_contributors_data(i,x,y)
                                self.execute_mysql(i,'contributors','contributor_name',contributor,self.cursor)
                            except Exception as v:
                                logging.error('SCR: {}:{}:{}-->{}'.format(i,x,y,v))
                                continue
                    except Exception as w:
                        logging.error('SCR: {}:{}-->{}'.format(i,x,w))
                        continue
            except Exception as e:
                logging.error('SCR: {}-->{}'.format(i,e))
                continue
    def commit(self):
        self.cnx.commit()
        self.cursor.close()
        self.cnx.close()
        logging.info(' data has been commited')

if __name__ == "__main__":
    #print('process id of __main__ {os.getpid()}')
    #data = open('/var/www/html/espii/src/espii_db/log.json')
    if platform.platform()[0:5] == "Linux":
        channels = open('/var/www/html/espii/src/espii_db/stations/station_name/channel_list.json')
        try:
            channel_load = json.load(channels)
        except Exception as e:
            logging.error('failed to load channel list:{}'.format(e))
            exit()
        channel_list = []
        for i in range(0, len(channel_load)):
            station_name = channel_load[i]['stream_name']
            channel_list.append(station_name)
        for channel in channel_list:
            handler = Espii('root','Meddickmeddick6',channel)

    elif platform.platform()[0:7] == "Windows":
        start = time.perf_counter()
        channels = open('C:/Users/melvi/channel_list.json')
        channel_load = json.load(channels)
        channel_list = []
        for i in range(0, len(channel_load)):
            station_name = channel_load[i]['stream_name']
            channel_list.append(station_name)
        processes = []
        for channel in channel_list:
            handler = Espii('root','Meddickmeddick6',channel)