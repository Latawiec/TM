const express   = require('express');
const fs        = require('fs');
const path      = require('path');

let app = express();

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './index.html'));
})

app.listen(3000, ()=> console.log('started!'));