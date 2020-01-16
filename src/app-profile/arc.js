export function arc_cloud() {
//fetch url 
fetch ( 'https://api.acrcloud.com/v1/acrcloud-monitor-streams/246132/results?access_key=509c244604c01ed8b82e58f9336375c6&date=20200110', {mode: 'no-cors'} ) . then ( response => { 
  console.log('fetch status: ',response.status) } ).catch ( err => { 'network error while fetching' } )
}; 
