const express = require('express');
const app = express();
app.use(express.json());
app.use(require('./routes/student'));

app.use(function (err, req, res){
    console.error(err.stack);
    res.status(500).send('An error occured!');
})

const PORT = 3000; 
const dbo = require('./db/connection');
dbo.connectToServer(function(err){
    if(err){
        console.error(err);
        process.exit();
    }
}).then(() => {
    app.listen(PORT,() => {
        console.log('Service is running on port');
    })
})