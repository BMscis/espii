//import data from './data.mysql'
// const mysql = require('mysql')

// if (window.location.href === "http://localhost:8080/platform.html"){
//     window.addEventListener('load', e =>{
//         if ('load'){
//             console.log('hello')
//             var con = mysql.createConnection({
//                 host: "localhost",
//                 user: "root",
//                 password: "Meddickmeddick6",
//                 database: "monitor_results"
//             });
//             con.connect(function(err){
//                 if (err) throw err;
//                 console.log("Connected");
//                 var sql  = "select time_stamp.timestamp as time, track.title as title, track.artist_name as artist from time_stamp join track on time_stamp.acrid = track.acrid order by timestamp desc ;"
//                 con.query(sql,function (err, result){
//                     if (err) throw err;
//                 });
//             });

//         };
//     });
// }

