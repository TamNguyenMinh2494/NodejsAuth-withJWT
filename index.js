const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import Routes
const authRoute = require('./routes/auth');

dotenv.config();

//Connect to DB
// mongoose.connect(
//     config.DB_CONNECT,
//     { useNewUrlParser: true },
//     () => console.log('Connected to your database')
// );
mongoose.connect('mongodb+srv://user1:user1@cluster0-fj1ej.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.connection.once('open', function () {
    console.log('Conected to your data!');
}).on('error', function (error) {
    console.log('Error is: ', error);
});

//MiddleWare
app.use(express.json());
//Route Middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server running'));