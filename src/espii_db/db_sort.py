import numpy as np
import pandas as pd
import json
import mysql.connector
from datetime import datetime
from datetime import timedelta
from mysql.connector import errorcode

data = open('log.json')
results = json.load(data)

cnx= mysql.connector.connect(user='root', password='Meddickmeddick6',host='127.0.0.1',database="monitor_results")
cursor = cnx.cursor()

def call_option (table_name, columns=str(),values=()):

    add_data="INSERT INTO {}({}) VALUES{}".format(table_name,columns,values)

    cursor.execute(add_data)
    print(add_data)


for i in range(0, len(results)):
    try:
        if len(results[i]['metadata']['music'])> 1:
            
            for x in range(0, len(results[i]['metadata']['music'])):
                get_timestamp = results[i]['metadata']['timestamp_utc']
                timestamp_date = datetime.strptime(str(get_timestamp), '%Y-%m-%d %H:%M:%S')+timedelta(hours=3)
                timestamp_change = timestamp_date + timedelta(seconds=x)
                timestamp = datetime.strftime(timestamp_change, '%Y-%m-%d %H:%M:%S')
                get_played_duration = results[i]['metadata']['played_duration']*1000
                played_duration = get_played_duration + x
                acrid = results[i]['metadata']['music'][x]['acrid']
                score= results[i]['metadata']['music'][x]['score']
                call_option('time_stamp','timestamp, played_duration, acrid, score',(str(timestamp_change),str(played_duration),str(acrid),str(score)))
        else:
            get_timestamp = results[i]['metadata']['timestamp_utc']
            timestamp = datetime.strptime(str(get_timestamp), '%Y-%m-%d %H:%M:%S')+timedelta(hours=3)
            played_duration = results[i]['metadata']['played_duration']*1000
            acrid = results[i]['metadata']['music'][0]['acrid']
            score= results[i]['metadata']['music'][0]['score']
            call_option('time_stamp','timestamp, played_duration, acrid, score',(str(timestamp),str(played_duration),str(acrid),str(score)))
    except mysql.connector.IntegrityError:
        continue

cnx.commit()
cursor.close()
cnx.close()    

