<?php
json_string = 'https://api.acrcloud.com/v1/acrcloud-monitor-streams/246132/results?access_key=509c244604c01ed8b82e58f9336375c6&date=20200110';
$jsondata = file_get_contents($json_string);
$obj = json_decode($jsondata,true);
print_r($obj[0]['metadata']['music'][0]['title']);
?>