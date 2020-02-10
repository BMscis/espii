
const but = document.getElementById('cd');
const list = document.createElement('script');
const list2 = document.createElement('script');
const php = ''
const url = "https://api.acrcloud.com/v1/acrcloud-monitor-streams/246132/results?access_key=c17c66b0e3be50dcb93cb319ac84709c&date=20200208"
document.body.appendChild(list);
document.body.appendChild(list2);
but.addEventListener('click', e => {

  list.innerHTML = "<?php $json_string = 'https://api.acrcloud.com/v1/acrcloud-monitor-streams/246132/results?access_key=c17c66b0e3be50dcb93cb319ac84709c&date=20200208';$jsondata = file_get_contents($json_string);$obj = json_decode($jsondata,true);print_r($obj[0]['metadata']['music'][0]['title']); ?>"

})
