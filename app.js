const express = require ('express');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));


app.listen(PORT,()  => {
    console(`Connected on port ${PORT}`);



});