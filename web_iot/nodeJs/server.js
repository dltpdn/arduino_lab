//npm install express serialport
const express = require('express');
let app = express();

app.get('/', (req, res)=>{
    res.redirect('/index.html');
});
app.use(express.static(__dirname + '/../static/'));

app.listen(8080, ()=>{
    console.log("server on 8080.");
});
