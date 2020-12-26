const express = require('express');
const morgan = require('morgan');
var cors = require('cors')
var bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


const auth = require('./middleware/auth.mdw');
app.get('/', function(req, res) {
    res.json("Running...");
})
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/user', require('./routes/user.route'));
app.use('/api/category', require('./routes/category.route'));
app.use('/api/course',require('./routes/course.route'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log(`Backend is runnning at http://localhost:${PORT}`);
})