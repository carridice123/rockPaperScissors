const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))


app.listen(port, function(){
    console.log('listening on port 3000 go and catch its now');
});