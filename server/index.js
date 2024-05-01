const express = require('express')
const cors = require('cors');
const connection = require('./db');


const app = express();

app.use(express.json())
app.use(cors())
app.use('/user',require('./routes/User'))
app.use('/post',require('./routes/Post'))


connection.connect((error) => {
    if (error) {
        console.error('Error connecting to database: ' + error.stack);
        return;
    }
    console.log('Successfully connected to DB');
});

app.listen(5000,()=>{
    console.log('Server Running on PORT 5000')
})
