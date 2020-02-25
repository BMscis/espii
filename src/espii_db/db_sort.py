import numpy as np
import pandas as pd
import json
import mysql.connector
from datetime import datetime
from datetime import timedelta
from mysql.connector import errorcode

class Espii:

    def __init__(self, json_data, user,password,database):
        self.json_data = json_data
        self.user = user
        self.password = password
        self.database = database
        self.cnx = mysql.connector.connect(user=self.user, password=self.password,host='127.0.0.1',database=self.database)
        self.cursor = self.cnx.cursor()

    def execute_mysql (self,table_name, columns,values,cursor):

        add_data="INSERT INTO {}({}) VALUES{}".format(table_name,columns,values)

        cursor.execute(add_data)
        print(add_data)

    def get_data (self):
        for i in range(0, len(self.json_data)):
            try:
                if len(self.json_data[i]['metadata']['music'])> 1:
                    
                    for x in range(0, len(self.json_data[i]['metadata']['music'])):
                        get_timestamp = self.json_data[i]['metadata']['timestamp_utc']
                        timestamp_date = datetime.strptime(str(get_timestamp), '%Y-%m-%d %H:%M:%S')+timedelta(hours=3)
                        timestamp_change = timestamp_date + timedelta(seconds=x)
                        timestamp = datetime.strftime(timestamp_change, '%Y-%m-%d %H:%M:%S')
                        get_played_duration = self.json_data[i]['metadata']['played_duration']*1000
                        played_duration = get_played_duration + x
                        acrid = self.json_data[i]['metadata']['music'][x]['acrid']
                        score= self.json_data[i]['metadata']['music'][x]['score']
                        self.execute_mysql('time_stamp','timestamp, played_duration, acrid, score',(str(timestamp_change),str(played_duration),str(acrid),str(score)),self.cursor)
                else:
                    get_timestamp = self.json_data[i]['metadata']['timestamp_utc']
                    timestamp = datetime.strptime(str(get_timestamp), '%Y-%m-%d %H:%M:%S')+timedelta(hours=3)
                    played_duration = self.json_data[i]['metadata']['played_duration']*1000
                    acrid = self.json_data[i]['metadata']['music'][0]['acrid']
                    score= self.json_data[i]['metadata']['music'][0]['score']
                    self.execute_mysql('time_stamp','timestamp, played_duration, acrid, score',(str(timestamp),str(played_duration),str(acrid),str(score)),self.cursor)
            except mysql.connector.IntegrityError:
                continue

    def commit(self):
        self.cnx.commit()
        self.cursor.close()
        self.cnx.close()


if __name__ == "__main__":
    data = open('log.json')
    results = json.load(data)
    handler = Espii(results,'root','Meddickmeddick6','monitor_results')
    handler.get_data()
    handler.commit()
