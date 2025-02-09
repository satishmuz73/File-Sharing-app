const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());

const connectDB = require("./config/db");
connectDB();

//Template engine
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/files', require('./routes/file'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})