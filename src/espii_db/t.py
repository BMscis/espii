import numpy as np
import pandas as pd
import json

data = open('C:/Users/melvi/log11.json')
results = json.load(data)

duration = []        
for i in range(0,len(results)):
    for x in range(0, len(results[i]['metadata']['music'])):
        m = round(results[i]['metadata']['music'][x]['duration_ms']/60000,0)
        duration.append(m)
def get_mode(duration,x):
    count = 0        
    for i in duration:
        if i == x:
            count += 1
    return count
mode_set = np.zeros([499,2])

for i in range(0,len(duration)):
    if duration[i] not in mode_set:
        mode_set[i] = i
        mode_set[i][1] = (get_mode(duration,duration[i]))