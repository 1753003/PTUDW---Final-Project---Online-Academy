const express = require('express');
const morgan = require('morgan');
<<<<<<< Updated upstream
const cors = require('cors');
=======
var cors = require('cors')
>>>>>>> Stashed changes

const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(cors());
app.get('/', function(req, res) {
    res.json("Running...");
})

app.use('/api/category', require('./routes/category.route'));
app.use('/api/course', require('./routes/course.route'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log(`Backend is runnning at http://localhost:${PORT}`);
})